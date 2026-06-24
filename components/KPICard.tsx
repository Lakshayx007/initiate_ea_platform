'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
} from 'lucide-react';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import type { KPI } from '@/data/mockMetrics';
import { isInvertedMetric, calculateInvertedProgress, calculateProgress } from '@/lib/utils';
import * as echarts from 'echarts/core';
import Tooltip from './ui/Tooltip';

interface KPICardProps {
  kpi: KPI;
  delay?: number;
}

const statusConfig = {
  'on-target': {
    dot: 'bg-emerald-500',
    glow: 'shadow-emerald-500/20',
    label: 'On Track',
    Icon: CheckCircle2,
    iconColor: 'text-emerald-500',
    pulseRing: 'bg-emerald-500/40',
    chartColor: '#10B981', 
    chartGradient: ['rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 0.05)']
  },
  watch: {
    dot: 'bg-amber-500',
    glow: 'shadow-amber-500/20',
    label: 'Needs Attention',
    Icon: AlertTriangle,
    iconColor: 'text-amber-500',
    pulseRing: 'bg-amber-500/40',
    chartColor: '#F59E0B', 
    chartGradient: ['rgba(245, 158, 11, 0.4)', 'rgba(245, 158, 11, 0.05)']
  },
  critical: {
    dot: 'bg-red-500',
    glow: 'shadow-red-500/20',
    label: 'Critical Risk',
    Icon: XCircle,
    iconColor: 'text-red-500',
    pulseRing: 'bg-red-500/40',
    chartColor: '#EF4444', 
    chartGradient: ['rgba(239, 68, 68, 0.4)', 'rgba(239, 68, 68, 0.05)']
  },
} as const;

const trendConfig = {
  up: {
    Icon: TrendingUp,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    label: 'Trending up',
  },
  down: {
    Icon: TrendingDown,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    label: 'Trending down',
  },
  stable: {
    Icon: Minus,
    color: 'text-surface-400',
    bg: 'bg-surface-400/10',
    label: 'Stable',
  },
};

export default function KPICard({
  kpi,
  delay = 0,
}: KPICardProps) {
  const [mounted, setMounted] = useState(false);
  const [progressAnimated, setProgressAnimated] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setMounted(true), delay);
    const progressTimer = setTimeout(() => setProgressAnimated(true), delay + 150);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(progressTimer);
    };
  }, [delay]);

  const { name, current, target, baseline, unit, trend, lastUpdated, status, history, id, explanation } = kpi;
  
  const statusCfg = statusConfig[status];
  
  let trendCfg = trendConfig[trend];
  if (isInvertedMetric(id)) {
    if (trend === 'down') {
      trendCfg = {
        Icon: TrendingDown,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        label: 'Trending down (Improving)',
      };
    } else if (trend === 'up') {
      trendCfg = {
        Icon: TrendingUp,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        label: 'Trending up (Worsening)',
      };
    }
  }

  const TrendIcon = trendCfg.Icon;
  const StatusIcon = statusCfg.Icon;

  const inverted = isInvertedMetric(id);
  const progressPercent = inverted 
    ? calculateInvertedProgress(current, target, baseline)
    : calculateProgress(current, baseline, target);
    
  const progressColor = inverted && status === 'on-target' 
    ? 'from-emerald-400 to-emerald-500' 
    : 'from-purple-500 to-purple-400';

  // Premium SaaS Sparkline Configuration
  const sparklineOptions = {
    animation: false,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line', lineStyle: { color: 'rgba(255,255,255,0.1)' } },
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      textStyle: { color: '#F4F4F5', fontSize: 12 },
      formatter: (params: any) => {
        return `<span style="color:#A1A1AA">${params[0].name}</span><br/><span style="font-weight:bold;color:${statusCfg.chartColor}">${params[0].value} ${unit}</span>`;
      }
    },
    grid: { left: 0, right: 0, top: 10, bottom: 0 },
    xAxis: {
      type: 'category',
      data: history.map(h => h.date),
      show: false
    },
    yAxis: {
      type: 'value',
      min: 'dataMin',
      max: 'dataMax',
      show: false,
      splitLine: { show: false }
    },
    series: [
      {
        data: history.map(h => h.value),
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: statusCfg.chartColor,
          width: 2,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: statusCfg.chartGradient[0] },
            { offset: 1, color: statusCfg.chartGradient[1] }
          ])
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="glass-card p-6 flex flex-col justify-between h-full group"
    >
      {/* Header: Name + Status */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <h3 className="text-base font-bold text-surface-200 tracking-tight truncate">{name}</h3>
          <Tooltip content={`EAIMM Focus: ${explanation}`} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 border border-surface-700/50 ${trendCfg.bg}`}>
            <TrendIcon className={`h-3 w-3 ${trendCfg.color}`} />
          </div>
          <div className="relative flex h-3 w-3 items-center justify-center">
            <span className={`absolute inline-flex h-full w-full animate-pulse rounded-full opacity-50 ${statusCfg.pulseRing}`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${statusCfg.dot}`} />
          </div>
        </div>
      </div>
      
      {/* Explanation Text */}
      <p className="text-sm text-surface-400 mb-6 line-clamp-2 leading-relaxed">
        {explanation}
      </p>

      <div className="flex items-end justify-between mt-auto pt-2">
        {/* Current Value */}
        <div className="flex items-baseline gap-1">
          <span
            className={[
              'text-5xl font-extrabold tracking-tighter',
              status === 'on-target'
                ? 'text-surface-50'
                : status === 'watch'
                  ? 'text-amber-500'
                  : 'text-red-500',
            ].join(' ')}
          >
            {current}
          </span>
          <span className="text-sm font-semibold text-surface-500">{unit}</span>
        </div>
        
        {/* Sparkline */}
        <div className="h-16 w-32 opacity-80 group-hover:opacity-100 transition-opacity relative z-10">
          <ReactECharts 
            option={sparklineOptions} 
            style={{ height: '100%', width: '100%' }}
            opts={{ renderer: 'svg' }}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5">
            <StatusIcon className={`h-3.5 w-3.5 ${statusCfg.iconColor}`} />
            <span className={`text-xs font-semibold ${statusCfg.iconColor}`}>
              {statusCfg.label}
            </span>
          </div>
          <span className="text-xs font-medium text-surface-500">
            Target: <span className="text-surface-300">{target}</span>
          </span>
        </div>
        <div className="relative h-1 w-full overflow-hidden bg-surface-800/50 rounded-full">
          <div
            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${progressColor} rounded-full transition-[width] duration-1000 ease-out`}
            style={{ width: progressAnimated ? `${progressPercent}%` : '0%' }}
          >
          </div>
        </div>
      </div>
    </motion.div>
  );
}
