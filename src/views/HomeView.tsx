import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, History, Calendar, Clock, ShieldCheck, ShieldAlert, Trash2 } from 'lucide-react';
import { Page, SystemStats, HistoryItem } from '../types';

interface HomeViewProps {
  onNavigate: (page: Page) => void;
  stats: SystemStats | null;
  history: HistoryItem[];
  onClearHistory: () => void;
}

export function HomeView({ onNavigate, stats, history, onClearHistory }: HomeViewProps) {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <motion.div 
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex-1 flex flex-col justify-between w-full h-full"
    >
      {/* Top Row: Welcome & System Status */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="space-y-2 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-roboto">
            Hi, Welcome to <span className="text-cloud/90">Forensica AI</span>
          </h1>
          <p className="text-xl sm:text-2xl text-cloud/60 font-medium font-oxanium">Unmask the Unreal.</p>
        </div>

        <div className="p-4 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-xl space-y-1 w-full lg:w-auto min-w-[240px]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <p className="text-[10px] font-sans text-cloud/60 uppercase tracking-wider">System Status: <span className="text-emerald-400">Active</span></p>
          </div>
          <p className="text-[10px] font-sans text-cloud/60 uppercase tracking-wider pl-3.5">Models: {stats?.neuralVersion || 'V4.2.0'}-Stable</p>
        </div>
      </div>
      
      {/* Bottom Row: Get Started & Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-12 pt-12">
        <div className="flex flex-col items-start gap-6 w-full lg:w-auto">
          <button 
            onClick={() => onNavigate('selection')}
            className="btn-cloud w-full sm:w-fit text-lg font-oxanium py-4 sm:py-3"
          >
            Get Started
          </button>
          
          <div className="pt-2">
            <button 
              onClick={() => onNavigate('specs')}
              className="group flex flex-col items-start gap-1 text-cloud/40 hover:text-cloud active:text-violet-400 active:scale-95 transition-all duration-200"
            >
              <span className="text-xs sm:text-sm uppercase tracking-widest font-semibold font-oxanium">SEE WHAT FORENSICA AI CAN DO?</span>
              <div className="h-px w-0 group-hover:w-full bg-cloud group-active:bg-violet-400 transition-all duration-300" />
            </button>
          </div>
        </div>

        {stats && (
          <div className="space-y-6 w-full lg:w-auto max-w-xl">
            {/* Intelligence Level Tile */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="violet-tile no-anim-violet space-y-4 !p-6"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <h3 className="text-xs font-display uppercase tracking-[0.2em] text-violet-400/80">Intelligence Level</h3>
                    <button 
                      onClick={() => onNavigate('evolution')}
                      className="text-[10px] font-display text-cloud/40 uppercase tracking-widest hover:text-violet-300 transition-colors flex items-center gap-1 group/status"
                    >
                      Status: <span className="text-violet-300 group-hover:underline">{stats.intelligenceStatus}</span>
                      <motion.span 
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-[8px] opacity-0 group-hover:opacity-100"
                      >
                        →
                      </motion.span>
                    </button>
                  </div>
                  <span className="text-4xl font-bold text-violet-400 font-display leading-none">{stats.learningProgress}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.learningProgress}%` }}
                    className="h-full bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-display text-cloud/30 uppercase tracking-widest">System Accuracy</p>
                  <p className="text-2xl font-display text-cloud/90 font-bold">{stats.averageAccuracy}%</p>
                </div>
              </div>
            </motion.div>

            {/* Historical Data Tile */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setShowHistory(true)}
              whileHover={{ 
                backgroundColor: "rgb(255, 255, 255)",
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)",
                borderColor: "rgba(255, 255, 255, 1)"
              }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl !p-6 flex items-center justify-between group cursor-pointer transition-all duration-300 active:bg-violet-500 active:text-charcoal"
            >
              <div className="space-y-1">
                <p className="text-[10px] font-display text-cloud/40 group-hover:text-charcoal/60 group-active:text-charcoal/60 uppercase tracking-widest transition-colors">Historical Data</p>
                <p className="text-4xl font-display text-cloud group-hover:text-charcoal group-active:text-charcoal font-bold transition-colors">{stats.totalAttempts.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-charcoal/5 group-active:bg-charcoal/10 transition-colors">
                <History className="w-6 h-6 text-cloud/40 group-hover:text-charcoal group-active:text-charcoal transition-colors group-hover:scale-110" />
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* History Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHistory(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl h-[90vh] sm:h-auto sm:max-h-[80vh] bg-charcoal border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-500/20">
                    <History className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-display font-bold text-cloud">Analysis History</h2>
                    <p className="text-[9px] sm:text-[10px] text-cloud/40 uppercase tracking-widest">Archive of verified content</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowHistory(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-cloud/60 hover:text-cloud"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
                {history.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-cloud/20 space-y-4">
                    <History className="w-12 h-12 opacity-20" />
                    <p className="font-display uppercase tracking-widest text-xs">No historical data found</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div 
                      key={item.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-xl shrink-0 ${item.source === 'AI' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                            {item.source === 'AI' ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] font-display uppercase tracking-widest text-cloud/40">{item.modality}</span>
                              <span className="w-1 h-1 rounded-full bg-white/10 hidden sm:inline" />
                              <span className={`text-[10px] font-bold uppercase tracking-wider ${item.source === 'AI' ? 'text-red-400' : 'text-emerald-400'}`}>
                                {item.source} DETECTED
                              </span>
                            </div>
                            <p className="text-sm text-cloud/80 mt-1 line-clamp-2 font-sans leading-relaxed">{item.justification}</p>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5 shrink-0">
                          <div className="flex items-center gap-1.5 text-[10px] text-cloud/40 uppercase tracking-wider">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.timestamp).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] text-cloud/40 uppercase tracking-wider">
                            <Clock className="w-3 h-3" />
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-4 sm:p-6 bg-white/5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[9px] text-cloud/20 uppercase tracking-[0.3em] order-2 sm:order-1">Forensica Archive Protocol V4.2.0</p>
                {history.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all history?')) {
                        onClearHistory();
                      }
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[10px] font-bold uppercase tracking-widest order-1 sm:order-2 w-full sm:w-auto justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear History
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
