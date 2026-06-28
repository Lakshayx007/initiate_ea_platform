'use client';

import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Clock, Target, PiggyBank, Briefcase } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function ROIPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#030712]">
      <Header />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Case Study Header & Narrative */}
          <div className="mb-10 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-900 border border-surface-800 text-xs font-semibold text-primary mb-4">
              <Briefcase size={14} /> Case Study
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight gradient-text mb-4">
              The EA Data Product Transformation
            </h1>
            
            <div className="glass-card p-6 border-primary/20 bg-primary/5 mt-8 mb-4">
              <h3 className="text-lg font-bold text-surface-50 mb-2">Architecture Vision Statement</h3>
              <p className="text-surface-300 italic border-l-2 border-primary pl-4 py-1 mb-6">
                "Accenture's Enterprise Architecture platform will be transformed from a manually maintained documentation repository into a dynamic, trusted intelligence hub - continuously synchronised with authoritative source systems through governed APIs and event-driven integration."
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-danger mb-2 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-danger" /> As-Is Pain
                  </h4>
                  <p className="text-sm text-surface-400">
                    EA data was 4–8 weeks stale with an 18% error rate. EA teams spent 60% of their time manually chasing data via surveys. Portfolio managers made multi-million dollar decisions on data they could not trust.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-success mb-2 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-success" /> To-Be Benefit
                  </h4>
                  <p className="text-sm text-surface-400">
                    The EA repository is now a governed Data Product with 95% coverage and 4-hour freshness. Data arrives automatically from ServiceNow, SAP, Signavio, and Apptio, driving real-time intelligence engines for the C-Suite.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10"
          >
            <motion.div variants={itemVariants} className="glass-card-interactive p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <TrendingUp className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-surface-500 mb-1">3-Year ROI</p>
                <div className="text-3xl font-bold text-surface-100 flex items-baseline gap-1">
                  <AnimatedCounter from={0} to={186} />%
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card-interactive p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Briefcase className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-surface-500 mb-1">Total Investment</p>
                <div className="text-3xl font-bold text-surface-100 flex items-baseline gap-1">
                  $<AnimatedCounter from={0} to={480} />K
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card-interactive p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <PiggyBank className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-surface-500 mb-1">Annual Savings</p>
                <div className="text-3xl font-bold text-surface-100 flex items-baseline gap-1">
                  $<AnimatedCounter from={0} to={267} />K
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card-interactive p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-7 h-7 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-surface-500 mb-1">Payback Period</p>
                <div className="text-3xl font-bold text-surface-100 flex items-baseline gap-1">
                  <AnimatedCounter from={0} to={24} /> <span className="text-xl">mo</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="glass-card-interactive p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                <Target className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-surface-500 mb-1">FTE Efficiency</p>
                <div className="text-3xl font-bold text-surface-100 flex items-baseline gap-1">
                  <AnimatedCounter from={0} to={60} />% <span className="text-xl">reduction</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass-card p-8"
            >
              <h2 className="text-xl font-bold text-surface-100 mb-6 flex items-center gap-2">
                <DollarSign className="text-emerald-400" />
                Value Realization Breakdown
              </h2>
              <ul className="space-y-6">
                <li>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-semibold text-surface-300">Automated Metadata Sync</span>
                    <span className="text-emerald-400 font-mono">$120K / yr</span>
                  </div>
                  <p className="text-sm text-surface-500">Eliminated manual data collection surveys across 150+ application owners.</p>
                </li>
                <li>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-semibold text-surface-300">Application Rationalization</span>
                    <span className="text-emerald-400 font-mono">$85K / yr</span>
                  </div>
                  <p className="text-sm text-surface-500">Identified 12 redundant systems through complete CMDB and Apptio integration.</p>
                </li>
                <li>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-semibold text-surface-300">Data Governance Automation</span>
                    <span className="text-emerald-400 font-mono">$62K / yr</span>
                  </div>
                  <p className="text-sm text-surface-500">Reduced data steward SLA tracking effort from 10 days/month to zero via Great Expectations.</p>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass-card p-8 bg-gradient-to-b from-surface-800/40 to-blue-900/10 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-surface-100 mb-6">Cumulative Cash Flow</h2>
                
                <div className="relative pt-6 pb-2">
                  {/* Y Axis line */}
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-surface-700"></div>
                  {/* X Axis line (Zero line) */}
                  <div className="absolute left-8 right-0 bottom-16 h-px bg-surface-500 border-dashed border-b border-surface-500"></div>
                  
                  {/* Year 0 */}
                  <div className="relative h-12 mb-4 flex items-center group">
                    <div className="w-8 text-xs text-surface-400 text-right pr-2">Y0</div>
                    <div className="h-6 bg-red-500/20 border border-red-500/50 rounded-r transition-all group-hover:bg-red-500/30" style={{ width: '60%' }}></div>
                    <span className="ml-2 text-xs text-red-400 font-mono">-$480K</span>
                  </div>
                  
                  {/* Year 1 */}
                  <div className="relative h-12 mb-4 flex items-center group">
                    <div className="w-8 text-xs text-surface-400 text-right pr-2">Y1</div>
                    <div className="h-6 bg-red-500/20 border border-red-500/50 rounded-r transition-all group-hover:bg-red-500/30" style={{ width: '40%' }}></div>
                    <span className="ml-2 text-xs text-red-400 font-mono">-$213K</span>
                  </div>
                  
                  {/* Year 2 */}
                  <div className="relative h-12 mb-4 flex items-center group">
                    <div className="w-8 text-xs text-surface-400 text-right pr-2">Y2</div>
                    <div className="h-6 bg-emerald-500/20 border border-emerald-500/50 rounded-r transition-all group-hover:bg-emerald-500/30" style={{ width: '15%' }}></div>
                    <span className="ml-2 text-xs text-emerald-400 font-mono">+$54K</span>
                  </div>
                  
                  {/* Year 3 */}
                  <div className="relative h-12 flex items-center group">
                    <div className="w-8 text-xs text-surface-400 text-right pr-2">Y3</div>
                    <div className="h-6 bg-emerald-500/20 border border-emerald-500/50 rounded-r transition-all group-hover:bg-emerald-500/30" style={{ width: '80%' }}></div>
                    <span className="ml-2 text-xs text-emerald-400 font-mono">+$414K</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-surface-900 border border-surface-800 rounded-lg">
                <p className="text-sm text-surface-400">
                  <strong className="text-surface-100">Conclusion:</strong> By treating EA as a product with explicit SLAs rather than a manual documentation exercise, the platform rapidly transitions from a cost center to a profit multiplier.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
