import React, { useState, useEffect } from 'react'
import { getHistory, clearHistory, deleteHistoryItem, formatDate, getConfidenceLevel } from '../utils/storage'

export const HistoryPage = () => {
  const [history, setHistory] = useState([])
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => {
    setHistory(getHistory())
  }, [])

  const handleDelete = (id) => {
    const updated = deleteHistoryItem(id)
    setHistory(updated)
  }

  const handleClear = () => {
    if (confirmClear) {
      clearHistory()
      setHistory([])
      setConfirmClear(false)
    } else {
      setConfirmClear(true)
      setTimeout(() => setConfirmClear(false), 3000)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 animate-fade-up">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Scan <span className="italic text-skin-400">History</span>
          </h1>
          <p className="text-xs font-mono text-white/30 mt-1">
            {history.length} record{history.length !== 1 ? 's' : ''} stored locally
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={handleClear}
            className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200 ${
              confirmClear
                ? 'border-red-500/50 text-red-400 bg-red-500/10'
                : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/50'
            }`}
          >
            {confirmClear ? 'Confirm Clear' : 'Clear All'}
          </button>
        )}
      </div>

      {/* Empty state */}
      {history.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="font-display text-lg text-white/30 font-semibold">No scans yet</p>
          <p className="text-xs font-mono text-white/20 mt-1">
            Your analysis history will appear here
          </p>
        </div>
      )}

      {/* History list */}
      <div className="space-y-3">
        {history.map((item, i) => {
          const level = getConfidenceLevel(item.confidenceScore)
          const pct = Math.round(item.confidenceScore * 100)
          return (
            <div
              key={item.id}
              className="group relative rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden hover:border-white/15 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both', opacity: 0 }}
            >
              <div className="flex gap-3 p-4">
                {/* Thumbnail */}
                {item.imagePreview ? (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={item.imagePreview} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-950/40" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01"
                      />
                    </svg>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-white text-base truncate">
                      {item.disease}
                    </h3>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className={`text-xs font-mono font-bold ${level.color}`}>{pct}%</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        pct >= 85 ? 'border-emerald-500/30 text-emerald-400/70 bg-emerald-500/5'
                        : pct >= 60 ? 'border-amber-500/30 text-amber-400/70 bg-amber-500/5'
                        : 'border-red-500/30 text-red-400/70 bg-red-500/5'
                      }`}>
                        {level.label}
                      </span>
                    </div>
                  </div>

                  {/* Mini bar */}
                  <div className="mt-2 h-0.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: pct >= 85 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444',
                      }}
                    />
                  </div>

                  <p className="mt-1.5 text-[11px] font-mono text-white/25">
                    {formatDate(item.timestamp)}
                  </p>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 rounded-full bg-red-500/15 hover:bg-red-500/30 flex items-center justify-center"
              >
                <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{
                  background: pct >= 85 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#ef4444',
                  opacity: 0.6,
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
