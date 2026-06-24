'use client';

import Header from '@/components/Header';
import EAIMMMaturityEvolution from '@/components/EAIMMMaturityEvolution';

export default function MaturityPage() {
  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-2">Maturity Model</h1>
            <p className="text-surface-400 mt-2">
              The Enterprise Architecture Integration Maturity Model (EAIMM) roadmap and milestones.
            </p>
          </div>

          <div className="mb-12">
            <EAIMMMaturityEvolution />
          </div>
        </div>
      </main>
    </div>
  );
}
