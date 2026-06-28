'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import { Network, AlertTriangle, Crosshair, Server, Database, Cloud, ShieldAlert, FileText, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import Link from 'next/link';

// Graph Data
const nodesData = [
  { id: '1', name: 'Oracle 11g (EOL)', category: 'Database', symbolSize: 45, x: 200, y: 150 },
  { id: '2', name: 'Java 8 (EOL)', category: 'Runtime', symbolSize: 40, x: 300, y: 100 },
  { id: '3', name: 'Legacy Auth V1', category: 'Security', symbolSize: 35, x: 150, y: 250 },
  
  { id: 'app1', name: 'Core HR System', category: 'Business App', symbolSize: 25, x: 400, y: 200 },
  { id: 'app2', name: 'EU Payroll', category: 'Business App', symbolSize: 25, x: 350, y: 300 },
  { id: 'app3', name: 'Global Supply Chain', category: 'Business App', symbolSize: 25, x: 250, y: 350 },
  { id: 'app4', name: 'CRM (Salesforce)', category: 'Business App', symbolSize: 25, x: 450, y: 100 },
  { id: 'app5', name: 'B2B Portal', category: 'Business App', symbolSize: 25, x: 100, y: 350 },
  
  { id: 'biz1', name: 'Employee Onboarding', category: 'Capability', symbolSize: 20, x: 500, y: 250 },
  { id: 'biz2', name: 'Order Processing', category: 'Capability', symbolSize: 20, x: 300, y: 450 },
];

const linksData = [
  { source: '1', target: 'app1' },
  { source: '1', target: 'app3' },
  { source: '2', target: 'app1' },
  { source: '2', target: 'app2' },
  { source: '3', target: 'app3' },
  { source: '3', target: 'app5' },
  
  { source: 'app1', target: 'biz1' },
  { source: 'app2', target: 'biz1' },
  { source: 'app3', target: 'biz2' },
  { source: '3', target: 'app4' },
  { source: 'app4', target: 'biz1' },
];

export default function CTOPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const echartsRef = useRef<any>(null);

  // Find Blast Radius
  const blastRadiusNodes = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const affected = new Set<string>();
    affected.add(selectedNodeId);

    // Simple 2-level traversal for demo purposes
    linksData.forEach(link => {
      if (link.source === selectedNodeId) {
        affected.add(link.target);
        linksData.forEach(l2 => {
          if (l2.source === link.target) {
            affected.add(l2.target);
          }
        });
      }
    });
    return affected;
  }, [selectedNodeId]);

  const graphOption = useMemo(() => {
    const nodes = nodesData.map(node => {
      const isSelected = selectedNodeId === node.id;
      const isInRadius = blastRadiusNodes.has(node.id);
      const isFaded = selectedNodeId && !isInRadius;

      let color = '#27272A'; // Default dark gray
      let borderColor = 'rgba(255,255,255,0.1)';
      
      if (node.category === 'Database' || node.category === 'Runtime' || node.category === 'Security') {
        color = '#1C1C1C';
        borderColor = '#7928CA'; // Electric Purple for core tech
      } else if (node.category === 'Business App') {
        color = '#1C1C1C';
        borderColor = '#0070F3'; // Vercel blue for apps
      }

      if (isSelected) {
        borderColor = '#E00'; // Red for selected risk
        color = '#4A0000';
      } else if (isInRadius && node.id !== selectedNodeId) {
        borderColor = '#F5A623'; // Amber for affected
      }

      return {
        ...node,
        itemStyle: {
          color: isFaded ? '#0A0A0A' : color,
          borderColor: isFaded ? '#1C1C1C' : borderColor,
          borderWidth: isSelected ? 3 : 2,
          shadowBlur: isSelected || isInRadius ? 15 : 0,
          shadowColor: isSelected ? '#E00' : (isInRadius ? '#F5A623' : 'transparent'),
          opacity: isFaded ? 0.3 : 1
        },
        label: {
          show: true,
          position: 'right',
          color: isFaded ? '#52525B' : '#EDEDED',
          fontSize: isSelected ? 12 : 10,
          fontWeight: isSelected || isInRadius ? 'bold' : 'normal'
        }
      };
    });

    const links = linksData.map(link => {
      const isAffected = blastRadiusNodes.has(link.source) && blastRadiusNodes.has(link.target);
      const isFaded = selectedNodeId && !isAffected;

      return {
        ...link,
        lineStyle: {
          color: isAffected ? '#F5A623' : '#27272A',
          width: isAffected ? 3 : 1,
          opacity: isFaded ? 0.1 : 1,
          curveness: 0.2
        }
      };
    });

    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: '#0A0A0A',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#EDEDED' }
      },
      animationDurationUpdate: 500,
      animationEasingUpdate: 'cubicOut',
      series: [
        {
          type: 'graph',
          layout: 'force',
          force: {
            repulsion: 400,
            edgeLength: 100,
            gravity: 0.1
          },
          roam: true,
          draggable: true,
          data: nodes,
          links: links,
          emphasis: { focus: 'adjacency' }
        }
      ]
    };
  }, [selectedNodeId, blastRadiusNodes]);

  const onChartClick = (params: any) => {
    if (params.dataType === 'node') {
      if (selectedNodeId === params.data.id) {
        setSelectedNodeId(null);
        setTicketGenerated(false);
      } else {
        setSelectedNodeId(params.data.id);
        setTicketGenerated(false);
      }
    } else {
      setSelectedNodeId(null);
      setTicketGenerated(false);
    }
  };

  const onChartEvents = {
    click: onChartClick,
  };

  // Metrics calculation based on selection
  const affectedAppsCount = Array.from(blastRadiusNodes).filter(id => id.startsWith('app')).length;
  const affectedBizCount = Array.from(blastRadiusNodes).filter(id => id.startsWith('biz')).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          
          <div className="mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs font-semibold text-accent mb-4">
              <Crosshair size={14} /> Threat Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text mb-4">
              Tech Debt & Blast Radius
            </h1>
            <p className="text-lg text-surface-400 max-w-2xl">
              Identify end-of-life infrastructure and instantly simulate the cascading impact of an outage or security breach across the enterprise portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* The Visualizer */}
            <div className="lg:col-span-8 flex flex-col h-[600px]">
              <div className="glass-card flex-1 p-1 flex flex-col relative">
                <div className="absolute top-4 left-6 z-10">
                  <h2 className="text-lg font-semibold text-surface-50 flex items-center gap-2">
                    <Network size={18} className="text-primary-light" /> Live Dependency Graph
                  </h2>
                  <p className="text-sm text-surface-500">Click any EOL technology node to simulate blast radius.</p>
                </div>
                
                {selectedNodeId && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-6 z-10 bg-danger/10 border border-danger/30 text-danger px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 backdrop-blur-md"
                  >
                    <span className="w-2 h-2 rounded-full bg-danger animate-ping" /> Simulation Active
                  </motion.div>
                )}

                <div className="flex-1 w-full">
                  <ReactECharts 
                    ref={echartsRef}
                    option={graphOption} 
                    style={{ height: '100%', width: '100%' }} 
                    onEvents={onChartEvents}
                  />
                </div>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              <AnimatePresence mode="wait">
                {selectedNodeId ? (
                  <motion.div 
                    key="analysis"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="glass-card p-6 border-warning/30 shadow-[0_0_30px_rgba(245,166,35,0.1)]"
                  >
                    <div className="flex items-center gap-2 text-warning mb-4 uppercase tracking-wider text-xs font-bold">
                      <AlertTriangle size={16} /> Impact Analysis
                    </div>
                    
                    <h3 className="text-2xl font-bold text-surface-50 mb-6">
                      {nodesData.find(n => n.id === selectedNodeId)?.name}
                    </h3>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="text-xs text-surface-500 uppercase tracking-wider mb-2">Cascading Failures</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-surface-900 border border-surface-800 rounded-lg p-4">
                            <div className="text-3xl font-bold text-surface-50">{affectedAppsCount}</div>
                            <div className="text-xs text-surface-400 mt-1">Applications Down</div>
                          </div>
                          <div className="bg-surface-900 border border-surface-800 rounded-lg p-4">
                            <div className="text-3xl font-bold text-surface-50">{affectedBizCount}</div>
                            <div className="text-xs text-surface-400 mt-1">Capabilities Offline</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-surface-500 uppercase tracking-wider mb-2">Affected Business Areas</div>
                        <ul className="space-y-2">
                          {Array.from(blastRadiusNodes)
                            .filter(id => id.startsWith('biz'))
                            .map(id => {
                              const node = nodesData.find(n => n.id === id);
                              return (
                                <li key={id} className="flex items-center gap-2 text-sm text-surface-200">
                                  <div className="w-1.5 h-1.5 rounded-full bg-warning" /> {node?.name}
                                </li>
                              )
                            })}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      {ticketGenerated ? (
                        <Link href="/dashboard/tickets" className="w-full py-3 px-4 rounded-lg bg-success/20 border border-success/50 text-success flex items-center justify-center gap-2 font-bold text-sm hover:bg-success/30 transition-colors cursor-pointer block text-center">
                          <CheckCircle2 size={18} className="inline-block mr-1" /> Ticket SNOW-4492 Created <ArrowRight size={14} className="inline-block" />
                        </Link>
                      ) : (
                        <button 
                          onClick={() => setTicketGenerated(true)}
                          className="w-full glow-button flex justify-center items-center gap-2"
                        >
                          Generate Remediation Ticket <ArrowRight size={16} />
                        </button>
                      )}
                      
                      <Link href="/dashboard/tickets" className="w-full mt-3 flex justify-center items-center gap-2 text-surface-400 hover:text-surface-50 text-sm transition-colors py-2 border border-surface-800 rounded-lg hover:bg-surface-800">
                        View All Active Tickets
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card p-6 flex-1 flex flex-col items-center justify-center text-center border-dashed border-surface-700"
                  >
                    <div className="w-16 h-16 rounded-full bg-surface-900 flex items-center justify-center text-surface-600 mb-4 border border-surface-800">
                      <Crosshair size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-surface-50 mb-2">No Target Selected</h3>
                    <p className="text-sm text-surface-400">
                      Select an end-of-life component in the graph to run a real-time blast radius simulation.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="glass-card p-6">
                <h3 className="text-sm font-bold text-surface-50 mb-4 uppercase tracking-wider">Top Enterprise Risks</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-900 border border-surface-800 cursor-pointer hover:border-danger/50 transition-colors" onClick={() => { setSelectedNodeId('1'); setTicketGenerated(false); }}>
                    <Database size={16} className="text-danger mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-surface-100">Oracle 11g</div>
                      <div className="text-xs text-surface-500 mt-1">EOL reached. 2 dependent business apps.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-900 border border-surface-800 cursor-pointer hover:border-danger/50 transition-colors" onClick={() => { setSelectedNodeId('2'); setTicketGenerated(false); }}>
                    <Cpu size={16} className="text-danger mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-surface-100">Java 8</div>
                      <div className="text-xs text-surface-500 mt-1">Unsupported runtime. 2 dependent business apps.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
