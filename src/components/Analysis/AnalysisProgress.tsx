import React from 'react';
import { motion } from 'motion/react';
import { Logo } from '../Logo';
import { StatusLog } from '../StatusLog';

export function AnalysisProgress() {
  return (
    <div className="cloud-tile !py-12 no-anim-cloud flex flex-col items-center justify-center gap-10 relative overflow-hidden min-h-[400px]">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Scanning Line */}
      <motion.div 
        initial={{ top: '0%' }}
        animate={{ top: '100%' }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cloud/50 to-transparent z-10 shadow-[0_0_15px_rgba(245,245,247,0.5)]"
      />

      {/* Multi-layered Loader */}
      <div className="relative w-32 h-32">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-2 border-t-cloud border-r-transparent border-b-transparent border-l-transparent rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 border border-cloud/20 border-b-cloud/60 border-t-transparent rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-8 bg-cloud/10 rounded-full flex items-center justify-center"
        >
          <Logo className="w-8 h-8" />
        </motion.div>
      </div>

      <div className="text-center space-y-6 z-10">
        <div className="space-y-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold tracking-tight"
          >
            Forensic Analysis in Progress
          </motion.p>
          <p className="text-cloud/40 text-sm font-sans uppercase tracking-widest">AI Core V4.2 Active</p>
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-violet-400 font-bold">Neural Evolution in Progress</span>
          </div>
        </div>

        {/* Status Logs */}
        <div className="glass-card bg-black/40 p-4 w-72 mx-auto text-left font-sans text-[10px] space-y-1 overflow-hidden h-28">
          <StatusLog delay={0} text="> INITIALIZING NEURAL ENGINE V4.2..." />
          <StatusLog delay={500} text="> DECONSTRUCTING SIGNAL FREQUENCIES..." />
          <StatusLog delay={1200} text="> MAPPING SYNTHETIC ARTIFACTS..." />
          <StatusLog delay={1800} text="> CROSS-REFERENCING HISTORICAL DATASETS..." />
          <StatusLog delay={2500} text="> ANALYZING STYLOMETRIC VARIANCE..." />
          <StatusLog delay={3200} text="> CALCULATING PROBABILISTIC MODELS..." />
          <StatusLog delay={3800} text="> VERIFYING BIOMETRIC COHERENCE..." />
          <StatusLog delay={4500} text="> COMPILING FINAL FORENSIC REPORT..." />
        </div>
      </div>
    </div>
  );
}
