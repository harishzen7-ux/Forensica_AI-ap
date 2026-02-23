import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { SpecItem } from '../components/SpecItem';
import { Page } from '../types';

interface SpecsViewProps {
  onNavigate: (page: Page) => void;
}

export function SpecsView({ onNavigate }: SpecsViewProps) {
  return (
    <motion.div 
      key="specs"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ type: "spring", damping: 20, stiffness: 100 }}
      className="w-full max-w-4xl py-12"
    >
      <button 
        onClick={() => onNavigate('home')}
        className="flex items-center gap-2 text-cloud/60 hover:text-cloud active:text-violet-400 active:scale-95 mb-12 transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to Home
      </button>

      <h2 className="text-5xl font-bold mb-8 font-oxanium">Specifications</h2>
      
      <div className="space-y-12">
        <section className="space-y-4">
          <h3 className="text-2xl font-bold font-oxanium">Forensica AI</h3>
          <p className="text-cloud/70 leading-relaxed text-lg">
            Forensica AI detects AI-generated and manipulated photos, videos, text, and audio in seconds. 
            Whether it’s a deepfake video, synthetic voice, altered image, or AI-written content, we expose what’s real and what’s not.
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <SpecItem 
            title="Deepfake Detection" 
            desc="Identify AI-generated faces, voice clones, and manipulated videos with high precision." 
          />
          <SpecItem 
            title="Image Authenticity Analysis" 
            desc="Detect edited, altered, or AI-created images using advanced forensic modeling." 
          />
          <SpecItem 
            title="Video Verification" 
            desc="Frame-by-frame analysis to uncover tampering, synthetic media, and inconsistencies." 
          />
          <SpecItem 
            title="AI Text Detection" 
            desc="Spot machine-generated writing and content manipulation across documents and posts." 
          />
          <SpecItem 
            title="Audio Forensics" 
            desc="Detect cloned voices, synthetic speech, and audio tampering." 
          />
        </div>

        <section className="space-y-6 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold font-oxanium">How It Works</h3>
          <ol className="space-y-4">
            <li className="flex gap-4 items-start">
              <span className="bg-cloud text-charcoal w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">1</span>
              <p className="text-cloud/70">Upload your file or paste your text content.</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="bg-cloud text-charcoal w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">2</span>
              <p className="text-cloud/70">Our AI scans for manipulation patterns, synthetic artifacts, and anomalies.</p>
            </li>
            <li className="flex gap-4 items-start">
              <span className="bg-cloud text-charcoal w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-1">3</span>
              <p className="text-cloud/70">Receive a clear authenticity score with detailed AI forensic analysis.</p>
            </li>
          </ol>
        </section>

        <section className="space-y-6 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold font-oxanium">Why Forensica AI</h3>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-center gap-3 text-cloud/70">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Multi-format detection
            </li>
            <li className="flex items-center gap-3 text-cloud/70">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Real-time processing
            </li>
            <li className="flex items-center gap-3 text-cloud/70">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Clear confidence scoring
            </li>
            <li className="flex items-center gap-3 text-cloud/70">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              Secure & privacy-focused
            </li>
          </ul>
        </section>

        <div className="pt-12 text-center">
          <p className="text-3xl font-bold italic opacity-50 mb-8 font-oxanium">Truth, Verified.</p>
          <button onClick={() => onNavigate('selection')} className="btn-cloud font-oxanium">Get Started Now</button>
        </div>
      </div>
    </motion.div>
  );
}
