'use client';

import { motion } from 'framer-motion';
import { Database, ArrowRight, ArrowDown, Activity, Box, Filter, Cloud, Layers, ShieldCheck, Zap } from 'lucide-react';

export default function ArchitectureDiagram() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const lineVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: { scaleX: 1, opacity: 1, transition: { duration: 0.8 } }
  };

  const verticalLineVariants = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: { scaleY: 1, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="w-full py-8">
      <motion.div 
        className="max-w-5xl mx-auto flex flex-col relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Layer 1: Source Systems */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-surface-500 mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-surface-600"></span>
            Layer 1: Source Systems
            <span className="flex-1 h-px bg-surface-800"></span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['SAP PPM', 'ServiceNow CMDB', 'Signavio BPM', 'Apptio ITFM'].map((sys, idx) => (
              <div key={idx} className="glass-card-interactive p-4 flex flex-col items-center justify-center text-center group border-blue-500/20">
                <Database className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-surface-200">{sys}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Down Arrows */}
        <motion.div variants={verticalLineVariants} className="absolute left-[12.5%] top-[120px] w-[75%] h-8 hidden md:flex justify-between origin-top z-0">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500/50 to-purple-500/50"></div>
              <ArrowDown className="w-3 h-3 text-purple-500/50 -mt-1" />
            </div>
          ))}
        </motion.div>

        {/* Layer 2: Integration Platform */}
        <motion.div variants={itemVariants} className="mb-12 relative z-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-surface-500 mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-surface-600"></span>
            Layer 2: Integration Platform
            <span className="flex-1 h-px bg-surface-800"></span>
          </h3>
          <div className="rounded-xl border border-purple-500/30 bg-purple-900/10 p-6 flex flex-col md:flex-row items-center justify-around gap-6 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-fuchsia-500/5 to-purple-500/5 animate-[gradient-shift_10s_linear_infinite]" />
            <div className="flex flex-col items-center text-center z-10">
              <Activity className="w-10 h-10 text-purple-400 mb-2" />
              <span className="font-semibold text-surface-200">Azure APIM</span>
              <span className="text-[10px] text-surface-400 mt-1 bg-surface-900/50 px-2 py-0.5 rounded border border-surface-700/50">API Gateway</span>
            </div>
            <motion.div variants={lineVariants} className="hidden md:block w-16 h-0.5 bg-purple-500/30 origin-left" />
            <div className="flex flex-col items-center text-center z-10">
              <Zap className="w-10 h-10 text-purple-400 mb-2" />
              <span className="font-semibold text-surface-200">Event Hub</span>
              <span className="text-[10px] text-surface-400 mt-1 bg-surface-900/50 px-2 py-0.5 rounded border border-surface-700/50">Message Broker</span>
            </div>
            <motion.div variants={lineVariants} className="hidden md:block w-16 h-0.5 bg-purple-500/30 origin-left" />
            <div className="flex flex-col items-center text-center z-10">
              <Layers className="w-10 h-10 text-purple-400 mb-2" />
              <span className="font-semibold text-surface-200">Data Factory</span>
              <span className="text-[10px] text-surface-400 mt-1 bg-surface-900/50 px-2 py-0.5 rounded border border-surface-700/50">Batch ETL</span>
            </div>
          </div>
        </motion.div>

        {/* Down Arrow */}
        <motion.div variants={verticalLineVariants} className="flex justify-center -mt-8 mb-4 origin-top">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500/50 to-emerald-500/50"></div>
            <ArrowDown className="w-4 h-4 text-emerald-500/50 -mt-1" />
          </div>
        </motion.div>

        {/* Layer 3: Canonical Model & Quality */}
        <motion.div variants={itemVariants} className="mb-12 relative z-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-surface-500 mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-surface-600"></span>
            Layer 3: Canonical Model & Quality Gate
            <span className="flex-1 h-px bg-surface-800"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-900/10 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <Box className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-surface-200">JSON Schema Registry</h4>
                <p className="text-xs text-surface-400 mt-1">Standardized TOGAF/ArchiMate canonical data structures</p>
              </div>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-900/10 p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-surface-200">Great Expectations</h4>
                <p className="text-xs text-surface-400 mt-1">Automated data quality assertions and SLA validation</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Down Arrow */}
        <motion.div variants={verticalLineVariants} className="flex justify-center -mt-8 mb-4 origin-top">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500/50 to-amber-500/50"></div>
            <ArrowDown className="w-4 h-4 text-amber-500/50 -mt-1" />
          </div>
        </motion.div>

        {/* Layer 4: EA Data Product */}
        <motion.div variants={itemVariants} className="mb-12 relative z-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-surface-500 mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-surface-600"></span>
            Layer 4: EA Repository
            <span className="flex-1 h-px bg-surface-800"></span>
          </h3>
          <div className="rounded-xl border border-amber-500/40 bg-amber-900/20 p-8 text-center relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.1)]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <Cloud className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 mb-2">LeanIX Enterprise Workspace</h4>
            <p className="text-surface-300 max-w-2xl mx-auto text-sm">
              The governed, SLA-bound central source of truth for the Enterprise Architecture Data Product, exposing GraphQL and REST APIs to downstream consumers.
            </p>
          </div>
        </motion.div>

        {/* Down Arrow */}
        <motion.div variants={verticalLineVariants} className="flex justify-center -mt-8 mb-4 origin-top">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-gradient-to-b from-amber-500/50 to-cyan-500/50"></div>
            <ArrowDown className="w-4 h-4 text-cyan-500/50 -mt-1" />
          </div>
        </motion.div>

        {/* Layer 5: Consumer Applications */}
        <motion.div variants={itemVariants} className="relative z-10">
          <h3 className="text-sm font-bold uppercase tracking-widest text-surface-500 mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-surface-600"></span>
            Layer 5: Consumer Applications
            <span className="flex-1 h-px bg-surface-800"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'CIO Dashboard', desc: 'Executive visibility into portfolio health and TCO' },
              { title: 'Solution Design Portal', desc: 'Self-service architecture patterns and catalog for developers' },
              { title: 'Strategic Planning Tool', desc: 'Scenario modeling and roadmap generation for transformation programs' }
            ].map((app, idx) => (
              <div key={idx} className="glass-card-interactive p-5 border-cyan-500/20 group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/40 transition-colors">
                    <Filter className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="font-bold text-surface-200">{app.title}</h4>
                </div>
                <p className="text-sm text-surface-400">{app.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
