'use client';

import Link from "next/link";
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Clock, 
  Activity,
  Layers,
  ChevronDown,
  LineChart,
  Network
} from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-surface-200 relative selection:bg-white/20 font-sans mesh-gradient-bg">
      <ParticleBackground />

      {/* 1. The Hook (Hero) */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] px-4 pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_50%)] pointer-events-none" />
        
        <div className="text-center max-w-6xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-800/50 border border-surface-800 text-surface-300 text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Accenture INITIATE 2026
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9]"
          >
            EA is no longer <br />
            <span className="text-surface-600">a diagram.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-3xl text-surface-400 mb-12 max-w-3xl mx-auto leading-tight font-medium tracking-tight"
          >
            It is a living <span className="text-surface-50">Data Product</span>. We replaced 4-week manual survey cycles with real-time, automated intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/dashboard"
              className="glow-button inline-flex items-center gap-2 group"
            >
              Enter Dashboard
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-surface-500"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold">Discover the architecture</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* 2. The Problem vs Solution (Bento Box) */}
      <section className="relative z-10 py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center">
              From manual overhead <br className="hidden md:block"/>
              <span className="text-surface-500">to automated precision.</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Data Freshness */}
            <ScrollReveal delay={0.1} className="md:col-span-2">
              <div className="bento-card h-full flex flex-col justify-between group">
                <div>
                  <Clock className="w-8 h-8 text-blue-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Real-Time Freshness</h3>
                  <p className="text-surface-400 max-w-md">Legacy cycles took 4-8 weeks to aggregate Excel sheets. Our webhook integrations now provide an exact state of the enterprise in under 4 hours.</p>
                </div>
                <div className="mt-12 flex items-end justify-between border-t border-surface-800 pt-6">
                  <div>
                    <div className="text-sm text-surface-500 mb-1">Legacy</div>
                    <div className="text-xl text-surface-400 line-through">4-8 Weeks</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-blue-400 mb-1">Target Achieved</div>
                    <div className="text-5xl font-bold text-surface-50 tracking-tighter">&lt;4 hrs</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Card 2: Coverage */}
            <ScrollReveal delay={0.2}>
              <div className="bento-card h-full flex flex-col justify-between group">
                <div>
                  <Network className="w-8 h-8 text-emerald-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Global Coverage</h3>
                  <p className="text-surface-400">Automated mapping of systems. Critical for TOGAF Phase B/C impact analysis and avoiding redundant application investments.</p>
                </div>
                <div className="mt-12">
                  <div className="flex items-end justify-between mb-2">
                    <span className="text-5xl font-bold tracking-tighter"><AnimatedCounter to={95}/>%</span>
                  </div>
                  <div className="w-full bg-surface-700 rounded-full h-1">
                    <div className="bg-emerald-400 h-full rounded-full w-[95%]" />
                  </div>
                  <div className="text-xs text-surface-500 mt-2 text-right">Up from 40%</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Card 3: Quality */}
            <ScrollReveal delay={0.3}>
              <div className="bento-card h-full flex flex-col justify-between group">
                <div>
                  <Shield className="w-8 h-8 text-purple-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">Data Quality</h3>
                  <p className="text-surface-400">Strict governance SLA. Ensures ADM iterations are built on a trusted, canonical Single Source of Truth.</p>
                </div>
                <div className="mt-12">
                  <div className="text-5xl font-bold tracking-tighter text-surface-50">2% <span className="text-xl text-surface-500 font-normal">Error Rate</span></div>
                  <div className="text-sm text-purple-400 mt-2">Down from 18%</div>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Card 4: Maturity */}
            <ScrollReveal delay={0.4} className="md:col-span-2">
              <div className="bento-card h-full flex flex-col justify-between group">
                <div>
                  <Activity className="w-8 h-8 text-amber-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-2">EA Integration Maturity Model (EAIMM)</h3>
                  <p className="text-surface-400 max-w-lg">We transformed the enterprise from an ad-hoc, siloed architecture (Level 1) into a fully governed, SLA-bound data product (Level 4).</p>
                </div>
                <div className="mt-12 flex items-center justify-between border-t border-surface-800 pt-6">
                  <div className="text-center">
                    <div className="text-sm text-surface-500 mb-1">Baseline</div>
                    <div className="text-3xl font-bold text-surface-400">9<span className="text-lg">/25</span></div>
                    <div className="text-xs text-red-400 mt-1">Level 1: Initial</div>
                  </div>
                  <div className="flex-1 px-8">
                    <div className="h-px bg-gradient-to-r from-surface-700 via-amber-500/50 to-surface-700 relative">
                       <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-amber-400 mb-1">Current Target</div>
                    <div className="text-4xl font-bold text-surface-50">22<span className="text-xl">/25</span></div>
                    <div className="text-xs text-amber-400 mt-1">Level 4: Governed</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Methodology & Evolution */}
      {/* Moved to Analytics Dashboard */}

      {/* 4. The Value (ROI) */}
      <section className="relative z-10 py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-16 text-center">Massive Return on Investment.</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <div className="bento-card text-center">
                <div className="text-sm text-surface-500 uppercase tracking-widest font-semibold mb-4">Investment</div>
                <div className="text-6xl font-bold tracking-tighter mb-2 text-surface-50">$<AnimatedCounter to={480} />K</div>
                <div className="text-surface-400">One-time capital expenditure</div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="bento-card text-center border-emerald-500/30">
                <div className="text-sm text-emerald-500 uppercase tracking-widest font-semibold mb-4">3-Year ROI</div>
                <div className="text-7xl font-black tracking-tighter mb-2 text-surface-50"><AnimatedCounter to={186} />%</div>
                <div className="text-surface-400">Payback in 24 months</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="bento-card text-center">
                <div className="text-sm text-surface-500 uppercase tracking-widest font-semibold mb-4">Annual Benefit</div>
                <div className="text-6xl font-bold tracking-tighter mb-2 text-surface-50">$<AnimatedCounter to={267} />K</div>
                <div className="text-surface-400">Via 60% FTE labor reduction</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <section className="relative z-10 py-16 px-4 text-center">
        <ScrollReveal>
          <div className="pt-8 border-t border-surface-800 text-surface-600 text-sm flex justify-center gap-6">
            <span>TOGAF 10 Methodology</span>
            <span>ArchiMate 3.2</span>
            <span>Accenture INITIATE 2026</span>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
