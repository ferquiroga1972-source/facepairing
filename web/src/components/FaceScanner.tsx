import { useRef, useState, useCallback } from 'react'

interface Props {
  onCapture: (file: File) => void
}

export default function FaceScanner({ onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState('')

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setStreaming(true)
      }
    } catch {
      setError('Camera access denied. Please upload a photo instead.')
    }
  }

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')!
    canvasRef.current.width = videoRef.current.videoWidth
    canvasRef.current.height = videoRef.current.videoHeight
    ctx.drawImage(videoRef.current, 0, 0)
    canvasRef.current.toBlob((blob) => {
      if (blob) onCapture(new File([blob], 'capture.jpg', { type: 'image/jpeg' }))
    }, 'image/jpeg')
  }, [onCapture])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onCapture(file)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
      {streaming ? (
        <div>
          <video ref={videoRef} style={{ width: '100%', maxWidth: '480px', borderRadius: '12px' }} />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <br />
          <button onClick={capture} style={{ marginTop: '1rem', background: '#a78bfa', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
            Capture Photo
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={startCamera} style={{ background: '#a78bfa', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
            Use Camera
          </button>
          <label style={{ background: '#374151', color: '#fff', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer', fontSize: '1rem' }}>
            Upload Photo
            <input type="file" accept="image/*" onChange={handleFileInput} style={{ display: 'none' }} />
          </label>
        </div>
      )}
    </div>
  )
}
