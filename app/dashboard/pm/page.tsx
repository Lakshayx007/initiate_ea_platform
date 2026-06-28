'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { Calendar, GitCommit, ShieldAlert, CheckCircle2, ArrowRight, LayoutList, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Mock Data for the simulator
const PROJECTS = [
  { id: 'p1', name: 'Project Alpha (CRM Migration)', start: 1, end: 3, infrastructure: ['db-crm', 'api-gateway'] },
  { id: 'p2', name: 'Project Beta (HR Upgrade)', start: 3, end: 5, infrastructure: ['db-hr', 'api-gateway', 'auth-service'] },
  { id: 'p3', name: 'Project Gamma (Security Patch)', start: 4, end: 6, infrastructure: ['auth-service', 'db-crm'] },
];

const INFRA_MAP: Record<string, string> = {
  'db-crm': 'Core CRM Database',
  'db-hr': 'Core HR Database',
  'api-gateway': 'Enterprise API Gateway',
  'auth-service': 'Identity Provider (IdP)'
};

export default function PMPage() {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [isHalted, setIsHalted] = useState(false);

  // Calculate collisions for the selected week
  const activeProjects = selectedWeek 
    ? PROJECTS.filter(p => selectedWeek >= p.start && selectedWeek <= p.end) 
    : [];

  const infrastructureCount: Record<string, string[]> = {};
  activeProjects.forEach(p => {
    p.infrastructure.forEach(infra => {
      if (!infrastructureCount[infra]) infrastructureCount[infra] = [];
      infrastructureCount[infra].push(p.name);
    });
  });

  const collisions = Object.entries(infrastructureCount)
    .filter(([_, projects]) => projects.length > 1)
    .map(([infra, projects]) => ({
      infraId: infra,
      name: INFRA_MAP[infra],
      projects
    }));

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          
          <div className="mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs font-semibold text-warning mb-4">
              <Calendar size={14} /> Deployment Governance
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text mb-4">
              Conflict Detector Engine
            </h1>
            <p className="text-lg text-surface-400 max-w-2xl">
              Prevent multi-million dollar deployment failures. Select a deployment window to instantly detect cross-project collisions on shared enterprise infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Timeline Simulator */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="glass-card flex-1 p-6">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-lg font-semibold text-surface-50 flex items-center gap-2">
                      <LayoutList size={18} className="text-primary-light" /> Timeline
                    </h2>
                    <p className="text-sm text-surface-400">Select a deployment week to scan for collisions</p>
                  </div>
                </div>

                {/* Simulated Weeks */}
                <div className="flex justify-between items-end border-b border-surface-800 pb-2 mb-4 px-2">
                  {[1, 2, 3, 4, 5, 6].map(week => (
                    <div 
                      key={week}
                      onClick={() => { setSelectedWeek(week); setIsHalted(false); }}
                      className={`cursor-pointer transition-all ${selectedWeek === week ? 'text-primary-light font-bold scale-110' : 'text-surface-500 hover:text-surface-300'}`}
                    >
                      Wk {week}
                    </div>
                  ))}
                </div>

                {/* Gantt Chart UI */}
                <div className="space-y-4 relative mt-8">
                  {/* Vertical highlight line for selected week */}
                  {selectedWeek && (
                    <motion.div 
                      layoutId="week-highlight"
                      className="absolute top-0 bottom-0 w-[16.66%] bg-primary/10 border-l border-r border-primary/20 z-0 pointer-events-none"
                      initial={false}
                      animate={{ left: `${(selectedWeek - 1) * 16.66}%` }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  {PROJECTS.map(project => {
                    const isActive = selectedWeek && selectedWeek >= project.start && selectedWeek <= project.end;
                    const isColliding = isActive && collisions.some(c => c.projects.includes(project.name));

                    return (
                      <div key={project.id} className="relative h-12 flex items-center z-10">
                        <div className="absolute left-0 w-[20%] text-xs font-semibold text-surface-300 pr-4 truncate">
                          {project.name}
                        </div>
                        <div className="absolute left-[20%] right-0 h-full flex items-center">
                          <div 
                            className={`h-6 rounded-md shadow-lg transition-colors flex items-center px-3 text-[10px] font-bold text-white tracking-widest
                              ${isColliding ? 'bg-danger' : isActive ? 'bg-primary-light' : 'bg-surface-800 border border-surface-700 text-transparent'}`}
                            style={{ 
                              left: `${(project.start - 1) * 16.66}%`, 
                              width: `${(project.end - project.start + 1) * 16.66}%`,
                              position: 'absolute'
                            }}
                          >
                            {isActive && (isColliding ? 'COLLISION RISK' : 'CLEAR')}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* AI Diagnostics Panel */}
            <div className="lg:col-span-5 flex flex-col">
              <AnimatePresence mode="wait">
                {!selectedWeek ? (
                  <motion.div 
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card flex-1 p-6 flex flex-col items-center justify-center text-center border-dashed border-surface-700"
                  >
                    <div className="w-16 h-16 rounded-full bg-surface-900 flex items-center justify-center text-surface-600 mb-4 border border-surface-800">
                      <GitCommit size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-surface-50 mb-2">Awaiting Selection</h3>
                    <p className="text-sm text-surface-400">
                      Select a deployment window on the timeline to run the infrastructure collision engine.
                    </p>
                  </motion.div>
                ) : collisions.length > 0 ? (
                  <motion.div 
                    key="collision"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card flex-1 p-6 border-danger/30 shadow-[0_0_40px_rgba(238,0,0,0.15)] bg-surface-950"
                  >
                    <div className="flex items-center gap-2 text-danger mb-6 uppercase tracking-widest text-xs font-bold">
                      <ShieldAlert size={16} className="animate-pulse" /> Critical Collision Detected
                    </div>

                    <div className="space-y-6">
                      {collisions.map((c, idx) => (
                        <div key={idx} className="bg-danger/10 border border-danger/30 rounded-xl p-5 relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Database size={80} />
                          </div>
                          
                          <h3 className="text-lg font-bold text-surface-50 mb-1 relative z-10">{c.name}</h3>
                          <p className="text-sm text-danger-light font-medium mb-4 relative z-10">Shared Infrastructure Conflict</p>
                          
                          <div className="relative z-10">
                            <div className="text-xs text-surface-400 uppercase tracking-wider mb-2">Conflicting Deployments:</div>
                            <ul className="space-y-2">
                              {c.projects.map(p => (
                                <li key={p} className="text-sm text-surface-200 flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-danger" /> {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      {isHalted ? (
                        <Link href="/dashboard/tickets" className="w-full py-3 px-4 rounded-lg bg-success/20 border border-success/50 text-success flex items-center justify-center gap-2 font-bold text-sm hover:bg-success/30 transition-colors cursor-pointer block text-center">
                          <CheckCircle2 size={18} className="inline-block mr-1" /> Deployments Halted - INC-09283 Created <ArrowRight size={14} className="inline-block" />
                        </Link>
                      ) : (
                        <button 
                          onClick={() => setIsHalted(true)}
                          className="w-full glow-button flex justify-center items-center gap-2 bg-surface-800 text-surface-50 hover:bg-danger hover:text-white border border-danger/50"
                        >
                          <ShieldAlert size={16} /> Halt Deployments
                        </button>
                      )}

                      <Link href="/dashboard/tickets" className="w-full mt-3 flex justify-center items-center gap-2 text-surface-400 hover:text-surface-50 text-sm transition-colors py-2 border border-surface-800 rounded-lg hover:bg-surface-800">
                        View All Active Tickets
                      </Link>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div 
                    key="clear"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card flex-1 p-6 border-success/30 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                  >
                    <div className="flex items-center gap-2 text-success mb-6 uppercase tracking-widest text-xs font-bold">
                      <CheckCircle2 size={16} /> Pathway Clear
                    </div>

                    <div className="flex flex-col items-center justify-center text-center h-full pb-10">
                      <div className="w-24 h-24 rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-surface-50 mb-2">No Collisions Found</h3>
                      <p className="text-sm text-surface-400 max-w-xs mx-auto">
                        The selected deployment window has no intersecting infrastructure dependencies.
                      </p>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
