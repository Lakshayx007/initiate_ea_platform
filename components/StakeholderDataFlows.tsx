'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server, Database, ArrowRight, ArrowDown,
  ShieldCheck, Clock, Zap, FileJson,
  CheckCircle2, AlertCircle, Layers, Network,
  ChevronRight
} from 'lucide-react';

type Platform = 'servicenow' | 'sap' | 'signavio' | 'apptio';

interface PlatformData {
  name: string;
  fullName: string;
  dataProvided: string[];
  recordCount: string;
  direction: '1-Way → EA Hub';
  directionReason: string;
  pattern: string;
  patternIcon: typeof Zap;
  frequency: string;
  protocol: string;
  middleware: string;
  qualityGate: string;
  whoUsesThis: { role: string; useCase: string }[];
  color: string;
  borderColor: string;
}

const platformData: Record<Platform, PlatformData> = {
  servicenow: {
    name: 'ServiceNow',
    fullName: 'ServiceNow CMDB',
    dataProvided: ['Application CIs & Relationships', 'Owner & Lifecycle Status', 'Server Dependencies', 'Incident History'],
    recordCount: '8,400 Configuration Items',
    direction: '1-Way → EA Hub',
    directionReason: 'ServiceNow is the system of record for IT Operations. EA reads this data for analysis but never writes back, preserving CMDB integrity and audit trails.',
    pattern: 'Event-Driven Webhook',
    patternIcon: Zap,
    frequency: 'Real-time (< 1 min latency)',
    protocol: 'HTTPS REST + HMAC Signature',
    middleware: 'Azure API Management → Event Hub',
    qualityGate: '42 validation rules applied on every event',
    whoUsesThis: [
      { role: 'CIO', useCase: 'Sees real-time application lifecycle risk across the portfolio' },
      { role: 'Enterprise Architect', useCase: 'Gets accurate dependency maps for impact analysis' },
      { role: 'Platform Manager', useCase: 'Monitors sync health and catches failures instantly' },
    ],
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/30',
  },
  sap: {
    name: 'SAP PPM',
    fullName: 'SAP Portfolio & Project Management',
    dataProvided: ['Project Portfolios & Budgets', 'Resource Allocation', 'Project-to-Application Mapping', 'Investment Categories'],
    recordCount: '3,200 Active Projects',
    direction: '1-Way → EA Hub',
    directionReason: 'SAP owns the regulated financial ledger. EA extracts project data nightly to map costs to applications without modifying the source of financial truth.',
    pattern: 'Batch ETL',
    patternIcon: Clock,
    frequency: 'Nightly (24h cycle)',
    protocol: 'OData API / ABAP Export',
    middleware: 'Azure Data Factory Pipeline',
    qualityGate: 'Schema validation + referential integrity checks',
    whoUsesThis: [
      { role: 'CFO', useCase: 'Sees IT spend mapped to actual applications and capabilities' },
      { role: 'Portfolio Manager', useCase: 'Understands which projects touch which applications' },
      { role: 'CIO', useCase: 'Identifies redundant investment across business units' },
    ],
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500/30',
  },
  signavio: {
    name: 'Signavio',
    fullName: 'SAP Signavio BPM',
    dataProvided: ['Business Process Models', 'Capability-to-Process Mapping', 'Process Owner Data', 'Compliance Requirements'],
    recordCount: '240+ Process Models',
    direction: '1-Way → EA Hub',
    directionReason: 'Signavio owns the business process layer. EA polls this data to create Business-to-IT traceability without polluting process models with technical metadata.',
    pattern: 'Scheduled REST Polling',
    patternIcon: Clock,
    frequency: 'Every 6 hours',
    protocol: 'REST API + OAuth2',
    middleware: 'Azure API Management',
    qualityGate: 'Capability taxonomy alignment validation',
    whoUsesThis: [
      { role: 'Enterprise Architect', useCase: 'Links IT systems to the business capabilities they support' },
      { role: 'CIO', useCase: 'Understands which business processes depend on which technology' },
      { role: 'Compliance', useCase: 'Maps regulatory requirements to supporting systems' },
    ],
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500/30',
  },
  apptio: {
    name: 'Apptio',
    fullName: 'Apptio IT Financial Management',
    dataProvided: ['Total Cost of Ownership (TCO)', 'Cost Allocation by BU', 'License & Subscription Costs', 'Run vs. Grow Spend'],
    recordCount: '8 Business Units Tracked',
    direction: '1-Way → EA Hub',
    directionReason: 'Apptio calculates complex cost models. EA imports finalized numbers to attach cost metrics to architectural decisions. Writing back would compromise the financial model integrity.',
    pattern: 'Scheduled Export',
    patternIcon: Clock,
    frequency: 'Nightly (24h cycle)',
    protocol: 'REST API + API Key',
    middleware: 'Azure Data Factory',
    qualityGate: 'Cost center mapping validation',
    whoUsesThis: [
      { role: 'CFO', useCase: 'Gets accurate per-application TCO for rationalization decisions' },
      { role: 'CIO', useCase: 'Compares run costs vs. innovation spend across the portfolio' },
      { role: 'Portfolio Manager', useCase: 'Identifies the most expensive applications to maintain' },
    ],
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
  },
};

export default function PlatformSynergiesPage() {
  const [activePlatform, setActivePlatform] = useState<Platform>('servicenow');
  const data = platformData[activePlatform];
  const PatternIcon = data.patternIcon;

  return (
    <div className="w-full">
      {/* Platform Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {(Object.entries(platformData) as [Platform, PlatformData][]).map(([key, platform]) => {
          const isActive = activePlatform === key;
          return (
            <button
              key={key}
              onClick={() => setActivePlatform(key)}
              className={`relative p-4 rounded-xl text-left transition-all ${
                isActive
                  ? `bg-surface-800 border-2 ${platform.borderColor} shadow-lg`
                  : 'bg-surface-900/50 border border-surface-800 hover:bg-surface-800/80'
              }`}
            >
              <div className="font-bold text-sm text-white mb-0.5">{platform.name}</div>
              <div className="text-[10px] text-surface-400">{platform.recordCount}</div>
              {isActive && (
                <motion.div
                  layoutId="platform-indicator"
                  className={`absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r ${platform.color} rounded-full`}
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePlatform}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {/* Architecture Flow Diagram */}
          <div className="bg-surface-900/80 border border-surface-800 rounded-xl p-6 md:p-8 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-6">Data Flow Architecture</h3>

            <div className="flex flex-col md:flex-row items-stretch gap-0 max-w-5xl mx-auto">

              {/* SOURCE */}
              <div className={`flex-1 p-5 rounded-xl border-2 border-dashed ${data.borderColor} bg-surface-800/20`}>
                <div className="flex items-center gap-2 mb-4">
                  <Server className="w-5 h-5 text-surface-400" />
                  <span className="font-bold text-white text-sm">{data.fullName}</span>
                </div>
                <div className="space-y-1.5">
                  {data.dataProvided.map(item => (
                    <div key={item} className="flex items-center gap-2 text-xs text-surface-300">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-surface-800">
                  <span className="text-[10px] text-surface-500 uppercase tracking-wider">{data.recordCount}</span>
                </div>
              </div>

              {/* ARROW + PATTERN */}
              <div className="flex flex-col items-center justify-center px-4 py-3 md:py-0 min-w-[180px]">
                <div className="hidden md:flex items-center gap-1 text-surface-500 mb-2">
                  <div className="w-12 h-px bg-gradient-to-r from-surface-700 to-surface-500" />
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </motion.div>
                  <div className="w-12 h-px bg-gradient-to-r from-surface-500 to-surface-700" />
                </div>
                <div className="md:hidden flex items-center gap-1 text-surface-500 my-2">
                  <motion.div animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <ArrowDown className="w-4 h-4 text-blue-400" />
                  </motion.div>
                </div>

                <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-center">
                  <div className="flex items-center gap-1.5 justify-center mb-1">
                    <PatternIcon className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-bold text-white">{data.pattern}</span>
                  </div>
                  <span className="text-[10px] text-surface-400">{data.frequency}</span>
                </div>

                <div className="mt-2 flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-bold">{data.direction}</span>
                </div>

                <div className="hidden md:flex items-center gap-1 text-surface-500 mt-2">
                  <div className="w-12 h-px bg-gradient-to-r from-surface-700 to-surface-500" />
                  <motion.div animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </motion.div>
                  <div className="w-12 h-px bg-gradient-to-r from-surface-500 to-surface-700" />
                </div>
              </div>

              {/* DESTINATION */}
              <div className="flex-1 p-5 rounded-xl border-2 border-blue-500/20 bg-blue-500/5">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-5 h-5 text-blue-400" />
                  <span className="font-bold text-white text-sm">EA Intelligence Hub</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 font-medium">LeanIX</span>
                </div>
                <div className="space-y-1.5 text-xs text-surface-300">
                  <div className="flex items-center gap-2">
                    <FileJson className="w-3 h-3 text-blue-400 shrink-0" />
                    Canonical Data Model (JSON Schema)
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-blue-400 shrink-0" />
                    {data.qualityGate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Network className="w-3 h-3 text-blue-400 shrink-0" />
                    Middleware: {data.middleware}
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-3 h-3 text-blue-400 shrink-0" />
                    Protocol: {data.protocol}
                  </div>
                </div>
              </div>
            </div>

            {/* Why 1-Way */}
            <div className="mt-6 p-4 bg-surface-800/40 border border-surface-800 rounded-lg max-w-5xl mx-auto">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-surface-300 block mb-1">Why is this a 1-way integration?</span>
                  <span className="text-xs text-surface-400 leading-relaxed">{data.directionReason}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Who Uses This Data */}
          <div className="bg-surface-900/80 border border-surface-800 rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-4">Who uses this data?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.whoUsesThis.map(user => (
                <div key={user.role} className="p-4 bg-surface-800/50 rounded-lg border border-surface-800">
                  <span className="text-xs font-bold text-white block mb-1">{user.role}</span>
                  <span className="text-xs text-surface-400 leading-relaxed">{user.useCase}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
