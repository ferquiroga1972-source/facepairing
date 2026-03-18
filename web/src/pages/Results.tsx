import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createCheckout } from '../api/payments'

interface ScanResult {
  scan_id: number
  image_url: string
  attributes: Record<string, unknown>
  diagnostic: string
}

export default function Results() {
  const navigate = useNavigate()
  const [result, setResult] = useState<ScanResult | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('scanResult')
    if (stored) setResult(JSON.parse(stored))
    else navigate('/scan')
  }, [navigate])

  const handleUpgrade = async () => {
    setCheckoutLoading(true)
    try {
      const { data } = await createCheckout()
      window.location.href = data.checkout_url
    } catch {
      alert('Failed to open checkout. Please try again.')
      setCheckoutLoading(false)
    }
  }

  if (!result) return null

  const simpleAttrs = Object.entries(result.attributes).filter(([, v]) => typeof v === 'string' || typeof v === 'number')

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Your Personality Diagnostic</h1>
        <p className="text-gray-400">Based on AI analysis of your facial features</p>
      </div>

      <div className="card mb-6">
        <h2 className="text-violet-400 font-bold text-lg mb-4">Facial Attributes Detected</h2>
        <div className="flex flex-wrap gap-2">
          {simpleAttrs.map(([k, v]) => (
            <span key={k} className="badge">
              <span className="font-semibold capitalize">{k}:</span> {String(v)}
            </span>
          ))}
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-violet-400 font-bold text-lg mb-4">Personality Report</h2>
        <div className="prose prose-invert max-w-none">
          <div className="text-gray-200 leading-relaxed whitespace-pre-wrap text-sm">{result.diagnostic}</div>
        </div>
      </div>

      <div className="card-glow text-center">
        <div className="text-4xl mb-3">💜</div>
        <h2 className="text-2xl font-bold mb-2">Find Your Face Matches</h2>
        <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm">
          Connect with people who share similar facial features and personality traits. Upgrade to Premium to unlock matching.
        </p>
        <button
          onClick={handleUpgrade}
          disabled={checkoutLoading}
          className="btn-primary text-lg px-10 py-4"
        >
          {checkoutLoading ? 'Loading...' : 'Unlock Matching — $9.99/mo'}
        </button>
        <p className="text-gray-500 text-xs mt-3">Cancel anytime</p>
      </div>
    </div>
  )
}
