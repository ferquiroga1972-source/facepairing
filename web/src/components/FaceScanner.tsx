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
    <div className="text-center">
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {streaming ? (
        <div>
          <video ref={videoRef} className="w-full max-w-md mx-auto rounded-xl" />
          <canvas ref={canvasRef} className="hidden" />
          <button onClick={capture} className="btn-primary mt-6 px-10 py-3">
            Capture Photo
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 py-6">
          <div className="w-32 h-32 rounded-full bg-violet-400/10 border-2 border-dashed border-violet-400/40 flex items-center justify-center text-5xl">
            🤳
          </div>
          <p className="text-gray-400 text-sm max-w-xs">Position your face clearly in the frame for best results</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button onClick={startCamera} className="btn-primary px-8 py-3">
              Use Camera
            </button>
            <label className="btn-ghost px-8 py-3 cursor-pointer">
              Upload Photo
              <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            </label>
          </div>
        </div>
      )}
    </div>
  )
}
