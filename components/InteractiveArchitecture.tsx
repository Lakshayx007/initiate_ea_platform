'use client';

import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Target, Info, X, Zap, Database, Lock, Clock } from 'lucide-react';

type Mode = 'legacy' | 'target';

interface NodeInfo {
  name: string;
  category: string;
  description: string;
  impact?: string;
  status: 'critical' | 'healthy' | 'warning' | 'neutral';
  protocol?: string;
  frequency?: string;
  security?: string;
}

const nodeDetails: Record<string, NodeInfo> = {
  'SAP PPM': {
    name: 'SAP Portfolio Management',
    category: 'Source System',
    description: 'Manages project portfolios, budgets, and resource allocation for approximately 3,200 active projects globally. SAP PPM acts as the authoritative system of record for project investments. Historically, the lack of automated traceability between project spend and the specific applications being altered resulted in "shadow IT" and unmeasured architecture debt. By integrating SAP PPM data into the canonical EA model, we achieve real-time visibility into the $2B+ annual IT portfolio, allowing portfolio managers to make data-driven investment decisions and identify redundant spending across business units.',
    protocol: 'OData API / Batch Export',
    frequency: 'Nightly Batch (24h)',
    security: 'Internal Network + Basic Auth',
    status: 'neutral'
  },
  'ServiceNow CMDB': {
    name: 'ServiceNow CMDB',
    category: 'Source System',
    description: 'ITSM platform holding 8,400 application CI records, lifecycle data, and configuration items. As the operational system of record, ServiceNow contains the highest-velocity data changes (e.g., owner updates, lifecycle state changes). The event-driven integration pattern implemented here captures these changes instantly via webhooks, closing the gap between IT operations and Enterprise Architecture. This is critical for DORA (Digital Operational Resilience Act) compliance, which mandates auditable, real-time IT change tracking for technology service providers.',
    protocol: 'Event-Driven Webhook',
    frequency: 'Near Real-Time (<1m)',
    security: 'OAuth2 + HMAC Signature',
    status: 'neutral'
  },
  'Signavio': {
    name: 'SAP Signavio',
    category: 'Source System',
    description: 'Business process repository and governance platform. Signavio holds the business architecture layer, explicitly mapping business processes to required capabilities. By integrating Signavio into the EA Data Product, we automate the "Business-to-IT" traceability link. This allows enterprise architects to see exactly which IT applications support which critical business processes, directly fulfilling TOGAF Phase B (Business Architecture) and Phase C (Information Systems) alignment requirements.',
    protocol: 'REST API Polling',
    frequency: 'Scheduled (6h)',
    security: 'OAuth2 Bearer Token',
    status: 'neutral'
  },
  'Apptio': {
    name: 'Apptio ITFM',
    category: 'Source System',
    description: 'IT Financial Management system, tracking Total Cost of Ownership (TCO). Apptio provides the financial lens for the EA repository. This integration brings cost transparency directly to the architecture level, enabling data-driven application rationalisation. For instance, CFOs can now identify duplicate tools running in parallel with overlapping functionality, which is a key driver for the project\'s projected 186% ROI and estimated $100M+ IT spend optimisation opportunity.',
    protocol: 'REST API Export',
    frequency: 'Nightly Batch (24h)',
    security: 'API Key over TLS 1.3',
    status: 'neutral'
  },
  'Manual Surveys': {
    name: 'Manual Spreadsheet Surveys',
    category: 'Data Collection Process',
    description: 'The baseline "As-Is" data collection process taking 4-8 weeks, relying entirely on emails and spreadsheets. This manual effort consumed approximately 2,400 FTE hours annually with only a 55% response rate and an 18% error rate due to manual reconciliation failures. This fundamentally undermined the credibility of the EA function, as portfolio managers were forced to make billion-dollar investment decisions on information that was demonstrably unreliable.',
    impact: '18% Error Rate, 2,400 FTE Hours Wasted',
    status: 'critical'
  },
  'Legacy EA Repo': {
    name: 'Disconnected EA Repository',
    category: 'Data Destination',
    description: 'The baseline Enterprise Architecture repository that operated in complete isolation. Without automated integrations, it contained 4-8 week stale data, covered only 40% of the enterprise application landscape, and failed to meet modern regulatory traceability mandates like DORA. It acted as a static documentation store rather than a dynamic intelligence hub.',
    status: 'warning'
  },
  'Azure APIM': {
    name: 'Azure API Management',
    category: 'Integration Platform',
    description: 'Centralised API Gateway enforcing rate limits, zero-trust security, and intelligent routing. It processes all incoming CMDB webhooks. This represents the API governance layer that was completely missing in the As-Is state, ensuring secure, trackable, and scalable integration across the enterprise landscape in alignment with the API-First Integration architecture principle.',
    protocol: 'HTTPS / REST',
    frequency: 'Continuous',
    security: 'Zero-Trust Gateway',
    impact: 'Governed API Layer',
    status: 'healthy'
  },
  'Azure Event Hub': {
    name: 'Azure Event Hub',
    category: 'Integration Platform',
    description: 'High-throughput event ingestion queue. It ensures reliable delivery of configuration changes even during downstream outages. Implementing an Event-Driven Architecture (Integration Pattern A) guarantees idempotent event handling and complete decoupling of producers (e.g., ServiceNow) from the EA Data Product consumer, conforming to Data Mesh principles.',
    protocol: 'AMQP / Kafka',
    frequency: 'Continuous',
    security: 'VNet Encapsulated',
    impact: '< 1 min Latency',
    status: 'healthy'
  },
  'Azure Data Factory': {
    name: 'Azure Data Factory',
    category: 'Integration Platform',
    description: 'Serverless ETL pipeline orchestrating scheduled polling and batch extraction from legacy systems like SAP and Apptio. It handles Pattern B (REST Polling) and Pattern C (Batch ETL), abstracting integration complexity and providing a robust retry-and-failover mechanism. This pipeline enforces the Canonical Data Model validation rules before data enters the EA repository.',
    protocol: 'OData / JDBC',
    frequency: 'Scheduled Intervals',
    security: 'Managed Identity',
    impact: 'Automated Extraction',
    status: 'healthy'
  },
  'Canonical Schema': {
    name: 'JSON Schema Registry',
    category: 'Data Governance',
    description: 'Maintains the formal Canonical Data Model definitions for Application, Project, Technology, and Capability entities. By enforcing a single, unified schema across all integrations, it prevents the data fragmentation that plagued the legacy state. It acts as the technical enforcement mechanism for the "Single Source of Truth" architectural principle.',
    protocol: 'JSON Schema Validation',
    frequency: 'On Every Event',
    security: 'Internal Governance',
    impact: 'Data Consistency',
    status: 'healthy'
  },
  'Quality Gates': {
    name: 'Great Expectations (DQ)',
    category: 'Quality Assurance',
    description: 'Runs 50+ data quality rules. Blocks non-conformant data and generates alerts for stewards. This ensures that the EA repository maintains 99%+ accuracy, directly shifting the EA team from being "data janitors" to strategic advisors relying on trusted automation.',
    impact: '98% Errors Blocked',
    status: 'healthy'
  },
  'EA Data Product': {
    name: 'Governed EA Repository',
    category: 'Data Product',
    description: 'LeanIX configured as a governed data product with explicit SLAs for freshness and accuracy. This realizes the Data Mesh principle (Dehghani, 2022) applied to enterprise architecture, transforming the EA repository from a static compliance burden into a trusted, automated intelligence hub.',
    protocol: 'GraphQL Mutation API',
    frequency: 'Continuous Updates',
    security: 'OAuth2 Server-to-Server',
    impact: '95% Coverage, < 4hr Freshness',
    status: 'healthy'
  },
  'CIO Dashboard': {
    name: 'Executive Dashboards',
    category: 'Consumer Application',
    description: 'Consumes the EA Data Product to provide real-time investment insights to the CIO. Empowers decision-makers with live data to identify technology risks, propose consolidations, and optimize the $2B IT portfolio. Enables proactive DORA compliance reporting instantly.',
    status: 'healthy'
  },
  'Design Portal': {
    name: 'Solution Design Portal',
    category: 'Consumer Application',
    description: 'Architects consume the EA data to design compliant, integrated solutions. With accurate dependency graphs and capability maps readily available, impact analysis time is reduced from weeks to days, accelerating the enterprise architecture development cycle.',
    status: 'healthy'
  }
};

const LEGACY_NODES = [
  { name: 'SAP PPM', x: 0, y: 0, itemStyle: { color: '#64748B' } },
  { name: 'ServiceNow CMDB', x: 0, y: 100, itemStyle: { color: '#64748B' } },
  { name: 'Signavio', x: 0, y: 200, itemStyle: { color: '#64748B' } },
  { name: 'Apptio', x: 0, y: 300, itemStyle: { color: '#64748B' } },
  { name: 'Manual Surveys', x: 150, y: 150, symbolSize: 60, itemStyle: { color: '#EF4444', shadowBlur: 20, shadowColor: 'rgba(239, 68, 68, 0.5)' } },
  { name: 'Legacy EA Repo', x: 300, y: 150, symbolSize: 80, itemStyle: { color: '#F59E0B' } },
];

const LEGACY_LINKS = [
  { source: 'SAP PPM', target: 'Manual Surveys' },
  { source: 'ServiceNow CMDB', target: 'Manual Surveys' },
  { source: 'Signavio', target: 'Manual Surveys' },
  { source: 'Apptio', target: 'Manual Surveys' },
  { source: 'Manual Surveys', target: 'Legacy EA Repo', lineStyle: { type: 'dashed', color: '#EF4444', width: 3 } },
];

const TARGET_NODES = [
  // Layer 1
  { name: 'SAP PPM', x: 0, y: 0, itemStyle: { color: '#3B82F6' } },
  { name: 'ServiceNow CMDB', x: 0, y: 100, itemStyle: { color: '#3B82F6' } },
  { name: 'Signavio', x: 0, y: 200, itemStyle: { color: '#3B82F6' } },
  { name: 'Apptio', x: 0, y: 300, itemStyle: { color: '#3B82F6' } },
  
  // Layer 2
  { name: 'Azure APIM', x: 100, y: 50, itemStyle: { color: '#10B981' } },
  { name: 'Azure Event Hub', x: 100, y: 150, itemStyle: { color: '#10B981' } },
  { name: 'Azure Data Factory', x: 100, y: 250, itemStyle: { color: '#10B981' } },
  
  // Layer 3
  { name: 'Canonical Schema', x: 200, y: 100, itemStyle: { color: '#8B5CF6' } },
  { name: 'Quality Gates', x: 200, y: 200, itemStyle: { color: '#8B5CF6' } },
  
  // Layer 4
  { name: 'EA Data Product', x: 300, y: 150, symbolSize: 70, itemStyle: { color: '#10B981', shadowBlur: 20, shadowColor: 'rgba(16, 185, 129, 0.4)' } },
  
  // Layer 5
  { name: 'CIO Dashboard', x: 400, y: 100, itemStyle: { color: '#06B6D4' } },
  { name: 'Design Portal', x: 400, y: 200, itemStyle: { color: '#06B6D4' } },
];

// Target links with animated data flow (lines effect)
const TARGET_LINKS = [
  // L1 to L2
  { source: 'SAP PPM', target: 'Azure Data Factory' },
  { source: 'ServiceNow CMDB', target: 'Azure APIM' },
  { source: 'Signavio', target: 'Azure Data Factory' },
  { source: 'Apptio', target: 'Azure Data Factory' },
  { source: 'Azure APIM', target: 'Azure Event Hub' },
  
  // L2 to L3
  { source: 'Azure Event Hub', target: 'Canonical Schema' },
  { source: 'Azure Data Factory', target: 'Canonical Schema' },
  { source: 'Canonical Schema', target: 'Quality Gates' },
  
  // L3 to L4
  { source: 'Quality Gates', target: 'EA Data Product' },
  
  // L4 to L5
  { source: 'EA Data Product', target: 'CIO Dashboard' },
  { source: 'EA Data Product', target: 'Design Portal' },
];

export default function InteractiveArchitecture() {
  const [mode, setMode] = useState<Mode>('target');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (params: any) => {
    if (params.dataType === 'node') {
      setSelectedNode(params.name);
    }
  };

  const onEvents = {
    click: handleNodeClick,
  };

  const option = useMemo(() => {
    const nodes = mode === 'legacy' ? LEGACY_NODES : TARGET_NODES;
    const links = mode === 'legacy' ? LEGACY_LINKS : TARGET_LINKS;

    // Use lines series to create glowing data flow effect for Target architecture
    const series: any[] = [
      {
        type: 'graph',
        layout: 'none',
        symbolSize: 45,
        roam: false,
        label: {
          show: true,
          position: 'bottom',
          color: '#D4D4D8',
          fontSize: 12,
          fontFamily: 'Inter, sans-serif',
          distance: 10,
        },
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [4, 8],
        itemStyle: {
          borderColor: '#FFFFFF',
          borderWidth: 2,
        },
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          curveness: 0.3,
          width: 2,
        },
        emphasis: {
          focus: 'adjacency',
          lineStyle: { width: 4, color: 'rgba(255, 255, 255, 0.8)' },
          itemStyle: { shadowBlur: 20, shadowColor: 'rgba(255, 255, 255, 0.8)' }
        },
        data: nodes.map(n => ({
          ...n,
          symbol: selectedNode === n.name ? 'diamond' : 'circle',
          itemStyle: {
            ...n.itemStyle,
            borderColor: selectedNode === n.name ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
            borderWidth: selectedNode === n.name ? 4 : 2,
          }
        })),
        links: links,
      }
    ];

    return {
      backgroundColor: 'transparent',
      tooltip: { show: false },
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series
    };
  }, [mode, selectedNode]);

  const activeDetails = selectedNode ? nodeDetails[selectedNode] : null;

  return (
    <div className="w-full">
      {/* Controls */}
      <div className="flex flex-col items-center justify-center mb-8 gap-4">
        <div className="inline-flex items-center gap-1 p-1 bg-surface-800/50 border border-surface-700 rounded-xl backdrop-blur-md">
          <button
            onClick={() => { setMode('legacy'); setSelectedNode(null); }}
            className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              mode === 'legacy' 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]' 
                : 'text-surface-400 hover:text-surface-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Legacy Architecture
          </button>
          <button
            onClick={() => { setMode('target'); setSelectedNode(null); }}
            className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              mode === 'target' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                : 'text-surface-400 hover:text-surface-50'
            }`}
          >
            <Target className="w-4 h-4" />
            Target Architecture
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Container */}
        <div className="lg:col-span-2 bento-card relative flex flex-col items-center justify-center min-h-[500px]">
          <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
            <Info className="w-5 h-5 text-surface-500" />
            <span className="text-sm font-medium text-surface-400 uppercase tracking-widest">Interactive Diagram</span>
          </div>
          <div className="absolute top-6 right-6 text-xs text-surface-500 z-10">
            Click nodes for architecture details
          </div>
          
          <div className="w-full flex-1 h-[500px] mt-8">
            <ReactECharts
              option={option}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
              onEvents={onEvents}
            />
          </div>
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1 bento-card flex flex-col relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeDetails ? (
              <motion.div
                key={selectedNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2 block">
                      {activeDetails.category}
                    </span>
                    <h3 className="text-3xl font-bold text-surface-50 tracking-tight leading-tight mb-2">
                      {activeDetails.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded border ${
                        activeDetails.status === 'critical' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                        activeDetails.status === 'healthy' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                        'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      }`}>
                        {activeDetails.status}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="p-2 hover:bg-surface-800 rounded-full transition-colors text-surface-400 hover:text-surface-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="prose prose-invert max-w-none mb-6">
                  <p className="text-surface-300 text-base leading-relaxed">
                    {activeDetails.description}
                  </p>
                </div>

                {/* Technical Meta Data Grid */}
                <div className="grid grid-cols-1 gap-3 mb-8">
                  {activeDetails.protocol && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-800/50 border border-surface-700/50">
                      <Zap className="w-5 h-5 text-purple-400 shrink-0" />
                      <div>
                        <div className="text-[10px] font-medium text-surface-500 uppercase tracking-widest">Protocol / Standard</div>
                        <div className="text-sm text-surface-200">{activeDetails.protocol}</div>
                      </div>
                    </div>
                  )}
                  {activeDetails.frequency && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-800/50 border border-surface-700/50">
                      <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                      <div>
                        <div className="text-[10px] font-medium text-surface-500 uppercase tracking-widest">Sync Frequency</div>
                        <div className="text-sm text-surface-200">{activeDetails.frequency}</div>
                      </div>
                    </div>
                  )}
                  {activeDetails.security && (
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-800/50 border border-surface-700/50">
                      <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-[10px] font-medium text-surface-500 uppercase tracking-widest">Security Layer</div>
                        <div className="text-sm text-surface-200">{activeDetails.security}</div>
                      </div>
                    </div>
                  )}
                </div>

                {activeDetails.impact && (
                  <div className={`mt-auto p-5 rounded-xl border ${
                    activeDetails.status === 'critical' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                    activeDetails.status === 'healthy' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                    'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  }`}>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80 block mb-1">
                      Business Impact
                    </span>
                    <span className="text-xl font-bold tracking-tight">
                      {activeDetails.impact}
                    </span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col p-6 text-surface-400"
              >
                <div className="mb-8 pb-8 border-b border-surface-700">
                  <h3 className="text-2xl font-bold text-surface-50 tracking-tight mb-4">Architecture Explorer</h3>
                  <p className="text-sm leading-relaxed mb-6">
                    This interactive diagram demonstrates the decoupling of operational source systems from strategic reporting via a governed 5-layer Data Product platform.
                  </p>
                  <p className="text-sm text-surface-50/50 bg-surface-800/50 p-4 rounded-lg border border-surface-700/50">
                    <strong className="text-surface-50">Instruction:</strong> Select any node on the left to view detailed technical specifications, integration protocols, and business impact.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                      <Database className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-surface-200">4 Source Systems</h4>
                      <p className="text-xs text-surface-500 mt-1">PPM, CMDB, BPM, ITFM</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30">
                      <Target className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-surface-200">1 Canonical Schema</h4>
                      <p className="text-xs text-surface-500 mt-1">Resolving semantic conflicts automatically</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-surface-200">95% Application Coverage</h4>
                      <p className="text-xs text-surface-500 mt-1">Via event-driven extraction</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
