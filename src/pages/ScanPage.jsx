import React from 'react'
import { DropZone } from '../components/DropZone'
import { ScannerOverlay } from '../components/ScannerOverlay'
import { ResultCard } from '../components/ResultCard'
import { usePredict } from '../hooks/usePredict'

export const ScanPage = () => {
  const {
    file,
    preview,
    result,
    loading,
    error,
    handleFile,
    handlePredict,
    reset,
  } = usePredict()

  return (
    <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
      {/* Hero text */}
      <div className="animate-fade-up" style={{ animationDelay: '0.1s', animationFillMode: 'both', opacity: 0 }}>
        <h1 className="font-display text-4xl font-bold text-white leading-tight">
          Skin Condition{' '}
          <span className="italic text-skin-400">Analysis</span>
        </h1>
        <p className="mt-2 text-sm font-body text-white/40 leading-relaxed">
          Upload a clear photo of the affected skin area for AI-powered preliminary analysis.
        </p>
      </div>

      {/* Upload / Preview / Loading */}
      <div className="animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both', opacity: 0 }}>
        {loading ? (
          <ScannerOverlay />
        ) : result ? (
          <ResultCard result={result} onReset={reset} />
        ) : (
          <>
            <DropZone onFile={handleFile} preview={preview} onReset={reset} />

            {/* Error */}
            {error && (
              <div className="mt-3 flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-fade-in">
                <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p className="text-xs text-red-400 font-mono">{error}</p>
              </div>
            )}

            {/* Analyze button */}
            {file && !loading && (
              <button
                onClick={handlePredict}
                className="mt-4 w-full py-3.5 rounded-xl bg-skin-500 hover:bg-skin-600 active:scale-[0.98] text-white font-body font-semibold text-sm transition-all duration-200 shadow-lg shadow-skin-500/25 flex items-center justify-center gap-2 animate-fade-in"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Analyze with AI
              </button>
            )}
          </>
        )}
      </div>

      {/* Step guide */}
      {!file && !loading && !result && (
        <div className="animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'both', opacity: 0 }}>
          <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-3">How it works</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { step: '01', label: 'Upload image', icon: '📸' },
              { step: '02', label: 'AI analyzes', icon: '🧠' },
              { step: '03', label: 'Get results', icon: '📋' },
            ].map(({ step, label, icon }) => (
              <div
                key={step}
                className="p-3 rounded-xl border border-white/5 bg-white/[0.02] text-center"
              >
                <div className="text-xl mb-1.5">{icon}</div>
                <p className="font-mono text-[9px] text-skin-500 tracking-widest mb-0.5">{step}</p>
                <p className="text-[11px] text-white/40 font-body">{label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
