import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';

export function LaunchAnimation({ onComplete }: { onComplete: () => void, key?: string }) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const duration = 3000; // 3 seconds for loading
    const interval = 30;
    const increment = 100 / (duration / interval);
    
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return Math.min(100, prev + increment);
      });
    }, interval);

    const timers = [
      setTimeout(() => setPhase(1), 500),   // Loading Start
      setTimeout(() => setPhase(2), 3500),  // Logo Reveal (after loading)
      setTimeout(() => setPhase(3), 5500),  // Final Transition
      setTimeout(() => onComplete(), 7000), // Finish
    ];

    return () => {
      clearInterval(progressTimer);
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden font-oxanium"
    >
      {/* Background Data Streams */}
      <AnimatePresence>
        {phase >= 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 grid grid-cols-6 gap-4 p-8 opacity-20">
              {[...Array(24)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[8px] font-mono text-violet-400 break-all leading-tight"
                >
                  {Math.random().toString(2).substring(2, 100)}
                  {Math.random().toString(16).substring(2, 50)}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Central Composition */}
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* Phase 1: Loading Bar */}
        <AnimatePresence>
          {phase === 1 && progress < 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center gap-6 w-full max-w-xl px-10"
            >
              <div className="w-full space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[10px] md:text-xs text-violet-400/60 uppercase tracking-[0.3em]">System Initialization</p>
                    <h2 className="text-xl md:text-3xl font-bold text-white tracking-widest">LOADING_FORENSICA_AI</h2>
                  </div>
                  <span className="text-2xl md:text-4xl font-bold text-violet-400 font-mono">{Math.round(progress)}%</span>
                </div>
                
                <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-violet-600 to-violet-400 rounded-full shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                  />
                </div>

                <div className="flex justify-between text-[10px] text-violet-400/40 font-mono uppercase tracking-widest">
                  <span>Protocol_V4.2.0</span>
                  <span>Neural_Link_Active</span>
                </div>
              </div>

              {/* Decorative HUD Elements */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-violet-500/5 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-violet-400/10 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2: Forensica AI Reveal (Zoom Out Transition) */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1],
                scale: { type: "spring", damping: 15 }
              }}
              className="text-center space-y-8"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 12 }}
                className="flex justify-center mb-4"
              >
                <Logo className="w-24 h-24 md:w-32 md:h-32" />
              </motion.div>

              <div className="flex justify-center overflow-hidden">
                {"FORENSICA AI".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.3 + (0.1 * i),
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="text-5xl md:text-8xl font-bold text-white font-oxanium uppercase tracking-widest inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 1, letterSpacing: "0.6em" }}
                transition={{ delay: 1.8, duration: 1 }}
                className="text-violet-400/80 text-lg md:text-2xl uppercase font-oxanium"
              >
                Unmask the Unreal
              </motion.div>

              {phase >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 flex items-center justify-center gap-2 text-[10px] text-emerald-400 tracking-[0.4em] uppercase"
                >
                  <motion.div 
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-emerald-500"
                  />
                  System_Verified_Ready
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0 
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-violet-400 rounded-full blur-[1px]"
          />
        ))}
      </div>
    </motion.div>
  );
}
