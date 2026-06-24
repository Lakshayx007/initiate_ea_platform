'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Database, Lock, Zap, BrainCircuit, CheckCircle2, ArrowRight } from 'lucide-react';

const maturityLevels = [
  {
    level: 1,
    title: 'Initial / Siloed',
    icon: Database,
    color: 'text-surface-500',
    bg: 'bg-surface-500/10',
    border: 'border-surface-500/20',
    description: 'Manual survey-based data collection. Disconnected platforms.',
    details: [
      'Data freshness: 4-8 weeks lag',
      'Coverage: ~40% of enterprise applications',
      'Integration: Zero automated links',
      'Cost: 2,400+ FTE hours per year wasted'
    ]
  },
  {
    level: 2,
    title: 'Developing',
    icon: Network,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    description: 'Point-to-point connections begin. API gateways established.',
    details: [
      'Basic canonical schema introduced',
      'ServiceNow CMDB partial integration',
      'Coverage: 60-70%',
      'Manual reconciliation still required'
    ]
  },
  {
    level: 3,
    title: 'Defined',
    icon: Lock,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    description: 'Governed data pipelines. Stewardship framework active.',
    details: [
      'Data stewards accountable for domains',
      'Event-driven webhooks implemented',
      'Data freshness: < 24 hours',
      'Error rate drops below 10%'
    ]
  },
  {
    level: 4,
    title: 'Governed',
    icon: Zap,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    description: 'EA as a Data Product. Real-time insights and traceability.',
    details: [
      'Data freshness: < 4 hours',
      'Coverage: 95%+ of enterprise portfolio',
      'Error rate: < 2% via OpenEvolve rules',
      'Automated DORA compliance tracking'
    ]
  },
  {
    level: 5,
    title: 'Optimised (AI-Driven)',
    icon: BrainCircuit,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    description: 'Autonomous architecture discovery. Gen-AI augmentation.',
    details: [
      'Continuous code-to-cloud mapping',
      'Natural language querying of EA data',
      'AI-powered impact analysis',
      'Automated redundancy elimination'
    ]
  }
];

export default function EAIMMMaturityEvolution() {
  const [activeLevel, setActiveLevel] = useState(0);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-bold tracking-widest uppercase text-[var(--color-primary)] mb-4">
            Methodology
          </h2>
          <h3 className="text-3xl md:text-5xl font-black text-surface-50 tracking-tight mb-6 leading-tight">
            The EA Integration <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-purple-400">
              Maturity Model
            </span>
          </h3>
          <p className="text-surface-400 text-lg leading-relaxed">
            How the EA Data Product transforms enterprise architecture from a static, siloed documentation exercise into a real-time, automated intelligence hub.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-stretch">
          
          {/* Left: Stepper Navigation */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {maturityLevels.map((lvl, idx) => {
              const isActive = activeLevel === idx;
              const Icon = lvl.icon;
              return (
                <button
                  key={lvl.level}
                  onClick={() => setActiveLevel(idx)}
                  className={`relative p-5 rounded-2xl text-left transition-all duration-300 border backdrop-blur-sm group overflow-hidden ${
                    isActive 
                      ? `bg-surface-800/80 ${lvl.border} shadow-lg shadow-black/50` 
                      : 'bg-surface-900/50 border-surface-800 hover:bg-surface-800 hover:border-surface-700'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-indicator"
                      className={`absolute left-0 top-0 bottom-0 w-1 ${lvl.bg.replace('/10', '')} shadow-[0_0_10px_currentColor] ${lvl.color}`}
                    />
                  )}
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl transition-colors ${isActive ? `${lvl.bg} ${lvl.color}` : 'bg-surface-800 text-surface-400 group-hover:text-surface-300'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-surface-500 mb-1">
                        Level {lvl.level}
                      </div>
                      <div className={`font-bold transition-colors ${isActive ? 'text-surface-50' : 'text-surface-300 group-hover:text-surface-100'}`}>
                        {lvl.title}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Content Area */}
          <div className="w-full lg:w-2/3 glass-card rounded-3xl p-8 lg:p-12 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLevel}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full flex flex-col justify-center"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-2xl ${maturityLevels[activeLevel].bg} ${maturityLevels[activeLevel].color}`}>
                    {(() => {
                      const ActiveIcon = maturityLevels[activeLevel].icon;
                      return <ActiveIcon className="w-8 h-8" />;
                    })()}
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-black text-surface-50 tracking-tight">
                      {maturityLevels[activeLevel].title}
                    </h4>
                    <p className={`text-sm font-medium ${maturityLevels[activeLevel].color}`}>
                      EAIMM Target Level {maturityLevels[activeLevel].level}
                    </p>
                  </div>
                </div>

                <p className="text-lg text-surface-300 leading-relaxed mb-8 border-l-2 border-surface-700 pl-4 py-1">
                  {maturityLevels[activeLevel].description}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  {maturityLevels[activeLevel].details.map((detail, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (idx * 0.05) }}
                      className="flex items-start gap-3 bg-surface-900/50 p-4 rounded-xl border border-surface-800"
                    >
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${maturityLevels[activeLevel].color}`} />
                      <span className="text-sm font-medium text-surface-200 leading-snug">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {activeLevel < maturityLevels.length - 1 && (
                  <div className="mt-10 pt-6 border-t border-surface-800 flex items-center justify-between">
                    <span className="text-sm text-surface-400">Next Stage</span>
                    <button 
                      onClick={() => setActiveLevel(activeLevel + 1)}
                      className="flex items-center gap-2 text-sm font-bold text-surface-200 hover:text-white transition-colors"
                    >
                      {maturityLevels[activeLevel + 1].title}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
