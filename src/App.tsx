import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Undo2 } from 'lucide-react';
import { Logo } from './components/Logo';
import { LaunchAnimation } from './components/LaunchAnimation';
import { useForensica } from './hooks/useForensica';
import { HomeView } from './views/HomeView';
import { SpecsView } from './views/SpecsView';
import { SelectionView } from './views/SelectionView';
import { DetectView } from './views/DetectView';
import { EvolutionView } from './views/EvolutionView';

export default function App() {
  const {
    currentPage,
    selectedModality,
    result,
    isAnalyzing,
    file,
    previewUrl,
    textInput,
    stats,
    history,
    feedbackSubmitted,
    analysisError,
    navigate,
    handleFileChange,
    handleAnalyze,
    handleFeedback,
    handleClearHistory,
    resetAnalysis,
    setFile,
    setPreviewUrl,
    setTextInput,
  } = useForensica();

  const [showLaunch, setShowLaunch] = React.useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {showLaunch ? (
          <LaunchAnimation key="launch" onComplete={() => setShowLaunch(false)} />
        ) : (
          <motion.div 
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            {/* Top Title Bar */}
            <div className="h-12 border-b border-white/5 bg-black/40 flex items-center justify-between px-6 text-[10px] font-display uppercase tracking-[0.2em] text-cloud/30">
              <div className="flex items-center gap-4">
                <motion.div 
                  className="flex items-center gap-3 cursor-pointer group relative px-3 py-1 rounded-lg transition-colors hover:bg-white/5" 
                  onClick={() => navigate('home')}
                  whileHover="hover"
                  initial="initial"
                >
                  {/* Pulsing Background Glow */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, scale: 0.8 },
                      hover: { 
                        opacity: [0.1, 0.2, 0.1],
                        scale: [0.9, 1.1, 0.9],
                        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }
                    }}
                    className="absolute inset-0 bg-violet-500 rounded-lg blur-xl"
                  />

                  <Logo className="w-6 h-6 transition-transform group-hover:scale-110 relative z-10" />
                  
                  <div className="flex items-center overflow-hidden whitespace-nowrap relative z-10">
                    <span className="text-sm font-bold tracking-tight text-cloud normal-case font-display hidden sm:inline">
                      Forensica AI
                    </span>
                    {currentPage === 'home' && (
                      <motion.span 
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 0.4, x: 0 }}
                        className="text-[9px] font-display tracking-widest uppercase hidden sm:inline-block ml-3"
                      >
                        • Verified Truth
                      </motion.span>
                    )}
                  </div>
                </motion.div>

                {currentPage !== 'home' && (
                  <motion.button
                    initial={{ opacity: 0, x: -60, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    onClick={() => navigate('home')}
                    className="p-2 glass-card bg-white/10 border-white/20 text-cloud hover:bg-white/20 active:bg-violet-600 active:border-violet-400 transition-all relative group"
                    title="Back to Home"
                  >
                    <div className="absolute inset-0 bg-violet-500/30 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Undo2 className="w-4 h-4 relative z-10" />
                  </motion.button>
                )}
              </div>
              <div className="flex items-center gap-6 font-display">
                <span className="hidden sm:inline">Core: V4.2.0</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Header */}
            <header className="p-6 flex justify-end items-center h-20" />

            <main className={`flex-1 flex flex-col w-full ${currentPage === 'home' ? 'p-6 sm:p-12' : 'items-center justify-center px-6 max-w-6xl mx-auto'}`}>
              <AnimatePresence mode="wait">
                {currentPage === 'home' && (
                  <HomeView 
                    onNavigate={navigate} 
                    stats={stats} 
                    history={history} 
                    onClearHistory={handleClearHistory}
                  />
                )}

                {currentPage === 'specs' && (
                  <SpecsView onNavigate={navigate} />
                )}

                {currentPage === 'selection' && (
                  <SelectionView onNavigate={navigate} />
                )}

                {currentPage === 'evolution' && (
                  <EvolutionView onNavigate={navigate} stats={stats} />
                )}

                {currentPage === 'detect' && selectedModality && (
                  <DetectView 
                    selectedModality={selectedModality}
                    onNavigate={navigate}
                    isAnalyzing={isAnalyzing}
                    result={result}
                    textInput={textInput}
                    setTextInput={setTextInput}
                    file={file}
                    setFile={setFile}
                    previewUrl={previewUrl}
                    setPreviewUrl={setPreviewUrl}
                    handleFileChange={handleFileChange}
                    handleAnalyze={handleAnalyze}
                    handleFeedback={handleFeedback}
                    feedbackSubmitted={feedbackSubmitted}
                    resetAnalysis={resetAnalysis}
                    analysisError={analysisError}
                  />
                )}
              </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="p-8 text-center text-cloud/20 text-xs font-display tracking-widest uppercase">
              © 2026 Forensica AI • Advanced Content Verification
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
