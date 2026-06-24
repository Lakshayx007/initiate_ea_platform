'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LayoutDashboard,
  AppWindow,
  BarChart3,
  Activity,
  User,
  Menu,
  X,
  Layers,
  Target,
  ShieldAlert,
  Sun,
  Moon
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Applications', href: '/dashboard/applications', icon: AppWindow },
  { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Maturity', href: '/dashboard/maturity', icon: Activity },
  { label: 'Architecture', href: '/dashboard/architecture', icon: Layers },
  { label: 'Data Quality', href: '/dashboard/quality', icon: ShieldAlert },
  { label: 'ROI & Value', href: '/dashboard/roi', icon: Target },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

/** Check whether `pathname` matches the nav item's route. */
function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === '/dashboard';
  return pathname.startsWith(href);
}

// ── Component ──────────────────────────────────────────────────────────────────

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  // Initialize theme state from DOM (set by the script in layout)
  useEffect(() => {
    // Check local storage or default to dark
    const storedTheme = localStorage.getItem('theme');
    setTimeout(() => {
      if (storedTheme === 'light') {
        setIsLight(true);
        document.documentElement.classList.replace('dark', 'light');
      } else {
        document.documentElement.classList.replace('light', 'dark');
      }
    }, 0);
  }, []);

  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  
  const toggleTheme = useCallback(() => {
    const nextIsLight = !document.documentElement.classList.contains('light');
    
    if (nextIsLight) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    
    setIsLight(nextIsLight);
    try {
      localStorage.setItem('theme', nextIsLight ? 'light' : 'dark');
    } catch (e) {}
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-16"
      role="banner"
    >
      {/* ── Backdrop ─────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-surface-950/80 backdrop-blur-xl"
        aria-hidden="true"
      />

      {/* ── Bottom border gradient ───────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-700/60 to-transparent"
        aria-hidden="true"
      />

      {/* ── Animated glow line ───────────────────────────────────────────── */}
      <div
        className="glow-line absolute bottom-0 left-0 right-0"
        aria-hidden="true"
      />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ─────────────────────────────────────────────────────── */}
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0"
          aria-label="EA Intelligence home"
          onClick={closeMobile}
        >
          {/* Icon mark */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-light/20 to-secondary/20 ring-1 ring-primary-light/30 transition-shadow duration-300 group-hover:ring-primary-light/60 group-hover:shadow-[0_0_14px_rgba(59,130,246,0.25)]">
            <Activity size={18} className="text-primary-light" />
          </div>

          <div className="flex flex-col leading-none">
            <span className="gradient-text text-base font-bold tracking-tight">
              EA Intelligence
            </span>
            <span className="text-[0.625rem] font-medium uppercase tracking-widest text-surface-500">
              DATA PRODUCT PLATFORM
            </span>
          </div>
        </Link>

        {/* ── Desktop Navigation ───────────────────────────────────────── */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                className={clsx('nav-link', active && 'active')}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right section ────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Live indicator removed */}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="relative flex h-8 w-8 items-center justify-center rounded-full border border-surface-700 bg-surface-800/50 text-surface-400 hover:text-surface-50 hover:bg-surface-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isLight ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Avatar removed */}

          {/* ── Mobile hamburger ─────────────────────────────────────── */}
          <button
            type="button"
            className="relative flex md:hidden h-9 w-9 items-center justify-center rounded-lg text-surface-400 transition-colors duration-200 hover:bg-surface-800 hover:text-surface-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Navigation Panel ──────────────────────────────────── */}
      <div
        id="mobile-nav"
        className={clsx(
          'md:hidden absolute left-0 right-0 top-16 overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
        )}
      >
        <nav
          className="relative border-b border-surface-800/60 bg-surface-950/95 backdrop-blur-xl px-4 py-3 space-y-1"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                onClick={closeMobile}
                className={clsx('nav-link w-full', active && 'active')}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}

          {/* Live indicator removed */}
          <div className="flex sm:hidden items-center justify-between gap-2 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2 text-surface-400">
            </div>
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 text-surface-400 hover:text-surface-50"
            >
              {isLight ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
