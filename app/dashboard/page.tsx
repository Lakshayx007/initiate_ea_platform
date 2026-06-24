'use client';

import Header from '@/components/Header';
import KPICard from '@/components/KPICard';
import EAIMMRadar from '@/components/EAIMMRadar';
import { kpis } from '@/data/mockMetrics';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, AlertTriangle, Info, Terminal } from 'lucide-react';

const recentActivity = [
  { id: 1, icon: CheckCircle2, color: 'text-teal-400', bg: 'bg-teal-400/10', title: 'ServiceNow CMDB sync completed', desc: '847 delta records processed via webhook', time: '2 min ago' },
  { id: 2, icon: CheckCircle2, color: 'text-teal-400', bg: 'bg-teal-400/10', title: 'Data quality gate passed', desc: 'Snowflake metrics validation — 98.6% score', time: '15 min ago' },
  { id: 3, icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10', title: 'Steward alert generated', desc: 'SAP ECC metadata stale — exception created', time: '1 hour ago' },
  { id: 4, icon: Info, color: 'text-primary-light', bg: 'bg-primary-dark/20', title: 'EAIMM maturity score updated', desc: 'Target score revised based on new automation', time: '3 hours ago' },
  { id: 5, icon: CheckCircle2, color: 'text-teal-400', bg: 'bg-teal-400/10', title: 'Apptio ITFM batch ETL completed', desc: 'Cost attribution mapped to 8 business units', time: '4 hours ago' }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface-950 mesh-gradient-bg">
      <Header />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 border-b border-surface-800 pb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Terminal className="w-8 h-8 text-primary-light" />
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter gradient-text-accent">
                Diagnostic Hub
              </h1>
            </div>
            <p className="text-primary-light/80 text-sm font-mono uppercase tracking-widest pl-11">
              Live System Telemetry // Integration Vitals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* KPI Cards Grid (Takes up 2/3 width on desktop) */}
            <div className="lg:col-span-2">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-4 text-xs font-bold uppercase tracking-widest text-surface-400 font-mono flex items-center gap-2"
              >
                <Activity className="w-4 h-4 text-cyan-500" />
                Key Performance Vitals
              </motion.h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {kpis.map((kpi, idx) => (
                  <KPICard
                    key={kpi.id}
                    kpi={kpi}
                    delay={idx * 100}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="lg:col-span-1">
              <motion.h2 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-4 text-xs font-bold uppercase tracking-widest text-surface-400 font-mono flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-cyan-500" />
                System Logs
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-card p-6 h-[calc(100%-2.5rem)] relative overflow-hidden"
              >
                <div className="absolute inset-0 mesh-gradient-bg opacity-30" />
                <div className="space-y-6 relative z-10">
                  {recentActivity.map((activity, idx) => (
                    <motion.div 
                      key={activity.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + (idx * 0.1) }}
                      className="flex gap-4 relative group"
                    >
                      {/* Timeline line */}
                      {idx !== recentActivity.length - 1 && (
                        <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-surface-800 group-hover:bg-cyan-500/50 transition-colors" />
                      )}
                      
                      <div className={`w-8 h-8 rounded-sm ${activity.bg} flex items-center justify-center shrink-0 border border-surface-700 z-10`}>
                        <activity.icon className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 bg-surface-900/50 hover:bg-surface-800 transition-colors p-3 rounded-md border border-surface-800/50">
                        <h4 className="text-[11px] font-bold text-surface-200 font-mono uppercase tracking-widest truncate">{activity.title}</h4>
                        <p className="text-[10px] text-surface-400 mt-1 font-mono uppercase">{activity.desc}</p>
                        <span className="text-[9px] text-primary-light/80 mt-2 block font-bold tracking-widest uppercase">[{activity.time}]</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* EAIMM Radar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-12"
          >
            <EAIMMRadar />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
