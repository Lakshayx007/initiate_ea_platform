'use client';

import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  ShieldAlert,
  AlertOctagon,
  Activity,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { stewards } from '@/data/mockStewards';

// Elegant SaaS Lines
const LINE_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4'];

const statusConfig = {
  'on-target': {
    label: 'Healthy',
    icon: CheckCircle2,
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    border: 'border-emerald-500/20',
  },
  watch: {
    label: 'Elevated',
    icon: AlertTriangle,
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500/20',
  },
  critical: {
    label: 'Critical',
    icon: XCircle,
    bg: 'bg-red-500/10',
    text: 'text-red-500',
    border: 'border-red-500/20',
  },
} as const;

const severityConfig = {
  high: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' },
  medium: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
  low: { bg: 'bg-surface-500/10', text: 'text-surface-400', border: 'border-surface-500/20' },
} as const;

const exceptionStatusConfig = {
  open: { bg: 'bg-red-500/10', text: 'text-red-500', label: 'Action Required', border: 'border-red-500/20' },
  'in-progress': { bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'In Progress', border: 'border-blue-500/20' },
  'pending-approval': { bg: 'bg-purple-500/10', text: 'text-purple-400', label: 'Under Review', border: 'border-purple-500/20' },
} as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function EChartsGauge({ value, target, size = 80 }: { value: number; target: number; size?: number }) {
  const color = value >= target ? '#10B981' : value >= target - 5 ? '#F59E0B' : '#EF4444';
  
  const options = {
    series: [
      {
        type: 'gauge',
        startAngle: 200,
        endAngle: -20,
        pointer: { show: false },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: { color: color }
        },
        axisLine: {
          lineStyle: { width: 4, color: [[1, 'rgba(255, 255, 255, 0.05)']] }
        },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: [{ value, detail: { offsetCenter: ['0%', '10%'] } }],
        detail: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#fff',
          formatter: '{value}%',
        }
      }
    ]
  };

  return (
    <div className="relative" style={{ width: size, height: size * 0.8 }}>
      <ReactECharts 
        option={options} 
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none pb-2">
        <span className="text-[10px] text-surface-500 font-medium">Target {target}%</span>
      </div>
    </div>
  );
}

export default function StewardSLADashboard() {
  const weightedAvg = useMemo(() => {
    const totalApps = stewards.reduce((sum, s) => sum + s.applicationCount, 0);
    const weightedSum = stewards.reduce(
      (sum, s) => sum + s.slaCompliance * s.applicationCount,
      0,
    );
    return Math.round((weightedSum / totalApps) * 10) / 10;
  }, []);

  const chartData = useMemo(() => {
    if (stewards.length === 0) return { months: [], series: [] };
    const months = stewards[0].history.map((h) => h.month);
    
    const series: any[] = stewards.map((s, idx) => ({
      name: s.name,
      type: 'line',
      smooth: true,
      symbolSize: 0,
      itemStyle: { color: LINE_COLORS[idx % LINE_COLORS.length] },
      lineStyle: { width: 2 },
      data: s.history.map(h => h.slaCompliance)
    }));

    series.push({
      name: 'SLA Target (90%)',
      type: 'line',
      smooth: false,
      symbol: 'none',
      lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.3)', width: 1 },
      data: months.map(() => 90)
    });

    return { months, series };
  }, []);

  const allExceptions = useMemo(() => {
    return stewards.flatMap((s) =>
      s.activeExceptions.map((exc) => ({ ...exc, stewardName: s.name, domain: s.domain })),
    );
  }, []);

  const severityDistribution = useMemo(() => {
    const counts = { high: 0, medium: 0, low: 0 };
    allExceptions.forEach((exc) => {
      counts[exc.severity]++;
    });
    return [
      { name: 'High Impact', value: counts.high, itemStyle: { color: '#EF4444' } },
      { name: 'Medium Impact', value: counts.medium, itemStyle: { color: '#F59E0B' } },
      { name: 'Low Impact', value: counts.low, itemStyle: { color: '#64748B' } },
    ];
  }, [allExceptions]);

  const totalExceptions = allExceptions.length;

  const pieOptions = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#F4F4F5' }
    },
    series: [
      {
        name: 'Severity',
        type: 'pie',
        radius: ['60%', '80%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: {
          borderWidth: 2,
          borderColor: 'transparent'
        },
        data: severityDistribution
      }
    ]
  };

  const lineOptions = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#F4F4F5' }
    },
    legend: {
      textStyle: { color: '#A1A1AA', fontSize: 12 },
      bottom: 0,
      icon: 'circle'
    },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartData.months,
      axisLabel: { color: '#A1A1AA' },
      splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } }
    },
    yAxis: {
      type: 'value',
      min: 60,
      max: 100,
      axisLabel: { color: '#A1A1AA' },
      splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.05)' } }
    },
    series: chartData.series
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="border-b border-surface-700 pb-4">
        <h2 className="text-2xl font-bold text-surface-50 flex items-center gap-2 tracking-tight">
          <Layers className="w-6 h-6 text-blue-400" />
          Data Governance Hub
        </h2>
        <p className="mt-1 text-sm text-surface-400">
          Executive view of SLA adherence, data quality issue resolution, and domain accountability.
        </p>
      </motion.div>

      {/* Overall Compliance KPI */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 pointer-events-none" />
        <div className="relative flex items-center justify-between z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-surface-400 mb-2">
              Enterprise Governance Score
            </p>
            <div className="flex items-baseline gap-4">
              <p className="text-6xl font-black text-surface-50 tracking-tighter">{weightedAvg}%</p>
              <p className="text-sm text-surface-400 bg-surface-800/50 border border-surface-700 px-2 py-1 rounded">Target: 90%</p>
            </div>
            <p className="mt-4 text-sm text-surface-400 max-w-lg leading-relaxed">
              Overall enterprise adherence to resolving data quality issues within 48 hours. Maintains trust and prevents cascading failures in automated flows.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <div className="p-6 rounded-full border border-surface-700 shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-background/40 backdrop-blur-md">
              <ShieldAlert className="h-16 w-16 text-blue-400" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Steward Profile Cards */}
      <motion.div variants={itemVariants}>
        <h3 className="mb-4 text-sm font-semibold text-surface-300">
          Domain Owners
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stewards.map((steward, idx) => {
            const status = statusConfig[steward.status];
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={steward.id}
                variants={itemVariants}
                className={`glass-card p-5 group transition-all duration-300`}
              >
                <div className="relative">
                  {/* Status badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${status.bg} ${status.text} ${status.border}`}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </span>
                    <span className="text-[11px] font-semibold text-surface-500 uppercase tracking-widest">
                      {steward.domain}
                    </span>
                  </div>

                  {/* Profile + Gauge */}
                  <div className="flex flex-col items-center gap-3">
                    <EChartsGauge
                      value={steward.slaCompliance}
                      target={steward.slaTarget}
                      size={120}
                    />
                    <div className="w-full text-center border-t border-surface-700/50 pt-4">
                      <p className="truncate text-base font-bold text-surface-200">{steward.name}</p>
                      <p className="truncate text-[11px] text-surface-400 mt-0.5">{steward.role}</p>
                      <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-surface-400 font-medium bg-surface-800/50 py-1.5 rounded-md border border-surface-700/50">
                        <User className="h-3.5 w-3.5" />
                        {steward.applicationCount} Monitored Systems
                      </div>
                    </div>
                  </div>

                  {/* Review dates */}
                  <div className="mt-4 flex items-center justify-between border-t border-surface-700/50 pt-4 text-[11px] text-surface-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      <span>Next Eval:</span>
                    </div>
                    <span className="font-semibold text-surface-300">{steward.nextReviewDate}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Exception Queue + Severity Distribution */}
      <motion.div variants={itemVariants} className="grid gap-4 lg:grid-cols-3">
        {/* Exception Queue */}
        <div className="lg:col-span-2 glass-card p-6 flex flex-col h-[400px]">
          <div className="mb-6 flex items-center justify-between border-b border-surface-700 pb-4">
            <div>
              <h3 className="text-sm font-semibold text-surface-200">
                Active Blockers
              </h3>
              <p className="text-[11px] text-surface-500 mt-1">
                Issues preventing data flows that require domain owner resolution.
              </p>
            </div>
            <span className="rounded-full bg-surface-800 px-3 py-1 text-xs font-semibold text-surface-50 border border-surface-700">
              {totalExceptions} Active
            </span>
          </div>
          
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {allExceptions.length === 0 && (
              <p className="py-8 text-center text-sm text-surface-500">System Healthy - No Active Alerts</p>
            )}
            {allExceptions.map((exc, idx) => {
              const sev = severityConfig[exc.severity];
              const excStatus = exceptionStatusConfig[exc.status];
              return (
                <motion.div
                  key={exc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                  className={`flex items-start justify-between gap-4 rounded-xl border bg-background/20 p-4 ${sev.border} transition-colors hover:bg-surface-800/50`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <p className="truncate text-sm font-semibold text-surface-200">
                        {exc.applicationName}
                      </p>
                      <span className="shrink-0 rounded bg-surface-800/50 border border-surface-700 px-2 py-0.5 text-[10px] font-semibold text-surface-400 uppercase tracking-wider">
                        {exc.issueType}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-surface-400">
                      {exc.description}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-surface-500 font-medium">
                      <span>Owner: <span className="text-surface-300">{exc.stewardName}</span> ({exc.domain})</span>
                      <span className="w-1 h-1 rounded-full bg-surface-600" />
                      <span className={excStatus.label === 'Action Required' ? 'text-red-400 font-semibold' : ''}>
                        Due: {exc.dueDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span
                      className={`inline-block rounded-md border px-2 py-1 text-[10px] font-bold uppercase tracking-widest ${sev.bg} ${sev.text} ${sev.border}`}
                    >
                      {exc.severity} IMPACT
                    </span>
                    <span
                      className={`inline-block rounded-md border px-2 py-1 text-[10px] font-semibold uppercase ${excStatus.bg} ${excStatus.text} ${excStatus.border}`}
                    >
                      {excStatus.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Severity Distribution */}
        <div className="glass-card p-6 h-[400px] flex flex-col">
          <div className="mb-6 border-b border-surface-700 pb-4">
            <h3 className="text-sm font-semibold text-surface-200">Severity Distribution</h3>
            <p className="text-[11px] text-surface-500 mt-1">Breakdown of active blockers.</p>
          </div>
          
          <div className="flex-1 min-h-[150px]">
            <ReactECharts 
              option={pieOptions} 
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
            />
          </div>
          <div className="mt-4 space-y-3">
            {severityDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block h-3 w-3 rounded-full shadow-inner"
                    style={{ backgroundColor: item.itemStyle.color }}
                  />
                  <span className="text-surface-400 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-surface-200">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SLA Trend Chart */}
      <motion.div
        variants={itemVariants}
        className="glass-card p-6"
      >
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-surface-200">Historical SLA Adherence</h3>
          <p className="text-[11px] text-surface-500 mt-1">6-month trend tracking resolution speed vs 90% enterprise target.</p>
        </div>
        <div className="h-[320px]">
          <ReactECharts 
            option={lineOptions} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
