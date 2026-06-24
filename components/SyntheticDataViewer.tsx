'use client';

import { useState } from 'react';
import { applications } from '@/data/mockApplications';
import { eaimm } from '@/data/mockEAIMM';
import { lineageData } from '@/data/mockLineage';
import { kpis } from '@/data/mockMetrics';
import { stewards } from '@/data/mockStewards';
import { Database, FileJson, Table2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_DATA = {
  Applications: applications,
  'EAIMM Metrics': eaimm,
  'Data Lineage': lineageData,
  'Platform Metrics': kpis,
  'Data Stewards': stewards,
};

type DatasetKey = keyof typeof ALL_DATA;

export default function SyntheticDataViewer() {
  const [activeDataset, setActiveDataset] = useState<DatasetKey>('Applications');
  const [viewMode, setViewMode] = useState<'table' | 'json'>('table');
  const [isOpen, setIsOpen] = useState(false);

  const data = ALL_DATA[activeDataset];
  const isArray = Array.isArray(data);
  const dataArray = isArray ? data : [data];
  const keys = dataArray.length > 0 ? Object.keys(dataArray[0]).filter(k => typeof (dataArray[0] as any)[k] !== 'object') : [];

  return (
    <div className="mt-12 rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card overflow-hidden">
      
      {/* Disclaimer Banner */}
      <div className="mb-6 rounded-lg bg-blue-500/10 border border-blue-500/20 p-4 flex gap-4 items-start">
        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-100 mb-1">Synthetic Data Disclaimer</h3>
          <p className="text-sm text-blue-200/70 leading-relaxed">
            All data presented in this dashboard—including applications, lifecycles, SLA metrics, and anomaly scores—has been <strong>synthesized for demonstration purposes</strong>. This ensures no proprietary or sensitive enterprise data is exposed while demonstrating the TOGAF-compliant Data Product architecture.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-surface-50 flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            Raw Synthetic Data Explorer
          </h2>
          <p className="text-sm text-surface-400 mt-1">
            Explore the underlying dataset powering this dashboard.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 rounded-lg bg-surface-700/50 hover:bg-surface-700 text-sm font-medium transition-colors border border-surface-600/50"
          >
            {isOpen ? 'Hide Data' : 'View Data'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-surface-700/50">
              
              {/* Dataset Selector Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(Object.keys(ALL_DATA) as DatasetKey[]).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveDataset(key)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                      activeDataset === key 
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' 
                        : 'bg-surface-800/50 text-surface-400 border-surface-700 hover:bg-surface-800 hover:text-surface-200'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 mb-4 bg-surface-900/50 p-1 rounded-lg w-fit border border-surface-700/50">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'table' ? 'bg-surface-700 text-surface-50 shadow-sm' : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/50'
                  }`}
                >
                  <Table2 className="w-4 h-4" /> Table View
                </button>
                <button
                  onClick={() => setViewMode('json')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'json' ? 'bg-surface-700 text-surface-50 shadow-sm' : 'text-surface-400 hover:text-surface-200 hover:bg-surface-800/50'
                  }`}
                >
                  <FileJson className="w-4 h-4" /> JSON View
                </button>
              </div>

              {viewMode === 'table' ? (
                <div className="overflow-x-auto rounded-lg border border-surface-700/50 max-h-[500px]">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-surface-400 uppercase bg-surface-900/80 sticky top-0">
                      <tr>
                        {keys.map(k => (
                          <th key={k} className="px-4 py-3 whitespace-nowrap">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-800/50">
                      {dataArray.map((row, i) => (
                        <tr key={i} className="hover:bg-surface-800/30 transition-colors">
                          {keys.map(k => (
                            <td key={k} className="px-4 py-3 whitespace-nowrap text-surface-300">
                              {String((row as any)[k])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-[#0d1117] rounded-lg border border-surface-700/50 p-4 max-h-[500px] overflow-auto">
                  <pre className="text-sm font-mono text-surface-300">
                    {JSON.stringify(data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
