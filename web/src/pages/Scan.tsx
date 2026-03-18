import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FaceScanner from '../components/FaceScanner'
import { uploadFace } from '../api/face'

export default function Scan() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCapture = async (file: File) => {
    if (!localStorage.getItem('token')) {
      navigate('/login')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { data } = await uploadFace(file)
      sessionStorage.setItem('scanResult', JSON.stringify(data))
      navigate('/results')
    } catch (e: unknown) {
      const msg = (e as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setError(msg || 'Analysis failed. Please try again with a clear face photo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-3">Face Scan</h1>
      <p className="text-gray-400 mb-10">Take a photo or upload an image with your face clearly visible</p>

      {loading ? (
        <div className="card py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-violet-400 border-t-transparent animate-spin" />
            <p className="text-violet-300 font-medium text-lg">Analyzing your face...</p>
            <p className="text-gray-500 text-sm">This may take 15-30 seconds</p>
          </div>
        </div>
      ) : (
        <div className="card">
          <FaceScanner onCapture={handleCapture} />
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-900/30 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <p className="mt-8 text-gray-500 text-sm">
        Not signed in?{' '}
        <span className="text-violet-400 cursor-pointer" onClick={() => navigate('/register')}>Create a free account</span>
      </p>
    </div>
  )
}
