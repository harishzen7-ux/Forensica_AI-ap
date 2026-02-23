import React from 'react';
import { motion } from 'motion/react';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      {/* Retinal/Digital Iris Background */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 text-violet-500/20">
        <motion.circle 
          cx="50" cy="50" r="45" 
          fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle 
          cx="50" cy="50" r="38" 
          fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-30" />
      </svg>
      
      {/* Stylized F with geometric patterns */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(167,139,250,0.6)]">
          <g className="text-violet-400">
            {/* Dot/Shape grid for F */}
            {Array.from({ length: 10 }).map((_, i) => 
              Array.from({ length: 14 }).map((_, j) => {
                // Heuristic to draw an 'F' shape
                const isVertical = i >= 2 && i <= 4 && j >= 2 && j <= 12;
                const isTopBar = i >= 5 && i <= 9 && j >= 2 && j <= 3;
                const isMidBar = i >= 5 && i <= 8 && j >= 7 && j <= 8;
                
                if (isVertical || isTopBar || isMidBar) {
                  const x = 20 + i * 4;
                  const y = 15 + j * 4;
                  const type = (i * j) % 4;
                  
                  // Top right block
                  if (i >= 7 && i <= 9 && j >= 2 && j <= 4) {
                    return <rect key={`f-${i}-${j}`} x={x-1.5} y={y-1.5} width="3" height="3" fill="white" className="opacity-90" />;
                  }

                  if (type === 0) return <circle key={`f-${i}-${j}`} cx={x} cy={y} r="1.2" fill="currentColor" />;
                  if (type === 1) return <rect key={`f-${i}-${j}`} x={x-1} y={y-1} width="2" height="2" fill="currentColor" />;
                  if (type === 2) return <path key={`f-${i}-${j}`} d={`M${x},${y-1.2} L${x+1.2},${y+1.2} L${x-1.2},${y+1.2} Z`} fill="currentColor" />;
                  return <rect key={`f-${i}-${j}`} x={x-1} y={y-1} width="2" height="2" fill="currentColor" transform={`rotate(45 ${x} ${y})`} />;
                }
                return null;
              })
            )}
          </g>
        </svg>
      </div>
    </div>
  );
}
