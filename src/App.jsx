import React, { useState } from 'react'
import { Header } from './components/Header'
import { ScanPage } from './pages/ScanPage'
import { HistoryPage } from './pages/HistoryPage'

function App() {
  const [activeTab, setActiveTab] = useState('scan')

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-x-hidden">
      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Warm glow top-right */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #e5612a 0%, transparent 70%)' }}
        />
        {/* Cool glow bottom-left */}
        <div
          className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }}
        />
      </div>

      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="relative z-10">
        {activeTab === 'scan' ? <ScanPage /> : <HistoryPage />}
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 border-t border-white/[0.04]">
        <p className="text-[10px] font-mono text-white/15 tracking-widest">
          DERMASCAN — AI-POWERED SKIN ANALYSIS — NOT A MEDICAL DEVICE
        </p>
      </footer>
    </div>
  )
}

export default App
