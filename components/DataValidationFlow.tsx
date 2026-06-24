'use client';

import { motion } from 'framer-motion';
import { Database, FileJson, ShieldAlert, CheckCircle, ArrowRight, Settings } from 'lucide-react';

export default function DataValidationFlow() {
  return (
    <div className="glass-card p-6 mt-6 rounded-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-purple-500/5 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[var(--color-primary)]/20 rounded-lg">
            <Settings className="w-5 h-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <h4 className="font-bold text-surface-100">OpenEvolve Methodology</h4>
            <p className="text-xs text-surface-400">Automated TOGAF Data Governance Flow</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Step 1: Raw Data */}
          <div className="flex-1 w-full bg-surface-900/50 p-4 rounded-xl border border-surface-800 text-center relative group">
            <Database className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-surface-200">Raw Sources</div>
            <div className="text-xs text-surface-500 mt-1">CMDB, PPM, Signavio</div>
          </div>

          <ArrowRight className="w-5 h-5 text-surface-600 hidden md:block shrink-0" />

          {/* Step 2: OpenEvolve Engine */}
          <div className="flex-[1.5] w-full bg-[var(--color-primary)]/10 p-4 rounded-xl border border-[var(--color-primary)]/30 text-center relative overflow-hidden">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-20 h-20 bg-[var(--color-primary)]/20 blur-xl rounded-full"
            />
            <FileJson className="w-6 h-6 text-[var(--color-primary)] mx-auto mb-2 relative z-10" />
            <div className="text-sm font-bold text-surface-50 relative z-10">OpenEvolve Engine</div>
            <div className="text-xs text-[var(--color-primary)]/80 mt-1 relative z-10">Validates TOGAF/DORA Rules</div>
            
            {/* Tooltip on hover */}
            <div className="absolute inset-0 bg-surface-900/95 backdrop-blur-sm p-3 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-center items-center rounded-xl z-20 border border-[var(--color-primary)]/50 text-left">
              <ul className="text-[10px] text-surface-300 space-y-1 w-full px-2">
                <li className="flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-red-400"/> Checks Lineage Gaps</li>
                <li className="flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-red-400"/> Flags Missing Owners</li>
                <li className="flex items-center gap-1"><ShieldAlert className="w-3 h-3 text-amber-400"/> Tech Debt Analysis</li>
              </ul>
            </div>
          </div>

          <ArrowRight className="w-5 h-5 text-surface-600 hidden md:block shrink-0" />

          {/* Step 3: Clean EA Data */}
          <div className="flex-1 w-full bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/30 text-center relative">
            <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-surface-200">Trusted EA Repo</div>
            <div className="text-xs text-emerald-400/80 mt-1">Level 4 Governed Data</div>
          </div>
        </div>
        
        <p className="text-xs text-surface-500 mt-6 text-center">
          Hover over the OpenEvolve Engine to see exactly which rules are executed.
        </p>
      </div>
    </div>
  );
}
