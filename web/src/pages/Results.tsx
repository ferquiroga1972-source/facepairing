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

  return (
    <div style={{ maxWidth: '720px', margin: '3rem auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>Your Personality Diagnostic</h1>
      <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '2rem' }}>Based on physiognomy analysis of your facial features</p>

      <div style={{ background: '#1e1e3f', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid #374151' }}>
        <h2 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Facial Attributes Detected</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {Object.entries(result.attributes)
            .filter(([, v]) => typeof v === 'string' || typeof v === 'number')
            .map(([k, v]) => (
              <span key={k} style={{ background: '#374151', padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                <strong>{k}:</strong> {String(v)}
              </span>
            ))}
        </div>
      </div>

      <div style={{ background: '#1e1e3f', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #374151' }}>
        <h2 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Personality Report</h2>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, color: '#e2e8f0' }}>{result.diagnostic}</div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1e1e3f, #2d1b69)', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '1px solid #a78bfa' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>Find Your Face Matches</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Connect with people who share similar facial features and personality traits.</p>
        <button
          onClick={handleUpgrade}
          disabled={checkoutLoading}
          style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', color: '#fff', border: 'none', padding: '0.9rem 2.5rem', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
        >
          {checkoutLoading ? 'Loading...' : 'Unlock Matching — $9.99/mo'}
        </button>
      </div>
    </div>
  )
}
