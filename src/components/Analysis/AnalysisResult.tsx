import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Check, X } from 'lucide-react';
import { DetectionResult } from '../../types';

interface AnalysisResultProps {
  result: DetectionResult;
  onNewAnalysis: () => void;
  onChangeModality: () => void;
  onFeedback: (rating: number, isCorrect: boolean) => void;
  feedbackSubmitted: boolean;
}

export function AnalysisResult({ 
  result, 
  onNewAnalysis, 
  onChangeModality,
  onFeedback,
  feedbackSubmitted
}: AnalysisResultProps) {
  const [rating, setRating] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="cloud-tile !p-8 md:!p-12 no-anim-cloud space-y-8"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/10"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * result.score) / 100}
              className={`${result.score > 50 ? 'text-emerald-500' : 'text-red-500'} transition-all duration-1000`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{result.score}</span>
            <span className="text-[10px] uppercase tracking-widest opacity-50">Genuine Score</span>
          </div>
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-center md:justify-start">
            <span className={`px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase ${result.generation_source === 'HUMAN' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
              {result.generation_source} Generated
            </span>
            <span className="text-sm text-cloud/40">Confidence: {(result.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.5)]" 
            />
            <span className="text-[10px] uppercase tracking-[0.2em] text-violet-400/60 font-bold">Neural Learning Active</span>
          </div>
          <p className="text-cloud/80 leading-relaxed italic">
            "{result.justification}"
          </p>
        </div>
      </div>

      {/* Analysis Breakdown */}
      {result.breakdown && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          {result.breakdown.map((item, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-wider text-cloud/60">{item.label}</span>
                <span className="text-xs font-mono font-bold text-violet-400">{Math.round(item.value)}%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className="h-full bg-violet-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feedback Section */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        {!feedbackSubmitted ? (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold uppercase tracking-wider">Help Forensica Learn</h4>
                <p className="text-xs text-cloud/40">Was this analysis accurate?</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
                    <button 
                      onClick={() => setIsCorrect(true)}
                      className={`p-2 rounded-md transition-all ${isCorrect === true ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]' : 'hover:bg-white/5 text-cloud/40'}`}
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setIsCorrect(false)}
                      className={`p-2 rounded-md transition-all ${isCorrect === false ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'hover:bg-white/5 text-cloud/40'}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star 
                          className={`w-5 h-5 ${star <= rating ? 'fill-violet-400 text-violet-400' : 'text-cloud/20'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={rating === 0 || isCorrect === null}
                  onClick={() => onFeedback(rating, isCorrect!)}
                  className="w-full sm:w-auto px-8 py-3 sm:py-2 bg-violet-500 rounded-xl sm:rounded-lg text-xs font-bold uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"
          >
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Intelligence Updated • Feedback Received</span>
          </motion.div>
        )}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row gap-4">
        <button 
          onClick={onNewAnalysis}
          className="flex-1 py-4 sm:py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium text-sm sm:text-base"
        >
          New Analysis
        </button>
        <button 
          onClick={onChangeModality}
          className="flex-1 py-4 sm:py-3 rounded-xl bg-cloud text-charcoal font-bold hover:bg-white transition-colors text-sm sm:text-base"
        >
          Change Modality
        </button>
      </div>
    </motion.div>
  );
}
