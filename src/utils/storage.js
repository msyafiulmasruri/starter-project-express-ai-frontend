const STORAGE_KEY = 'dermascan_history'
const MAX_HISTORY = 20

export const getHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const addToHistory = (entry) => {
  const history = getHistory()
  const newEntry = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...entry,
  }
  const updated = [newEntry, ...history].slice(0, MAX_HISTORY)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY)
}

export const deleteHistoryItem = (id) => {
  const history = getHistory()
  const updated = history.filter((item) => item.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

export const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const getConfidenceLevel = (score) => {
  if (score >= 0.85) return { label: 'High', color: 'text-emerald-400' }
  if (score >= 0.6) return { label: 'Medium', color: 'text-amber-400' }
  return { label: 'Low', color: 'text-red-400' }
}
