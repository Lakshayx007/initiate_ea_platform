'use client';

import { useState, useMemo, useRef } from 'react';
import Header from '@/components/Header';
import { Target, TrendingUp, AlertCircle, Trash2, Shield, Activity, Lightbulb, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
import Link from 'next/link';

const appsData = [
  { id: '1', name: 'Core Banking Engine', businessValue: 95, technicalHealth: 85, cost: 2500000, category: 'Invest', recommendation: 'Modernize APIs for open banking. High value, strong architecture.' },
  { id: '2', name: 'Legacy CRM', businessValue: 80, technicalHealth: 20, cost: 800000, category: 'Migrate', recommendation: 'High risk of failure. Migrate to Salesforce over next 18 months.' },
  { id: '3', name: 'Internal Wiki', businessValue: 30, technicalHealth: 70, cost: 45000, category: 'Tolerate', recommendation: 'Keep as-is. Low cost, acceptable technical health.' },
  { id: '4', name: 'Redundant HR Portal', businessValue: 20, technicalHealth: 15, cost: 150000, category: 'Eliminate', recommendation: 'Decommission immediately. Replaced by Workday.' },
  { id: '5', name: 'Mobile App Backend', businessValue: 90, technicalHealth: 60, cost: 1200000, category: 'Invest', recommendation: 'Refactor to microservices to support scaling user base.' },
  { id: '6', name: 'On-Prem File Storage', businessValue: 40, technicalHealth: 30, cost: 400000, category: 'Eliminate', recommendation: 'Migrate to SharePoint/OneDrive and decommission hardware.' },
  { id: '7', name: 'Data Warehouse', businessValue: 85, technicalHealth: 45, cost: 1800000, category: 'Migrate', recommendation: 'Move to Snowflake to resolve performance bottlenecks.' },
];

export default function CIOPage() {
  const [selectedApp, setSelectedApp] = useState<typeof appsData[0] | null>(null);

  const scatterOption = useMemo(() => {
    const getZoneColor = (bv: number, th: number) => {
      if (bv >= 50 && th >= 50) return '#10B981'; // Invest (Green)
      if (bv >= 50 && th < 50) return '#F5A623'; // Migrate (Amber)
      if (bv < 50 && th >= 50) return '#0070F3'; // Tolerate (Blue)
      return '#E00'; // Eliminate (Red)
    };

    const data = appsData.map(app => {
      const isSelected = selectedApp?.id === app.id;
      const color = getZoneColor(app.businessValue, app.technicalHealth);
      
      return {
        name: app.name,
        value: [app.technicalHealth, app.businessValue, app.cost, app.id],
        itemStyle: {
          color: isSelected ? color : `${color}80`,
          borderColor: isSelected ? '#FFFFFF' : color,
          borderWidth: isSelected ? 3 : 1,
          shadowBlur: isSelected ? 20 : 0,
          shadowColor: color
        }
      };
    });

    return {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: '#0A0A0A',
        borderColor: 'rgba(255,255,255,0.1)',
        textStyle: { color: '#EDEDED' },
        formatter: function (param: any) {
          return `<div class="font-bold mb-1">${param.data.name}</div>
                  <div class="text-xs text-surface-400">Tech Health: <span class="text-surface-50">${param.value[0]}</span></div>
                  <div class="text-xs text-surface-400">Business Value: <span class="text-surface-50">${param.value[1]}</span></div>`;
        }
      },
      grid: { left: '8%', right: '5%', top: '5%', bottom: '10%' },
      xAxis: {
        name: 'Technical Health →',
        nameLocation: 'middle',
        nameGap: 30,
        type: 'value',
        min: 0,
        max: 100,
        splitLine: { show: false },
        axisLabel: { color: '#52525B' },
        axisLine: { lineStyle: { color: '#27272A' } }
      },
      yAxis: {
        name: 'Business Value →',
        nameLocation: 'middle',
        nameGap: 40,
        type: 'value',
        min: 0,
        max: 100,
        splitLine: { show: false },
        axisLabel: { color: '#52525B' },
        axisLine: { lineStyle: { color: '#27272A' } }
      },
      series: [
        {
          type: 'scatter',
          symbolSize: function (data: any) {
            return Math.max(20, Math.min(60, data[2] / 50000));
          },
          data: data,
          markArea: {
            silent: true,
            itemStyle: { opacity: 0.02 },
            data: [
              [
                { xAxis: 50, yAxis: 50, itemStyle: { color: '#10B981' } }, // Top Right: Invest
                { xAxis: 100, yAxis: 100 }
              ],
              [
                { xAxis: 0, yAxis: 50, itemStyle: { color: '#F5A623' } }, // Top Left: Migrate
                { xAxis: 50, yAxis: 100 }
              ],
              [
                { xAxis: 50, yAxis: 0, itemStyle: { color: '#0070F3' } }, // Bottom Right: Tolerate
                { xAxis: 100, yAxis: 50 }
              ],
              [
                { xAxis: 0, yAxis: 0, itemStyle: { color: '#E00' } }, // Bottom Left: Eliminate
                { xAxis: 50, yAxis: 50 }
              ]
            ]
          },
          markLine: {
            silent: true,
            lineStyle: { color: 'rgba(255,255,255,0.1)', type: 'dashed' },
            symbol: ['none', 'none'],
            data: [
              { xAxis: 50 },
              { yAxis: 50 }
            ]
          }
        }
      ]
    };
  }, [selectedApp]);

  const onChartClick = (params: any) => {
    if (params.seriesType === 'scatter') {
      const id = params.data.value[3];
      const app = appsData.find(a => a.id === id);
      if (app) setSelectedApp(app);
    }
  };

  const onChartEvents = {
    click: onChartClick,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl relative">
          
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs font-semibold text-primary mb-4">
              <Target size={14} /> Portfolio Strategy
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text mb-4">
              TIME Matrix Engine
            </h1>
            <p className="text-lg text-surface-400 max-w-2xl">
              Align IT investments with business strategy. Applications are automatically plotted based on EA telemetry to identify targets for modernization or retirement.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 relative">
            
            {/* The Matrix */}
            <div className={`flex-1 transition-all duration-500 ${selectedApp ? 'lg:pr-[400px]' : ''}`}>
              <div className="glass-card p-6 h-[650px] relative">
                
                {/* Quadrant Labels */}
                <div className="absolute top-8 left-8 text-warning/50 font-bold uppercase tracking-widest text-sm pointer-events-none">Migrate</div>
                <div className="absolute top-8 right-8 text-success/50 font-bold uppercase tracking-widest text-sm pointer-events-none">Invest</div>
                <div className="absolute bottom-8 left-8 text-danger/50 font-bold uppercase tracking-widest text-sm pointer-events-none">Eliminate</div>
                <div className="absolute bottom-8 right-8 text-primary/50 font-bold uppercase tracking-widest text-sm pointer-events-none">Tolerate</div>

                <ReactECharts 
                  option={scatterOption} 
                  style={{ height: '100%', width: '100%' }} 
                  onEvents={onChartEvents}
                />
              </div>
            </div>

            {/* AI Insight Side Panel */}
            <AnimatePresence>
              {selectedApp && (
                <motion.div
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 400, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="lg:absolute lg:right-0 lg:top-0 lg:bottom-0 w-full lg:w-[380px] z-10"
                >
                  <div className="glass-card h-full p-6 flex flex-col border-primary/20 bg-surface-950/95 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-y-auto">
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-xs font-bold uppercase tracking-widest text-surface-500">App Intelligence</div>
                      <button 
                        onClick={() => setSelectedApp(null)}
                        className="p-1.5 rounded-md hover:bg-surface-800 text-surface-400 hover:text-surface-50 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <h2 className="text-2xl font-bold text-surface-50 mb-2">{selectedApp.name}</h2>
                    
                    <div className="flex items-center gap-2 mb-8">
                      {selectedApp.category === 'Invest' && <span className="status-badge border-success/30 text-success bg-success/10"><TrendingUp size={12}/> INVEST</span>}
                      {selectedApp.category === 'Migrate' && <span className="status-badge border-warning/30 text-warning bg-warning/10"><AlertCircle size={12}/> MIGRATE</span>}
                      {selectedApp.category === 'Eliminate' && <span className="status-badge border-danger/30 text-danger bg-danger/10"><Trash2 size={12}/> ELIMINATE</span>}
                      {selectedApp.category === 'Tolerate' && <span className="status-badge border-primary/30 text-primary bg-primary/10"><Shield size={12}/> TOLERATE</span>}
                    </div>

                    <div className="space-y-6">
                      
                      <div className="bg-surface-900 border border-surface-800 rounded-xl p-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><Lightbulb size={60} /></div>
                        <div className="text-xs text-primary-light uppercase tracking-wider font-bold flex items-center gap-1.5 mb-2 relative z-10">
                          <Activity size={14} /> AI Recommendation
                        </div>
                        <p className="text-sm text-surface-200 relative z-10 leading-relaxed">
                          {selectedApp.recommendation}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-surface-900 border border-surface-800 rounded-lg p-4">
                          <div className="text-xs text-surface-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                            Business Value
                          </div>
                          <div className="text-3xl font-bold text-surface-50 mb-3">{selectedApp.businessValue}<span className="text-sm text-surface-500 font-normal">/100</span></div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-[10px] text-surface-400 mb-1">
                                <span>Strategic Fit</span>
                                <span>High</span>
                              </div>
                              <div className="h-1 w-full bg-surface-800 rounded-full overflow-hidden">
                                <div className="h-full bg-success" style={{ width: `${Math.min(100, selectedApp.businessValue + 10)}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[10px] text-surface-400 mb-1">
                                <span>User Adoption</span>
                                <span>{selectedApp.businessValue > 50 ? 'High' : 'Low'}</span>
                              </div>
                              <div className="h-1 w-full bg-surface-800 rounded-full overflow-hidden">
                                <div className="h-full bg-success" style={{ width: `${selectedApp.businessValue}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-surface-900 border border-surface-800 rounded-lg p-4">
                          <div className="text-xs text-surface-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                            Tech Health
                          </div>
                          <div className="text-3xl font-bold text-surface-50 mb-3">{selectedApp.technicalHealth}<span className="text-sm text-surface-500 font-normal">/100</span></div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-[10px] text-surface-400 mb-1">
                                <span>Code Quality</span>
                                <span>{selectedApp.technicalHealth > 60 ? 'Good' : 'Poor'}</span>
                              </div>
                              <div className="h-1 w-full bg-surface-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${selectedApp.technicalHealth}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[10px] text-surface-400 mb-1">
                                <span>Cloud Native</span>
                                <span>{selectedApp.technicalHealth > 50 ? 'Yes' : 'No'}</span>
                              </div>
                              <div className="h-1 w-full bg-surface-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${Math.max(10, selectedApp.technicalHealth - 20)}%` }} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-surface-800 pt-6 mt-6">
                        <div className="text-xs text-surface-500 uppercase tracking-wider mb-3">Financials</div>
                        <div className="flex items-end justify-between">
                          <div className="text-sm text-surface-400">Annual Run Cost</div>
                          <div className="text-lg font-bold text-surface-50">${(selectedApp.cost / 1000000).toFixed(2)}M</div>
                        </div>
                      </div>

                    </div>

                    <div className="mt-auto pt-8">
                      <Link href="/dashboard/architecture" className="w-full glow-button flex justify-center items-center gap-2 bg-primary hover:bg-primary-light text-white">
                        Review Architecture <ArrowRight size={16} />
                      </Link>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </main>
    </div>
  );
}
