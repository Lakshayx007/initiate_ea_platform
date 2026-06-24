import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import DataLineageFlow from '@/components/DataLineageFlow';
import { applications } from '@/data/mockApplications';
import { lineageData } from '@/data/mockLineage';
import { ChevronLeft } from 'lucide-react';

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: DetailPageProps) {
  const { id } = await params;

  // Find the application
  const app = applications.find((a) => a.id === id);

  if (!app) {
    notFound();
  }

  const lineage = lineageData.find(l => l.applicationId === id);

  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <Link
            href="/dashboard/applications"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Applications
          </Link>

          {/* Application Header */}
          <div className="mb-8 rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-surface-50 mb-2">{app.name}</h1>
                <p className="text-surface-400">{app.description}</p>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${
                  app.lifecycleStatus === 'Active'
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    : app.lifecycleStatus === 'Retiring'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-surface-500/10 text-surface-400 border-surface-500/20'
                }`}
              >
                {app.lifecycleStatus}
              </span>
            </div>

            {/* Application details grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 bg-surface-900/50 rounded-xl p-5 border border-surface-700/30">
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Business Owner</p>
                <p className="font-semibold text-surface-200">{app.businessOwner}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Technical Owner</p>
                <p className="font-semibold text-surface-200">{app.technicalOwner}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Hosting Model</p>
                <p className="font-semibold text-surface-200">{app.hostingModel}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-surface-500 uppercase tracking-wider mb-1">Classification</p>
                <p className="font-semibold text-surface-200">
                  {app.dataClassification}
                </p>
              </div>
            </div>

            {/* Capabilities & Projects */}
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="glass-card-interactive p-4">
                <p className="text-xs font-bold uppercase text-surface-400 mb-3 tracking-wider">
                  Linked Capabilities
                </p>
                <div className="flex flex-wrap gap-2">
                  {app.linkedCapabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400"
                    >
                      {cap}
                    </span>
                  ))}
                  {app.linkedCapabilities.length === 0 && <span className="text-sm text-surface-500 italic">None</span>}
                </div>
              </div>
              <div className="glass-card-interactive p-4">
                <p className="text-xs font-bold uppercase text-surface-400 mb-3 tracking-wider">
                  Linked Projects
                </p>
                <div className="flex flex-wrap gap-2">
                  {app.linkedProjects.map((proj) => (
                    <span
                      key={proj}
                      className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400"
                    >
                      {proj}
                    </span>
                  ))}
                  {app.linkedProjects.length === 0 && <span className="text-sm text-surface-500 italic">None</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Data Lineage */}
          {lineage ? (
            <div className="rounded-xl border border-surface-700/50 bg-surface-800/40 p-6 glass-card relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-50" />
              <DataLineageFlow
                appName={app.name}
                lineage={lineage}
              />
            </div>
          ) : (
             <div className="rounded-xl border border-surface-700/50 bg-surface-800/40 p-10 text-center glass-card">
                <p className="text-surface-400">No lineage data available for this application.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
