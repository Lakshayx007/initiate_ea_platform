'use client';

import { Clock, CheckCircle2, AlertTriangle, ShieldAlert, GitMerge, FileJson, Server, Activity, ChevronRight, XCircle, HeartPulse } from 'lucide-react';
import type { LineageEntry } from '@/data/mockLineage';
import { motion } from 'framer-motion';

interface DataLineageFlowProps {
  appName: string;
  lineage: LineageEntry;
}

export default function DataLineageFlow({
  appName,
  lineage,
}: DataLineageFlowProps) {
  
  const qualityScore = lineage.dataQuality.overallScore;
  const qualityColor =
    qualityScore >= 98
      ? 'text-teal-400'
      : qualityScore >= 95
        ? 'text-amber-400'
        : 'text-red-500';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-surface-800 pb-4">
        <h2 className="text-2xl font-bold text-surface-100 flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-primary-light" />
          System Anatomy & Data Flow
        </h2>
        <p className="mt-1 text-sm text-surface-400 font-mono">
          DIAGNOSTIC_TRACE // END_TO_END_VITALS
        </p>
      </div>

      {/* Integration Flow Visualization */}
      <div className="rounded-lg border border-surface-700 bg-surface-900 p-6 relative overflow-hidden mesh-gradient-bg">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
          {/* Source System */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex w-full lg:w-1/3 flex-col items-center text-center gap-3 rounded border border-surface-700 bg-surface-950 p-4 hover:border-primary-light transition-colors relative"
          >
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[8px] uppercase font-mono text-teal-400">Online</span>
            </div>
            <div className="w-12 h-12 rounded-sm bg-surface-900 border border-surface-800 flex items-center justify-center mt-2">
              <Server className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-surface-500 font-mono mb-1">Origin Node</div>
              <div className="text-sm font-bold text-surface-200 font-mono uppercase">{lineage.sourceSystem}</div>
              <div className="text-[9px] text-surface-600 font-mono mt-1 truncate max-w-[200px]" title={lineage.sourceEndpoint}>{lineage.sourceEndpoint}</div>
            </div>
            <p className="text-[10px] text-surface-500 leading-relaxed border-t border-surface-800 pt-2 mt-1 uppercase font-mono w-full">
              Raw Operational Data
            </p>
          </motion.div>

          {/* Arrow / Gateway */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center shrink-0 w-full lg:w-auto my-4 lg:my-0"
          >
            <div className="text-[9px] text-primary-light font-mono font-bold uppercase tracking-widest mb-1 bg-primary-dark/20 px-2 py-0.5 rounded border border-primary-dark/30">Transport: {lineage.protocol}</div>
            <div className="flex items-center gap-0">
              <div className="relative h-1 w-12 lg:w-20 bg-surface-800 overflow-hidden">
                 <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-primary-light animate-[flow-pulse_1s_ease-in-out_infinite]" />
              </div>
              <div className="w-14 h-14 rounded-sm border-2 border-primary-light bg-surface-900 flex items-center justify-center relative shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                <Activity className="w-6 h-6 text-primary-light" />
                {lineage.recordsFailed > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-sm animate-pulse border border-surface-900" />
                )}
              </div>
              <div className="relative h-1 w-12 lg:w-20 bg-surface-800 overflow-hidden">
                 <div className="absolute top-0 bottom-0 left-0 w-1/3 bg-teal-400 animate-[flow-pulse_1.5s_ease-in-out_infinite]" />
              </div>
            </div>
            <div className="text-[11px] font-bold text-surface-300 mt-2 font-mono uppercase tracking-widest">Enterprise Gateway</div>
            <p className="text-[9px] text-surface-500 mt-1 max-w-[150px] text-center font-mono uppercase">
              Secure Validation Layer
            </p>
          </motion.div>

          {/* EA Repository */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex w-full lg:w-1/3 flex-col items-center text-center gap-3 rounded border border-surface-700 bg-surface-950 p-4 hover:border-teal-500 transition-colors"
          >
            <div className="w-12 h-12 rounded-sm bg-surface-900 border border-surface-800 flex items-center justify-center mt-2">
              <FileJson className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-surface-500 font-mono mb-1">Destination Node</div>
              <div className="text-sm font-bold text-surface-200 font-mono uppercase">Intelligence Repo</div>
              <div className="text-[9px] text-surface-600 font-mono mt-1 uppercase">Format: {lineage.dataFormat}</div>
            </div>
            <p className="text-[10px] text-surface-500 leading-relaxed border-t border-surface-800 pt-2 mt-1 uppercase font-mono w-full">
              Standardized Output
            </p>
          </motion.div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Sync Status */}
        <div className="glass-card p-5 border-l-4 border-l-primary-light">
          <div className="text-[10px] font-bold uppercase tracking-widest text-surface-500 mb-3 flex items-center justify-between font-mono">
            Pipeline Volume
            <span className="text-[9px] bg-surface-800 border border-surface-700 px-2 py-0.5 rounded text-primary-light">{lineage.frequency}</span>
          </div>
          <div className="flex items-end justify-between font-mono">
            <div>
              <div className="text-4xl font-black text-surface-100 tracking-tighter">{lineage.recordsProcessed.toLocaleString()}</div>
              <div className="text-[10px] text-surface-500 mt-1 font-bold tracking-widest uppercase">Records Processed</div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${lineage.recordsFailed > 0 ? 'text-amber-400' : 'text-teal-400'}`}>
                {lineage.recordsFailed.toLocaleString()}
              </div>
              <div className="text-[10px] text-surface-500 mt-1 font-bold tracking-widest uppercase">Quarantined</div>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-surface-800 flex items-center gap-2 font-mono">
            <Clock className="w-3 h-3 text-surface-500" />
            <span className="text-[9px] text-surface-500 uppercase font-bold tracking-wider">Last Sync: <span className="text-surface-300">{new Date(lineage.lastSyncTimestamp).toLocaleString()}</span></span>
          </div>
        </div>

        {/* Quality Score */}
        <div className="glass-card p-5 border-l-4 border-l-teal-500">
          <div className="text-[10px] font-bold uppercase tracking-widest text-surface-500 mb-3 flex items-center justify-between font-mono">
            Diagnostic Health
            <span className={`text-[9px] border px-2 py-0.5 rounded flex items-center gap-1 ${
              lineage.dataQuality.rulesFailed > 0 
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                : 'bg-teal-500/10 text-teal-400 border-teal-500/30'
            }`}>
              {lineage.dataQuality.rulesPassed}/{lineage.dataQuality.validationRules} PASS
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`text-5xl font-black tracking-tighter font-mono ${qualityColor}`}>
              {qualityScore.toFixed(1)}<span className="text-2xl text-surface-600">%</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="w-full bg-surface-800 rounded-sm h-1.5 overflow-hidden">
                <div className="bg-teal-400 h-full rounded-sm" style={{ width: `${lineage.dataQuality.completeness}%` }} />
              </div>
              <div className="w-full bg-surface-800 rounded-sm h-1.5 overflow-hidden">
                <div className="bg-primary-light h-full rounded-sm" style={{ width: `${lineage.dataQuality.accuracy}%` }} />
              </div>
              <div className="w-full bg-surface-800 rounded-sm h-1.5 overflow-hidden">
                <div className="bg-purple-400 h-full rounded-sm" style={{ width: `${lineage.dataQuality.consistency}%` }} />
              </div>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-surface-800 flex justify-between text-[9px] text-surface-500 font-mono font-bold uppercase tracking-wider">
            <span>CMP: <span className="text-surface-300">{lineage.dataQuality.completeness}%</span></span>
            <span>ACC: <span className="text-surface-300">{lineage.dataQuality.accuracy}%</span></span>
            <span>CON: <span className="text-surface-300">{lineage.dataQuality.consistency}%</span></span>
          </div>
        </div>

        {/* Steward Info */}
        <div className="glass-card p-5 border-l-4 border-l-surface-600">
          <div className="text-[10px] font-bold uppercase tracking-widest text-surface-500 mb-3 font-mono">Attending Specialist</div>
          <div className="mt-2 flex flex-col gap-4">
            <div className="font-mono">
              <p className="text-sm font-bold text-surface-200 uppercase tracking-widest">{lineage.stewardAssigned}</p>
              <p className="text-[10px] text-surface-400 mt-1 uppercase">Dept: {lineage.stewardDomain}</p>
            </div>
            {lineage.dataQuality.failedRuleDetails && lineage.dataQuality.failedRuleDetails.length > 0 && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-sm p-3">
                <div className="flex items-start gap-2 text-amber-400">
                  <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="text-[10px] font-mono">
                    <span className="font-bold block mb-1 uppercase tracking-widest">Active Alerts</span>
                    <ul className="list-disc pl-3 space-y-1 text-surface-300 opacity-90">
                      {lineage.dataQuality.failedRuleDetails.map((detail, i) => (
                        <li key={i} className="line-clamp-2" title={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {(!lineage.dataQuality.failedRuleDetails || lineage.dataQuality.failedRuleDetails.length === 0) && (
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-sm p-3 flex items-center gap-2 text-teal-400">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold font-mono uppercase tracking-widest">No active alerts. Protocol met.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Execution Timeline */}
      <div className="glass-card p-6">
        <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-surface-200 flex items-center gap-2 font-mono border-b border-surface-800 pb-3">
          <Activity className="w-4 h-4 text-primary-light" />
          Protocol Execution Log
        </h3>
        <div className="space-y-4">
          {lineage.timeline.map((event, idx) => {
            const time = new Date(event.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            });

            return (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                key={idx} 
                className="flex gap-4 group"
              >
                {/* Timeline dot */}
                <div className="flex min-w-fit flex-col items-center pt-1">
                  <div className={`w-3 h-3 rounded-sm border-2 ${
                    event.status === 'completed' ? 'bg-teal-500 border-teal-400' :
                    event.status === 'failed' ? 'bg-red-500 border-red-400' :
                    'bg-surface-500 border-surface-400'
                  }`} />
                  {idx < lineage.timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-surface-800 mt-1 group-hover:bg-primary-dark transition-colors" />
                  )}
                </div>

                {/* Event details */}
                <div className="pb-4 flex-1 bg-surface-900 rounded p-3 border border-transparent group-hover:border-surface-700 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold font-mono text-primary-light bg-primary-900/20 px-1.5 py-0.5 rounded border border-primary-800/30">[{time}]</span>
                      <span className="text-[11px] font-bold text-surface-200 font-mono uppercase tracking-widest">{event.event}</span>
                    </div>
                    {event.duration && (
                      <span className="text-[9px] text-surface-500 font-mono font-bold tracking-wider">{event.duration}</span>
                    )}
                  </div>
                  <p className="text-[10px] text-surface-400 leading-relaxed pl-1 font-mono">{event.details}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
