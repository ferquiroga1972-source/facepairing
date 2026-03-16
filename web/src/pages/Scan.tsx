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
    <div style={{ maxWidth: '640px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Face Scan</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Take a photo or upload an image with your face clearly visible</p>
      {loading ? (
        <div style={{ padding: '3rem' }}>
          <div style={{ fontSize: '1.2rem', color: '#a78bfa' }}>Analyzing your face...</div>
          <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>This may take a few seconds</p>
        </div>
      ) : (
        <FaceScanner onCapture={handleCapture} />
      )}
      {error && <p style={{ color: '#f87171', marginTop: '1rem' }}>{error}</p>}
    </div>
  )
}
