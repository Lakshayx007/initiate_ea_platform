'use client';

import { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import { DollarSign, TrendingUp, Calculator, Check, ArrowRight, Activity, Percent } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import Link from 'next/link';

// An animated counter component for the premium feel
const AnimatedCounter = ({ value, prefix = '', suffix = '' }: { value: number, prefix?: string, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = start + (end - start) * easeProgress;
      setDisplayValue(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}{suffix}
    </span>
  );
};

export default function CFOPage() {
  // Pre-defined redundant applications for the simulator
  const APPS = useMemo(() => [
    { id: 'app1', name: 'Legacy Siebel CRM', type: 'Business App', cost: 450000, migrationCost: 120000, risk: 'High' },
    { id: 'app2', name: 'Redundant HR Portal (EU)', type: 'Business App', cost: 180000, migrationCost: 40000, risk: 'Low' },
    { id: 'app3', name: 'Shadow BI Tool (Marketing)', type: 'Shadow IT', cost: 85000, migrationCost: 15000, risk: 'Medium' },
    { id: 'app4', name: 'On-Premise File Share', type: 'Infrastructure', cost: 320000, migrationCost: 90000, risk: 'High' },
    { id: 'app5', name: 'Duplicate ServiceNow Instance', type: 'ITSM', cost: 210000, migrationCost: 65000, risk: 'Medium' },
  ], []);

  const [selectedApps, setSelectedApps] = useState<Set<string>>(new Set(['app2', 'app3']));

  const toggleApp = (id: string) => {
    const next = new Set(selectedApps);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedApps(next);
  };

  // Calculations
  const baseBudget = 12500000; // $12.5M baseline IT run cost
  const totalSavings = Array.from(selectedApps).reduce((sum, id) => {
    return sum + (APPS.find(a => a.id === id)?.cost || 0);
  }, 0);
  const totalMigrationCost = Array.from(selectedApps).reduce((sum, id) => {
    return sum + (APPS.find(a => a.id === id)?.migrationCost || 0);
  }, 0);
  
  const netFirstYear = totalSavings - totalMigrationCost;
  const roi3Year = totalMigrationCost > 0 ? Math.round(((totalSavings * 3) - totalMigrationCost) / totalMigrationCost * 100) : 0;

  // Waterfall Chart
  const waterfallOption = useMemo(() => {
    const newBudget = baseBudget - totalSavings;
    
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        backgroundColor: '#0A0A0A',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#EDEDED' },
        formatter: function (params: any) {
          let tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : $' + (tar.value / 1000000).toFixed(2) + 'M';
        }
      },
      grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['Baseline', 'Identified Waste', 'Migration Cost', 'Projected Y1 Budget'],
        axisLabel: { 
          color: '#A1A1AA', 
          fontWeight: 500,
          interval: 0
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#A1A1AA', formatter: (value: number) => `$${value / 1000000}M` },
        splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: { borderColor: 'transparent', color: 'transparent' },
          emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
          data: [0, baseBudget - totalSavings, baseBudget - totalSavings, 0]
        },
        {
          name: 'Budget Impact',
          type: 'bar',
          stack: 'Total',
          itemStyle: { borderRadius: 4 },
          label: {
            show: true,
            position: 'top',
            color: '#EDEDED',
            formatter: (p: any) => `$${(p.value / 1000000).toFixed(2)}M`
          },
          data: [
            { value: baseBudget, itemStyle: { color: '#27272A' } },
            { value: totalSavings, itemStyle: { color: '#10B981' } }, // Green savings going down
            { value: totalMigrationCost, itemStyle: { color: '#E00' } }, // Red cost going up
            { value: newBudget + totalMigrationCost, itemStyle: { color: '#0070F3' } } // Final blue
          ]
        }
      ]
    };
  }, [totalSavings, totalMigrationCost]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          
          {/* Header Section */}
          <div className="mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs font-semibold text-primary-light mb-4">
              <Activity size={14} className="animate-pulse" /> Live Cost Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text mb-4">
              Rationalization Simulator
            </h1>
            <p className="text-lg text-surface-400 max-w-2xl">
              Model the financial impact of retiring redundant applications. The enterprise architecture graph automatically calculates migration costs and projected ROI.
            </p>
          </div>

          {/* Interactive Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-2 text-surface-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                <DollarSign size={16} className="text-success" /> Annual Run Savings
              </div>
              <div className="text-5xl font-bold text-surface-50 tracking-tight">
                <AnimatedCounter value={totalSavings} prefix="$" />
              </div>
              <div className="text-sm text-surface-500 mt-2 font-medium">Perpetual savings after Y1</div>
            </motion.div>

            <motion.div 
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 text-surface-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                <Calculator size={16} className="text-danger" /> 1-Time Migration Cost
              </div>
              <div className="text-5xl font-bold text-surface-50 tracking-tight">
                <AnimatedCounter value={totalMigrationCost} prefix="$" />
              </div>
              <div className="text-sm text-surface-500 mt-2 font-medium">Decommissioning & porting</div>
            </motion.div>

            <motion.div 
              className="glass-card p-6 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <TrendingUp size={100} />
              </div>
              <div className="flex items-center gap-2 text-surface-400 text-sm font-semibold mb-3 uppercase tracking-wider relative z-10">
                <Percent size={16} className="text-primary-light" /> 3-Year Projected ROI
              </div>
              <div className="text-5xl font-bold text-surface-50 tracking-tight relative z-10">
                <AnimatedCounter value={roi3Year} suffix="%" />
              </div>
              <div className="text-sm text-surface-500 mt-2 font-medium relative z-10">Return on migration investment</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* The Simulator Tool */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="glass-card flex-1 flex flex-col p-0 overflow-hidden">
                <div className="p-6 border-b border-surface-800 bg-surface-900/50">
                  <h2 className="text-lg font-semibold text-surface-50 flex items-center gap-2">
                    <Check size={18} className="text-primary-light" /> Scenario Builder
                  </h2>
                  <p className="text-sm text-surface-400 mt-1">Select candidates for retirement</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {APPS.map((app) => {
                    const isSelected = selectedApps.has(app.id);
                    return (
                      <div 
                        key={app.id}
                        onClick={() => toggleApp(app.id)}
                        className={`group relative p-4 rounded-xl border transition-all cursor-pointer overflow-hidden
                          ${isSelected 
                            ? 'bg-surface-800/80 border-surface-600 shadow-[0_0_20px_rgba(255,255,255,0.03)]' 
                            : 'bg-surface-950 border-surface-800 hover:bg-surface-900 hover:border-surface-700'
                          }`}
                      >
                        {isSelected && (
                          <motion.div 
                            layoutId="active-bg"
                            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                        <div className="relative z-10 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors mt-0.5
                              ${isSelected ? 'bg-primary-light border-primary-light text-background' : 'border-surface-600 bg-surface-900 group-hover:border-surface-500'}`}
                            >
                              {isSelected && <Check size={12} strokeWidth={3} />}
                            </div>
                            <div>
                              <div className={`font-semibold transition-colors ${isSelected ? 'text-surface-50' : 'text-surface-200 group-hover:text-surface-50'}`}>
                                {app.name}
                              </div>
                              <div className="text-xs text-surface-500 mt-0.5">{app.type}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${isSelected ? 'text-success' : 'text-surface-300'}`}>
                              ${(app.cost / 1000).toFixed(0)}k <span className="text-xs font-normal text-surface-500">/yr</span>
                            </div>
                            <div className="text-[10px] text-surface-500 mt-0.5 uppercase tracking-wider">
                              Cost
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* The Visualizer */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="glass-card flex-1 p-6 flex flex-col">
                <h2 className="text-lg font-semibold text-surface-50 mb-1">Budget Transition Waterfall</h2>
                <p className="text-sm text-surface-400 mb-8">Visualizing the Y1 budget impact of selected retirements</p>
                
                <div className="flex-1 w-full min-h-[350px]">
                  <ReactECharts 
                    option={waterfallOption} 
                    style={{ height: '100%', width: '100%' }} 
                    notMerge={false}
                    lazyUpdate={true}
                  />
                </div>
                
                <div className="mt-6 pt-6 border-t border-surface-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-surface-400 uppercase tracking-wider font-semibold">Net Y1 Impact</div>
                    <div className="text-2xl font-bold mt-1">
                      <span className={netFirstYear >= 0 ? 'text-success' : 'text-danger'}>
                        {netFirstYear >= 0 ? '+' : '-'}${Math.abs(netFirstYear).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Link href="/dashboard/roi" className="glow-button flex items-center gap-2 text-sm bg-primary hover:bg-primary-light text-white">
                    Generate Business Case <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
