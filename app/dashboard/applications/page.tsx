'use client';

import Header from '@/components/Header';
import ApplicationTable from '@/components/ApplicationTable';

export default function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-purple-400 bg-clip-text text-transparent mb-2">Applications</h1>
            <p className="mt-2 text-surface-400">
              Browse and search the complete application inventory. Evaluated using the <strong className="text-surface-200">TIME Classification</strong> (Tolerate, Invest, Migrate, Eliminate) to drive portfolio strategy by scoring business value against technical fit.
            </p>
          </div>

          {/* Application Table */}
          <div className="rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card">
            <ApplicationTable />
          </div>
        </div>
      </main>
    </div>
  );
}
