import React, { useEffect, useState } from 'react'
import { getConfidenceLevel } from '../utils/storage'

export const ResultCard = ({ result, onReset }) => {
  const [barWidth, setBarWidth] = useState(0)
  const confidence = result.confidenceScore
  const pct = Math.round(confidence * 100)
  const level = getConfidenceLevel(confidence)

  useEffect(() => {
    const t = setTimeout(() => setBarWidth(pct), 100)
    return () => clearTimeout(t)
  }, [pct])

  return (
    <div className="rounded-2xl border border-white/10 overflow-hidden animate-fade-up">
      {/* Image strip */}
      {result.imagePreview && (
        <div className="relative h-40">
          <img src={result.imagePreview} alt="Analyzed" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-slate-950/10" />
          <div className="absolute inset-0 flex items-center px-6">
            <div>
              <p className="font-mono text-[10px] text-skin-400/80 tracking-widest uppercase mb-1">
                Analysis Complete
              </p>
              <h2 className="font-display text-3xl font-bold text-white leading-tight">
                {result.disease}
              </h2>
            </div>
          </div>
          {/* Success badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-mono">Detected</span>
          </div>
        </div>
      )}

      {/* Metrics */}
      <div className="p-6 bg-white/[0.02] space-y-5">
        {/* Confidence score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider">
              Confidence Score
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold ${level.color}`}>
                {level.label}
              </span>
              <span className="font-mono text-sm font-bold text-white">
                {pct}%
              </span>
            </div>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full confidence-bar"
              style={{
                width: `${barWidth}%`,
                background: `linear-gradient(90deg, #e5612a, ${pct >= 85 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444'})`,
                boxShadow: `0 0 8px ${pct >= 85 ? '#10b98140' : pct >= 60 ? '#f59e0b40' : '#ef444440'}`,
              }}
            />
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Condition</p>
            <p className="text-sm font-body font-medium text-white truncate">{result.disease}</p>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Score</p>
            <p className="text-sm font-mono font-bold text-skin-400">{(confidence * 100).toFixed(2)}%</p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/15">
          <svg className="w-4 h-4 text-amber-400/70 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-[11px] text-amber-400/60 font-body leading-relaxed">
            For informational purposes only. Consult a dermatologist for medical diagnosis.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={onReset}
            className="flex-1 py-2.5 rounded-xl border border-white/10 hover:border-white/20 text-white/60 hover:text-white text-sm font-mono transition-all duration-200"
          >
            ↺ New Scan
          </button>
        </div>
      </div>
    </div>
  )
}
