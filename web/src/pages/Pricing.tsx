import { useNavigate } from 'react-router-dom'
import { createCheckout } from '../api/payments'
import { useState } from 'react'

export default function Pricing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/register')
      return
    }
    setLoading(true)
    try {
      const { data } = await createCheckout()
      window.location.href = data.checkout_url
    } catch {
      alert('Failed to open checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '760px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Simple Pricing</h1>
      <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>Start free, upgrade when you are ready to connect</p>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ background: '#1e1e3f', border: '1px solid #374151', borderRadius: '16px', padding: '2rem', flex: '1', minWidth: '280px', maxWidth: '340px' }}>
          <h2 style={{ marginBottom: '0.5rem' }}>Free</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>$0</div>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', color: '#94a3b8', lineHeight: 2 }}>
            <li>Face analysis</li>
            <li>Full personality diagnostic</li>
            <li>Physiognomy report</li>
            <li style={{ color: '#4b5563' }}>Face matching</li>
            <li style={{ color: '#4b5563' }}>Contact matches</li>
          </ul>
          <button onClick={() => navigate('/scan')} style={{ marginTop: '1.5rem', width: '100%', background: '#374151', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' }}>
            Get Started
          </button>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #1e1e3f, #2d1b69)', border: '2px solid #a78bfa', borderRadius: '16px', padding: '2rem', flex: '1', minWidth: '280px', maxWidth: '340px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: '#a78bfa', color: '#fff', padding: '0.25rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
            POPULAR
          </div>
          <h2 style={{ marginBottom: '0.5rem' }}>Premium</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>$9.99<span style={{ fontSize: '1rem', fontWeight: 400, color: '#94a3b8' }}>/mo</span></div>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', lineHeight: 2 }}>
            <li>Everything in Free</li>
            <li style={{ color: '#a78bfa' }}>Face similarity matching</li>
            <li style={{ color: '#a78bfa' }}>Browse matched profiles</li>
            <li style={{ color: '#a78bfa' }}>Contact matches directly</li>
            <li style={{ color: '#a78bfa' }}>Unlimited scans</li>
          </ul>
          <button onClick={handleCheckout} disabled={loading} style={{ marginTop: '1.5rem', width: '100%', background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
            {loading ? 'Loading...' : 'Get Premium'}
          </button>
        </div>
      </div>
    </div>
  )
}
