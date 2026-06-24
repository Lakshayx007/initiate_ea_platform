'use client';

import Header from '@/components/Header';
import EAIMMRadar from '@/components/EAIMMRadar';
import StewardSLADashboard from '@/components/StewardSLADashboard';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">Analytics & Governance</h1>
            <p className="mt-2 text-surface-400">
              EAIMM maturity tracking and steward governance compliance
            </p>
          </div>

          {/* EAIMM Radar Chart */}
          <div className="mb-12">
            <EAIMMRadar />
          </div>

          {/* Steward SLA Dashboard */}
          <div className="rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card">
            <StewardSLADashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
