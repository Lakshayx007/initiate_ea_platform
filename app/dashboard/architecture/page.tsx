'use client';

import Header from '@/components/Header';
import InteractiveArchitecture from '@/components/InteractiveArchitecture';
import AsIsVsToBe from '@/components/AsIsVsToBe';
import IntegrationFlow from '@/components/IntegrationFlow';
import IntegrationPatterns from '@/components/IntegrationPatterns';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">Integration Architecture</h1>
            <p className="mt-2 text-surface-400">
              The 5-layer Enterprise Architecture Data Product platform
            </p>
          </div>

          <div className="rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card overflow-x-auto mb-12">
            <InteractiveArchitecture />
          </div>

          <div className="rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card overflow-x-auto mb-12">
            <AsIsVsToBe />
          </div>

          <div className="rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card overflow-x-auto mb-12">
            <IntegrationFlow />
          </div>

          <div className="rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card overflow-x-auto">
            <IntegrationPatterns />
          </div>
        </div>
      </main>
    </div>
  );
}
