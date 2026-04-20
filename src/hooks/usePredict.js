import { useState, useCallback } from 'react'
import { predictImage } from '../utils/api'
import { addToHistory } from '../utils/storage'

export const usePredict = () => {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFile = useCallback((selectedFile) => {
    if (!selectedFile) return
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP)')
      return
    }
    setFile(selectedFile)
    setResult(null)
    setError(null)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(selectedFile)
  }, [])

  const handlePredict = useCallback(async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await predictImage(file)

      if (data.status === 'success') {
        const resultData = {
          disease: data.data.disease,
          confidenceScore: data.data.confidenceScore,
          imagePreview: preview,
          fileName: file.name,
        }
        setResult(resultData)
        addToHistory(resultData)
      } else {
        setError(data.message || 'Prediction failed')
      }
    } catch (err) {
      console.error(err)
      if (err.response) {
        setError(err.response.data?.message || 'Server error occurred')
      } else if (err.request) {
        setError('Cannot connect to server. Please check your connection.')
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }, [file, preview])

  const reset = useCallback(() => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setError(null)
  }, [])

  return {
    file,
    preview,
    result,
    loading,
    error,
    handleFile,
    handlePredict,
    reset,
  }
}
