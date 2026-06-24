'use client';

import { useState, useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ShieldAlert, CheckCircle2, AlertTriangle, Play, X } from 'lucide-react';
import { applications } from '@/data/mockApplications';
import DataValidationFlow from './DataValidationFlow';

export default function AnomalyVisualiser() {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const anomalies = applications.filter(a => a.anomalyStatus);
  
  const handleScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setSelectedAppId(null);
    
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  const handleNodeClick = (params: any) => {
    if (params.dataType === 'node' || params.componentType === 'series') {
      const appId = params.data.appId;
      if (appId) {
        setSelectedAppId(appId);
      }
    }
  };

  const option = useMemo(() => {
    // Healthy apps: high DQ, low risk
    // Anomalous apps: lower DQ, high risk
    const data = applications.map(app => {
      const isAnomaly = !!app.anomalyStatus;
      // Only show anomalies if scan is complete
      const isVisibleAnomaly = isAnomaly && scanComplete;
      
      let color = '#3B82F6'; // Default blue
      if (isVisibleAnomaly) color = '#EF4444'; // Red for anomaly
      else if (scanComplete) color = '#10B981'; // Green for scanned & healthy

      return {
        name: app.name,
        value: [app.dqScore, app.riskScore], // X: DQ Score (0-100), Y: Risk Score (0-100)
        appId: app.id,
        itemStyle: {
          color: color,
          shadowBlur: isVisibleAnomaly ? 20 : 0,
          shadowColor: isVisibleAnomaly ? 'rgba(239, 68, 68, 0.8)' : 'transparent',
          opacity: isScanning ? 0.3 : 1
        },
        symbolSize: isVisibleAnomaly ? 24 : 12,
      };
    });

    return {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          return `<div class="font-bold">${params.data.name}</div>
                  <div class="text-xs text-surface-400">DQ Score: ${params.value[0]}%</div>
                  <div class="text-xs text-surface-400">Risk Score: ${params.value[1]}</div>`;
        }
      },
      grid: {
        top: 40,
        right: 40,
        bottom: 40,
        left: 60,
        containLabel: false
      },
      xAxis: {
        name: 'Data Quality Score (%)',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { color: '#9CA3AF' },
        type: 'value',
        min: 0,
        max: 100,
        splitLine: { show: true, lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
        axisLabel: { color: '#6B7280' }
      },
      yAxis: {
        name: 'Risk Level (0-100)',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: { color: '#9CA3AF' },
        type: 'value',
        min: 0,
        max: 100,
        splitLine: { show: true, lineStyle: { color: 'rgba(255, 255, 255, 0.05)' } },
        axisLabel: { color: '#6B7280' }
      },
      series: [
        {
          type: 'scatter',
          data: data,
          animationDelay: (idx: number) => isScanning ? idx * 20 : 0,
          animationDurationUpdate: 1000,
        },
        // Effect scatter for pulsing anomalies
        ...(scanComplete ? [{
          type: 'effectScatter',
          data: data.filter(d => d.itemStyle.color === '#EF4444'),
          symbolSize: 24,
          itemStyle: { color: '#EF4444' },
          rippleEffect: { brushType: 'stroke', scale: 2.5 }
        }] : [])
      ]
    };
  }, [isScanning, scanComplete]);

  const selectedApp = selectedAppId ? applications.find(a => a.id === selectedAppId) : null;

  return (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left side: Controls and Insight Panel */}
      <div className="lg:col-span-1 space-y-6 flex flex-col h-full">
        
        {/* OpenEvolve Control Panel */}
        <div className="bento-card p-6 flex-shrink-0">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Bot className="w-5 h-5 text-surface-50" />
            </div>
            <div>
              <h3 className="font-bold text-surface-100 leading-tight">OpenEvolve</h3>
              <p className="text-xs text-surface-400">Automated Compliance Engine</p>
            </div>
          </div>
          
          <button 
            onClick={handleScan}
            disabled={isScanning}
            className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
              isScanning 
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 cursor-wait' 
                : scanComplete
                  ? 'bg-surface-800/50 text-surface-300 border border-surface-700 hover:bg-surface-800'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-surface-50 shadow-[0_0_20px_rgba(79,70,229,0.3)]'
            }`}
          >
            {isScanning ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
                Scanning Architecture...
              </>
            ) : scanComplete ? (
              <>
                <Play className="w-4 h-4" />
                Re-Run Full Scan
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Run Compliance Scan
              </>
            )}
          </button>
        </div>

        {/* Dynamic Insights Panel */}
        <div className="bento-card p-6 flex-1 flex flex-col min-h-[300px]">
          <h4 className="text-sm font-bold text-surface-400 uppercase tracking-widest mb-4">Scan Results</h4>
          
          {!scanComplete && !isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-surface-500">
              <ShieldAlert className="w-12 h-12 mb-3 opacity-20" />
              <p>Run the OpenEvolve engine to detect<br/>DORA and TOGAF anomalies.</p>
            </div>
          )}

          {isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center text-indigo-400">
              <div className="w-12 h-12 mb-4 relative">
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20" />
                <div className="absolute inset-0 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                <div className="absolute inset-2 rounded-full bg-indigo-500/20 animate-pulse" />
              </div>
              <p className="font-mono text-sm text-center">Validating 20 applications against<br/>6 TOGAF DQ rules...</p>
            </div>
          )}

          {scanComplete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col space-y-4"
            >
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold text-red-400 text-sm">3 Anomalies Detected</h5>
                  <p className="text-xs text-surface-400 mt-1 leading-relaxed">
                    OpenEvolve detected violations across application ownership, data lineage, and end-of-life technologies. DORA compliance is at risk.
                  </p>
                </div>
              </div>

              <div className="space-y-2 mt-2 overflow-y-auto max-h-[250px]">
                {anomalies.map(app => (
                  <button
                    key={app.id}
                    onClick={() => setSelectedAppId(app.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all border ${
                      selectedAppId === app.id
                        ? 'bg-red-500/20 border-red-500/50'
                        : 'bg-surface-800/50 border-surface-700/50 hover:bg-surface-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-surface-200">{app.name}</span>
                      <span className="text-xs text-red-400 font-bold">{app.doraCompliance}</span>
                    </div>
                    <div className="text-xs text-red-400 mt-1 truncate">
                      {app.anomalyStatus}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Right side: Graph and Details */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Scatter Plot */}
        <div className="bento-card h-[400px] relative">
          <div className="absolute top-6 left-6 z-10">
            <h3 className="text-lg font-bold text-surface-50">Risk vs Quality Matrix</h3>
            <p className="text-sm text-surface-400">Applications clustered by compliance health</p>
          </div>
          
          <div className="w-full flex-1 min-h-[300px] pt-16">
            <ReactECharts
              option={option}
              style={{ height: '100%', width: '100%' }}
              opts={{ renderer: 'svg' }}
              onEvents={{ click: handleNodeClick }}
            />
          </div>
        </div>

        {/* Selected Anomaly Details */}
        {selectedApp ? (
          <motion.div
            key={selectedApp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bento-card p-6 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)] relative"
          >
            <button 
              onClick={() => setSelectedAppId(null)}
              className="absolute top-6 right-6 text-surface-500 hover:text-surface-50"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1 block">TOGAF Rule Violation</span>
                <h3 className="text-2xl font-bold text-surface-50 leading-tight">{selectedApp.name}</h3>
                <p className="text-sm text-surface-400 mt-1">{selectedApp.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="p-3 bg-surface-800/50 rounded-lg border border-surface-700/50">
                <div className="text-[10px] uppercase tracking-widest text-surface-500">DQ Score</div>
                <div className="text-lg font-bold text-red-400">{selectedApp.dqScore}%</div>
              </div>
              <div className="p-3 bg-surface-800/50 rounded-lg border border-surface-700/50">
                <div className="text-[10px] uppercase tracking-widest text-surface-500">Risk Level</div>
                <div className="text-lg font-bold text-red-400">{selectedApp.riskScore}/100</div>
              </div>
              <div className="p-3 bg-surface-800/50 rounded-lg border border-surface-700/50">
                <div className="text-[10px] uppercase tracking-widest text-surface-500">DORA Status</div>
                <div className="text-sm font-bold text-red-400 mt-1">{selectedApp.doraCompliance}</div>
              </div>
              <div className="p-3 bg-surface-800/50 rounded-lg border border-surface-700/50">
                <div className="text-[10px] uppercase tracking-widest text-surface-500">Owner</div>
                <div className="text-sm font-medium text-surface-300 mt-1 truncate">{selectedApp.businessOwner}</div>
              </div>
            </div>

            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <h4 className="text-sm font-bold text-red-400 mb-2">OpenEvolve Diagnosis</h4>
              <p className="text-sm text-surface-300 font-mono leading-relaxed">
                {selectedApp.anomalyStatus}
              </p>
              <div className="mt-4 pt-4 border-t border-red-500/20 flex gap-3">
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-surface-50 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-red-500/20">
                  Raise ServiceNow Incident
                </button>
                <button className="px-4 py-2 bg-surface-800/50 hover:bg-surface-800 text-surface-50 rounded-lg text-sm font-bold transition-colors">
                  Notify Data Steward
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bento-card p-6 flex items-center justify-center h-[280px] text-surface-500 text-sm border-dashed border-surface-700/50">
            Select a point on the scatter plot to view violation details.
          </div>
        )}
      </div>
    </div>
    <DataValidationFlow />
  </div>
  );
}
