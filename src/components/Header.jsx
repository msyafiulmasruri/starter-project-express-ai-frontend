import React from 'react'

export const Header = ({ activeTab, onTabChange }) => {
  return (
    <header className="relative z-10 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" stroke="#e5612a" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="8" stroke="#e5612a" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="16" cy="16" r="3" fill="#e5612a" />
              <line x1="16" y1="2" x2="16" y2="6" stroke="#e5612a" strokeWidth="1.5" />
              <line x1="16" y1="26" x2="16" y2="30" stroke="#e5612a" strokeWidth="1.5" />
              <line x1="2" y1="16" x2="6" y2="16" stroke="#e5612a" strokeWidth="1.5" />
              <line x1="26" y1="16" x2="30" y2="16" stroke="#e5612a" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <span className="font-display text-lg font-semibold text-white tracking-tight">
              Derma<span className="text-skin-500">Scan</span>
            </span>
            <p className="text-[10px] font-mono text-white/30 tracking-widest uppercase leading-none">
              AI Skin Analysis
            </p>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav className="flex items-center gap-1 bg-white/5 rounded-full p-1">
          {['scan', 'history'].map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-5 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-300 capitalize ${
                activeTab === tab
                  ? 'bg-skin-500 text-white shadow-lg shadow-skin-500/30'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
