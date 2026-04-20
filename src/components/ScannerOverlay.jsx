import React from 'react'

export const ScannerOverlay = () => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-skin-500/30 h-72 bg-slate-950/80 flex flex-col items-center justify-center gap-4 animate-fade-in">
      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-skin-400 to-transparent opacity-80"
        style={{
          animation: 'scanLine 2s ease-in-out infinite',
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-skin-500" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-skin-500" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-skin-500" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-skin-500" />

      {/* Center pulse */}
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-skin-500/30 animate-ping absolute inset-0" />
        <div className="w-16 h-16 rounded-full border border-skin-500/50 flex items-center justify-center relative">
          <svg className="w-7 h-7 text-skin-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <div className="text-center">
        <p className="font-display text-white/80 font-semibold">Analyzing...</p>
        <p className="text-xs font-mono text-skin-400/70 mt-1 animate-pulse">
          AI model processing image
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-skin-500"
            style={{ animation: `pulse 1.2s ease-in-out ${i * 0.3}s infinite` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes scanLine {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}</style>
    </div>
  )
}
