import React, { useRef, useState } from 'react'

export const DropZone = ({ onFile, preview, onReset }) => {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) onFile(file)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => setDragging(false)

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file) onFile(file)
  }

  if (preview) {
    return (
      <div className="relative group rounded-2xl overflow-hidden border border-white/10 animate-fade-in">
        <img
          src={preview}
          alt="Preview"
          className="w-full h-72 object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-skin-500 rounded-tl" />
        <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-skin-500 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-skin-500 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-skin-500 rounded-br" />
        {/* Change button */}
        <button
          onClick={onReset}
          className="absolute top-4 right-12 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-full font-mono"
        >
          ↺ Change
        </button>
      </div>
    )
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => inputRef.current?.click()}
      className={`relative rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 h-72 flex flex-col items-center justify-center gap-4
        ${dragging
          ? 'border-skin-500 bg-skin-500/5 scale-[0.99]'
          : 'border-white/10 hover:border-white/25 hover:bg-white/[0.02]'
        }`}
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 rounded-2xl opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(229,97,42,0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {/* Icon */}
      <div className={`relative transition-transform duration-300 ${dragging ? 'scale-110' : ''}`}>
        <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
          <svg className="w-7 h-7 text-skin-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-skin-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      <div className="text-center relative z-10">
        <p className="font-display text-base text-white/80 font-semibold">
          {dragging ? 'Release to upload' : 'Drop your image here'}
        </p>
        <p className="text-xs font-mono text-white/30 mt-1">
          or click to browse — JPG, PNG, WEBP
        </p>
      </div>

      <div className="flex gap-2 relative z-10">
        {['Clear quality', 'Good lighting', 'Close-up'].map((tip) => (
          <span key={tip} className="text-[10px] font-mono px-2 py-1 rounded-full border border-white/10 text-white/30">
            {tip}
          </span>
        ))}
      </div>
    </div>
  )
}
