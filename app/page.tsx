'use client';

import Link from 'next/link';
import { ArrowRight, Database, Network, Shield, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-hidden">
      
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 pointer-events-none mesh-gradient-bg opacity-40" />
      
      {/* Floating Particles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />

      {/* Navigation */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 lg:px-12 mt-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-surface-800 border border-surface-700 flex items-center justify-center text-primary-light">
            <Database size={16} />
          </div>
          <span className="text-xl font-bold tracking-tight text-surface-50">
            Enterprise<span className="text-surface-500">Intelligence</span>
          </span>
        </div>
        <Link 
          href="/dashboard"
          className="glow-button text-sm py-2 px-6 flex items-center gap-2 group"
        >
          Enter Dashboard <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-4 text-center pb-20 pt-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-900 border border-surface-800 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          TOGAF 10 & ArchiMate 3.2 Compliant
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter text-surface-50 max-w-4xl leading-[1.1] mb-6"
        >
          Enterprise Architecture as a <span className="gradient-text-accent block mt-2">Data Product</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-surface-400 max-w-2xl mb-10 leading-relaxed"
        >
          Stop relying on static diagrams. Transform your enterprise architecture into an interactive, real-time intelligence platform that drives C-Suite decision making.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-light transition-colors flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,112,243,0.3)]">
            Launch Platform <ChevronRight size={18} />
          </Link>
          <Link href="/dashboard/roi" className="px-8 py-4 rounded-xl bg-surface-900 border border-surface-800 text-surface-50 font-bold hover:bg-surface-800 transition-colors flex items-center justify-center gap-2">
            View Case Study
          </Link>
        </motion.div>

        {/* Value Proposition Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-24 text-left"
        >
          
          <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-xl font-bold text-surface-50 mb-3">Rationalization Engine</h3>
            <p className="text-surface-400 text-sm leading-relaxed mb-4">
              Simulate application decommissioning in real-time. Instantly calculate projected ROI, migration costs, and budget waterfalls before executing.
            </p>
            <ul className="space-y-2 text-xs text-surface-500 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success" /> $360K Annual Savings Detected</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success" /> 186% Projected ROI</li>
            </ul>
          </div>

          <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
              <Network size={24} />
            </div>
            <h3 className="text-xl font-bold text-surface-50 mb-3">Blast Radius Simulation</h3>
            <p className="text-surface-400 text-sm leading-relaxed mb-4">
              Interactive force-directed graph to visualize tech debt. Click any end-of-life node to instantly see the cascading downstream failure impact.
            </p>
            <ul className="space-y-2 text-xs text-surface-500 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success" /> Real-time Dependency Mapping</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success" /> Service-Now Integration</li>
            </ul>
          </div>

          <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="w-12 h-12 rounded-xl bg-success/10 border border-success/20 flex items-center justify-center text-success mb-6 group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold text-surface-50 mb-3">Data Quality Assurance</h3>
            <p className="text-surface-400 text-sm leading-relaxed mb-4">
              Automated compliance engine utilizing 6 specific TOGAF data quality rules. Detect anomalies and orphaned applications instantly.
            </p>
            <ul className="space-y-2 text-xs text-surface-500 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success" /> DORA Compliance Checks</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-success" /> Automated Steward Alerts</li>
            </ul>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
