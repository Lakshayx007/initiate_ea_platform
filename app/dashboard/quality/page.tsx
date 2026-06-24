'use client';

import Header from '@/components/Header';
import AnomalyVisualiser from '@/components/AnomalyVisualiser';
import SyntheticDataViewer from '@/components/SyntheticDataViewer';

export default function DataQualityPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* Page Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                Premium Feature
              </span>
              <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full">
                TOGAF Compliant
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-surface-50 mb-3 tracking-tight">
              Data Quality & <span className="bg-gradient-to-r from-red-400 via-orange-400 to-indigo-400 bg-clip-text text-transparent">Anomaly Detection</span>
            </h1>
            <p className="text-surface-400 max-w-2xl leading-relaxed text-sm sm:text-base">
              Monitor your enterprise architecture data health in real-time. Identify End-of-Life technologies, orphaned applications, and DORA non-compliance visually before they impact operations.
            </p>
          </div>

          {/* Core Visualiser Component */}
          <AnomalyVisualiser />

          {/* Synthetic Data Explorer */}
          <SyntheticDataViewer />

        </div>
      </main>
    </div>
  );
}
