'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  AppWindow,
  BarChart3,
  Activity,
  Layers,
  Menu,
  X,
  Target,
  ChevronDown,
  PieChart,
  Network,
  Briefcase,
  Ticket
} from 'lucide-react';

const EXEC_NAV_ITEMS = [
  { label: 'CIO View', href: '/dashboard/cio', icon: Target },
  { label: 'CFO View', href: '/dashboard/cfo', icon: PieChart },
  { label: 'CTO View', href: '/dashboard/cto', icon: Network },
  { label: 'PM View', href: '/dashboard/pm', icon: Briefcase },
];

const OPS_NAV_ITEMS = [
  { label: 'Integration Architecture', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Application Portfolio', href: '/dashboard/applications', icon: AppWindow },
  { label: 'Data Quality', href: '/dashboard/quality', icon: Activity },
  { label: 'Cost Intelligence', href: '/dashboard/roi', icon: BarChart3 },
  { label: 'Architecture Board', href: '/dashboard/architecture', icon: Layers },
  { label: 'Remediation Tickets', href: '/dashboard/tickets', icon: Ticket },
];

const isActive = (pathname: string, href: string) => {
  if (href === '/dashboard') {
    return pathname === href;
  }
  return pathname.startsWith(href);
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16 bg-surface-950/70 backdrop-blur-2xl border-b border-surface-800 shadow-sm"
      role="banner"
    >
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0"
          aria-label="EA Intelligence home"
          onClick={closeMobile}
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-surface-800 border border-surface-700 text-primary transition-all duration-300 group-hover:bg-surface-700 group-hover:shadow-[0_0_15px_rgba(0,112,243,0.3)]">
            <Activity size={18} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-surface-50">
              EA Intelligence
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-surface-500 mt-1">
              Data Product Platform
            </span>
          </div>
        </Link>

        {/* ── Desktop Navigation ───────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-2" aria-label="Main navigation">
          
          {/* Executive Views */}
          <div className="flex items-center gap-1 bg-surface-900 border border-surface-800 rounded-full p-1 shadow-inner">
            {EXEC_NAV_ITEMS.map(({ label, href, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
                  aria-current={active ? 'page' : undefined}
                >
                  {active && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-surface-800 border border-surface-700 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={clsx("relative z-10 flex items-center gap-1.5", active ? "text-primary-light" : "text-surface-400 hover:text-surface-50")}>
                    <Icon size={14} />
                    {label.split(' ')[0]}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* EA Operations Dropdown */}
          <div className="relative ml-2" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={clsx(
                "flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-full border transition-all",
                dropdownOpen ? "bg-surface-800 border-surface-700 text-surface-50 shadow-[0_0_15px_rgba(255,255,255,0.05)]" : "bg-transparent border-transparent text-surface-400 hover:bg-surface-900 hover:border-surface-800 hover:text-surface-50"
              )}
            >
              Operations
              <ChevronDown size={14} className={clsx("transition-transform duration-300", dropdownOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute right-0 mt-3 w-64 bg-surface-950/95 backdrop-blur-xl border border-surface-800 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] py-2 z-50 overflow-hidden"
                >
                  <div className="px-4 pb-2 mb-2 border-b border-surface-800/50">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-surface-500">
                      Engineering & Architecture
                    </span>
                  </div>
                  {OPS_NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const active = isActive(pathname, href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setDropdownOpen(false)}
                        className={clsx(
                          'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                          active ? 'bg-surface-900 text-primary-light font-medium border-l-2 border-primary-light' : 'text-surface-400 hover:bg-surface-800 hover:text-surface-50 border-l-2 border-transparent'
                        )}
                      >
                        <Icon size={16} className={active ? 'text-primary-light' : 'text-surface-500'} />
                        {label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* ── Mobile hamburger ─────────────────────────────────────── */}
        <div className="flex lg:hidden items-center gap-4 shrink-0">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-surface-400 hover:bg-surface-800 transition-colors border border-surface-800"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation Panel ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute left-0 right-0 top-16 overflow-hidden bg-surface-950/95 backdrop-blur-2xl border-b border-surface-800 shadow-2xl"
          >
            <nav className="px-4 py-6 space-y-8 max-h-[85vh] overflow-y-auto">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-surface-500 mb-4 px-2">Executive Views</div>
                <div className="space-y-1">
                  {EXEC_NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const active = isActive(pathname, href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={closeMobile}
                        className={clsx(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors',
                          active ? 'bg-surface-800 text-primary-light font-medium' : 'text-surface-400 hover:bg-surface-800'
                        )}
                      >
                        <Icon size={18} />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-surface-500 mb-4 px-2 pt-6 border-t border-surface-800/50">Operations & Engineering</div>
                <div className="space-y-1">
                  {OPS_NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                    const active = isActive(pathname, href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={closeMobile}
                        className={clsx(
                          'flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors',
                          active ? 'bg-surface-800 text-primary-light font-medium' : 'text-surface-400 hover:bg-surface-800'
                        )}
                      >
                        <Icon size={18} />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
