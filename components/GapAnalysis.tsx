'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Info,
  ArrowRight,
  Shield,
} from 'lucide-react';

const gaps = [
  { id: 'G01', description: 'No automated data sync between source systems and EA repo', severity: 'Critical' as const, current: 'Manual, 4-8 week lag', required: 'Real-time / near-real-time via API', resolved: true },
  { id: 'G02', description: 'No canonical data model for application entities', severity: 'Critical' as const, current: 'Each system defines "application" differently', required: 'Unified canonical schema', resolved: true },
  { id: 'G03', description: 'No data ownership and stewardship framework', severity: 'High' as const, current: 'Ad-hoc, survey-based', required: 'Formal stewards per domain with SLAs', resolved: true },
  { id: 'G04', description: 'No traceability from business capability to application', severity: 'High' as const, current: 'Apps not linked to capabilities', required: 'Automated capability-to-app mapping', resolved: true },
  { id: 'G05', description: 'EA repository coverage only ~40% of enterprise apps', severity: 'Critical' as const, current: 'Survey non-response leaves 60% unmapped', required: '95%+ coverage with automated discovery', resolved: true },
  { id: 'G06', description: 'No API governance layer', severity: 'High' as const, current: 'Direct, ungoverned system access', required: 'Centralized API gateway with rate limiting', resolved: true },
  { id: 'G07', description: 'No data quality monitoring', severity: 'High' as const, current: 'Errors discovered only during manual review', required: 'Automated validation with quality dashboard', resolved: true },
  { id: 'G08', description: 'No event-driven update mechanism', severity: 'Medium' as const, current: 'Batch/manual only', required: 'Event streams trigger EA updates on change', resolved: true },
  { id: 'G09', description: 'No integration roadmap or architecture blueprint', severity: 'Medium' as const, current: 'No target architecture defined', required: 'Documented integration architecture per TOGAF', resolved: true },
  { id: 'G10', description: 'No project-to-application traceability', severity: 'High' as const, current: 'PPM and EA repo completely disconnected', required: 'Automated project-app relationship mapping', resolved: true },
];

const severityConfig = {
  Critical: {
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    icon: AlertOctagon,
  },
  High: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    icon: AlertTriangle,
  },
  Medium: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    icon: Info,
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function GapAnalysis() {
  const resolvedCount = useMemo(() => gaps.filter((g) => g.resolved).length, []);
  const totalCount = gaps.length;
  const progressPct = Math.round((resolvedCount / totalCount) * 100);

  const severityCounts = useMemo(() => {
    const counts = { Critical: 0, High: 0, Medium: 0 };
    gaps.forEach((g) => {
      counts[g.severity]++;
    });
    return counts;
  }, []);

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-surface-100">Gap Analysis</h2>
        <p className="mt-1 text-sm text-surface-400">
          Architectural gaps identified during TOGAF ADM assessment with resolution status
        </p>
      </motion.div>

      {/* Summary Bar */}
      <motion.div
        variants={itemVariants}
        className="rounded-xl border border-emerald-700/30 bg-gradient-to-r from-emerald-900/20 to-teal-900/10 p-5 backdrop-blur-sm"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20">
              <Shield className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-surface-400">
                Resolution Progress
              </p>
              <p className="mt-0.5 text-2xl font-bold text-emerald-400">
                {resolvedCount}/{totalCount} Gaps Resolved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {(Object.entries(severityCounts) as [keyof typeof severityConfig, number][]).map(
              ([sev, count]) => {
                const cfg = severityConfig[sev];
                return (
                  <div
                    key={sev}
                    className={`rounded-lg border ${cfg.border} ${cfg.bg} px-3 py-1.5 text-center`}
                  >
                    <p className={`text-lg font-bold ${cfg.text}`}>{count}</p>
                    <p className="text-[10px] text-surface-500">{sev}</p>
                  </div>
                );
              },
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-surface-400">
            <span>Progress</span>
            <span className="font-semibold text-emerald-400">{progressPct}%</span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface-800">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Gap Cards Grid */}
      <motion.div variants={itemVariants} className="grid gap-3">
        {gaps.map((gap, idx) => {
          const sev = severityConfig[gap.severity];
          const SevIcon = sev.icon;
          return (
            <motion.div
              key={gap.id}
              variants={itemVariants}
              whileHover={{ scale: 1.005, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-xl border border-surface-700/30 bg-surface-800/40 p-4 backdrop-blur-sm transition-all hover:border-surface-600/50 hover:shadow-lg hover:shadow-black/20"
            >
              {/* Subtle left accent */}
              <div
                className={`absolute left-0 top-0 h-full w-1 ${
                  gap.severity === 'Critical'
                    ? 'bg-red-500/60'
                    : gap.severity === 'High'
                      ? 'bg-amber-500/60'
                      : 'bg-blue-500/60'
                }`}
              />

              <div className="flex flex-col gap-3 pl-3 sm:flex-row sm:items-start sm:justify-between">
                {/* Left: Gap info */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Gap ID badge */}
                    <span className="inline-flex items-center rounded-md bg-surface-700/60 px-2 py-0.5 text-xs font-bold text-surface-50">
                      {gap.id}
                    </span>
                    {/* Severity badge */}
                    <span
                      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${sev.bg} ${sev.text} ${sev.border}`}
                    >
                      <SevIcon className="h-3 w-3" />
                      {gap.severity}
                    </span>
                    {/* Resolved badge */}
                    {gap.resolved && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                        <CheckCircle2 className="h-3 w-3" />
                        Resolved
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm font-medium text-surface-200">{gap.description}</p>

                  {/* Current vs Required */}
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-red-400">
                        Current State
                      </p>
                      <p className="mt-0.5 text-xs text-surface-400">{gap.current}</p>
                    </div>

                    <ArrowRight className="mx-auto h-4 w-4 shrink-0 text-emerald-500 rotate-90 sm:rotate-0" />

                    <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 flex-1">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-400">
                        Required State
                      </p>
                      <p className="mt-0.5 text-xs text-surface-400">{gap.required}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
