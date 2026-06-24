'use client';

import { motion } from 'framer-motion';
import { Database, ShieldCheck, Zap, CheckCircle, Server, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  { id: 'source', label: 'ServiceNow CMDB', icon: Database, delay: 0 },
  { id: 'apim', label: 'Azure APIM Gateway', icon: ShieldCheck, delay: 1 },
  { id: 'eventhub', label: 'Azure Event Hub', icon: Zap, delay: 2 },
  { id: 'validation', label: 'Quality Validation Engine', icon: CheckCircle, delay: 3 },
  { id: 'destination', label: 'Governed EA Repository', icon: Server, delay: 4 },
];

export default function IntegrationFlow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (steps.length + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Event-Driven Integration Flow</h3>
        <p className="text-surface-400 mt-2">Data ingestion to EA Repository in under 4 hours.</p>
      </div>
      
      <div className="relative flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto px-4 gap-4 md:gap-0">
        {/* Connecting Lines for Desktop */}
        <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-surface-800 -z-10 -translate-y-1/2">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 transition-all duration-1000 ease-in-out"
            style={{ width: `${Math.min(100, (activeStep / (steps.length - 1)) * 100)}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const isPassed = activeStep > index;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex flex-col items-center group w-40">
              <motion.div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
                  isActive ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.4)]' : 
                  isPassed ? 'bg-surface-800 border-surface-600 text-surface-300' : 'bg-surface-900 border-surface-800 text-surface-600'
                }`}
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
              >
                <Icon className={`w-8 h-8 ${isActive ? 'text-purple-400' : isPassed ? 'text-surface-300' : 'text-surface-600'}`} />
              </motion.div>
              
              <div className="mt-4 text-center">
                <div className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-purple-300' : isPassed ? 'text-surface-200' : 'text-surface-500'}`}>
                  {step.label}
                </div>
              </div>

              {/* Mobile connecting arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden my-4 text-surface-700">
                  <ArrowRight className="w-6 h-6 rotate-90" />
                </div>
              )}

              {/* Data Packet Particle */}
              {isActive && index < steps.length - 1 && (
                <motion.div 
                  className="hidden md:block absolute top-1/2 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] -translate-y-1/2 z-10"
                  initial={{ x: 0, opacity: 1 }}
                  animate={{ x: 120, opacity: [1, 1, 0] }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  style={{ left: '50%' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
