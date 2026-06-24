'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Server, Cloud, Package, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { applications, type Application } from '@/data/mockApplications';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from './ui/Tooltip';

type SortField = 'name' | 'owner' | 'status' | 'hosting';
type SortOrder = 'asc' | 'desc';

interface FilterOptions {
  status: string;
  hosting: string;
  search: string;
}

const ITEMS_PER_PAGE = 10;

const statusOptions = ['All', 'Active', 'Retiring', 'Retired'];
const hostingOptions = ['All', 'SaaS', 'Cloud', 'On-premise'];

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Retiring: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Retired: 'bg-surface-500/10 text-surface-400 border-surface-500/20',
};

const freshnessColors: Record<string, string> = {
  fresh: 'text-emerald-400',
  moderate: 'text-amber-400',
  stale: 'text-red-400',
};

function getTimeAgoCategory(timeStr: string): string {
  if (timeStr.includes('1h') || timeStr.includes('2h')) return 'fresh';
  if (timeStr.includes('4h') || timeStr.includes('8h')) return 'moderate';
  return 'stale';
}

function getHostingIcon(model: string) {
  switch(model.toLowerCase()) {
    case 'saas': return <Cloud className="w-4 h-4 text-blue-400" />;
    case 'cloud': return <Server className="w-4 h-4 text-purple-400" />;
    case 'on-premise': return <Package className="w-4 h-4 text-amber-400" />;
    default: return null;
  }
}

export default function ApplicationTable() {
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'All',
    hosting: 'All',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = app.name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
        app.businessOwner.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus =
        filters.status === 'All' || app.lifecycleStatus === filters.status;

      const matchesHosting =
        filters.hosting === 'All' || app.hostingModel === filters.hosting;

      return matchesSearch && matchesStatus && matchesHosting;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal: string | number = '';
      let bVal: string | number = '';

      if (sortField === 'name') {
        aVal = a.name;
        bVal = b.name;
      } else if (sortField === 'owner') {
        aVal = a.businessOwner;
        bVal = b.businessOwner;
      } else if (sortField === 'status') {
        aVal = a.lifecycleStatus;
        bVal = b.lifecycleStatus;
      } else if (sortField === 'hosting') {
        aVal = a.hostingModel;
        bVal = b.hostingModel;
      }

      const comparison =
        typeof aVal === 'string'
          ? aVal.localeCompare(bVal as string)
          : Number(aVal) - Number(bVal);

      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [filtered, sortField, sortOrder]);

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginatedData = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
    setCurrentPage(1);
  }, []);

  const handleFilterChange = useCallback(
    (field: keyof FilterOptions, value: string) => {
      setFilters((prev) => ({ ...prev, [field]: value }));
      setCurrentPage(1);
    },
    [],
  );

  const handleSort = useCallback((field: SortField) => {
    setSortField(field);
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-surface-100">Application Inventory</h2>
          <p className="text-sm text-surface-400">
            {sorted.length} of {applications.length} applications match filters
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-card p-4 space-y-4">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-3 h-5 w-5 text-surface-500 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            placeholder="Search by app name or owner..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full rounded-xl border border-surface-700 bg-surface-800/50 py-2.5 pl-11 pr-4 text-sm text-surface-100 placeholder-surface-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>Status: {opt}</option>
            ))}
          </select>

          <select
            value={filters.hosting}
            onChange={(e) => handleFilterChange('hosting', e.target.value)}
            className="rounded-lg border border-surface-700 bg-surface-800/50 px-3 py-2 text-sm text-surface-100 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
          >
            {hostingOptions.map((opt) => (
              <option key={opt} value={opt}>Hosting: {opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-surface-700/50 bg-surface-800/20 backdrop-blur-sm shadow-xl">
        <table className="w-full text-sm text-left">
          <thead className="border-b border-surface-700/50 bg-surface-800/50 text-xs uppercase text-surface-400 font-semibold tracking-wider">
            <tr>
              <th
                className="px-6 py-4 cursor-pointer hover:text-surface-50 transition-colors group"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Application Name
                  {sortField === 'name' && (
                    <span className="text-blue-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:text-surface-50 transition-colors group"
                onClick={() => handleSort('owner')}
              >
                <div className="flex items-center gap-1">
                  Owner
                  {sortField === 'owner' && (
                    <span className="text-blue-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:text-surface-50 transition-colors group"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-1">
                  Status
                  {sortField === 'status' && (
                    <span className="text-blue-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-4 cursor-pointer hover:text-surface-50 transition-colors group"
                onClick={() => handleSort('hosting')}
              >
                <div className="flex items-center gap-1">
                  Hosted
                  {sortField === 'hosting' && (
                    <span className="text-blue-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-4">
                Freshness
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1">
                  DQ Score
                  <Tooltip content="TOGAF Data Quality Rule Adherence (0-100%). Sourced from OpenEvolve engine." />
                </div>
              </th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1">
                  DORA
                  <Tooltip content="Digital Operational Resilience Act compliance status." />
                </div>
              </th>
              <th className="px-6 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700/50">
            <AnimatePresence>
              {paginatedData.map((app, idx) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                  key={app.id}
                  className="transition-colors hover:bg-surface-800/40 group"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className="font-semibold text-surface-200 group-hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      {app.name}
                    </Link>
                    <div className="text-xs text-surface-500 mt-1 truncate max-w-[200px]">{app.description}</div>
                  </td>
                  <td className="px-6 py-4 text-surface-400">
                    <div className="font-medium text-surface-300">{app.businessOwner}</div>
                    <div className="text-xs text-surface-500">{app.technicalOwner}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium border ${statusColors[app.lifecycleStatus]}`}
                    >
                      {app.lifecycleStatus === 'Active' && <CheckCircle2 className="w-3 h-3" />}
                      {app.lifecycleStatus === 'Retiring' && <AlertTriangle className="w-3 h-3" />}
                      {app.lifecycleStatus === 'Retired' && <XCircle className="w-3 h-3" />}
                      {app.lifecycleStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-surface-300">
                      {getHostingIcon(app.hostingModel)}
                      {app.hostingModel}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1.5 font-medium ${freshnessColors[getTimeAgoCategory(app.sourceUpdatedAt)]}`}>
                      <div className={`w-2 h-2 rounded-full animate-pulse bg-current`} />
                      Recent
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-surface-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${app.dqScore >= 90 ? 'bg-emerald-500' : app.dqScore >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${app.dqScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-surface-300">{app.dqScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                      app.doraCompliance === 'Compliant' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      app.doraCompliance === 'Warning' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {app.doraCompliance}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/dashboard/applications/${app.id}`}
                      className="inline-flex items-center justify-center p-2 rounded-lg text-surface-400 hover:text-blue-400 hover:bg-blue-400/10 transition-colors"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        
        {paginatedData.length === 0 && (
          <div className="p-8 text-center text-surface-500">
            No applications found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between glass-card p-4">
          <p className="text-sm text-surface-400">
            Showing <span className="font-medium text-surface-200">{((currentPage - 1) * ITEMS_PER_PAGE) + 1}</span> to <span className="font-medium text-surface-200">{Math.min(currentPage * ITEMS_PER_PAGE, sorted.length)}</span> of <span className="font-medium text-surface-200">{sorted.length}</span> results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-surface-700 bg-surface-800/50 p-2 text-surface-300 transition-all enabled:hover:bg-surface-700 enabled:hover:text-surface-50 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${
                    currentPage === page 
                      ? 'bg-blue-600 text-surface-50 shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                      : 'text-surface-400 hover:bg-surface-800 hover:text-surface-50 border border-transparent'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-surface-700 bg-surface-800/50 p-2 text-surface-300 transition-all enabled:hover:bg-surface-700 enabled:hover:text-surface-50 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
