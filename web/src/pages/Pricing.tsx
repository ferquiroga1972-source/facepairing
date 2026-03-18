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
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-extrabold mb-3 gradient-text">Simple Pricing</h1>
      <p className="text-gray-400 mb-14 text-lg">Start free, upgrade when you are ready to connect</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="card text-left flex flex-col">
          <h2 className="text-xl font-bold mb-1">Free</h2>
          <div className="text-4xl font-extrabold my-4">$0</div>
          <ul className="text-gray-400 text-sm space-y-3 flex-1 mb-8">
            {['Face analysis', 'Full personality diagnostic', 'Physiognomy report'].map(f => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-green-400">✓</span> {f}
              </li>
            ))}
            {['Face matching', 'Contact matches'].map(f => (
              <li key={f} className="flex items-center gap-2 opacity-40">
                <span>✗</span> {f}
              </li>
            ))}
          </ul>
          <button onClick={() => navigate('/scan')} className="btn-ghost w-full py-3 text-center">
            Get Started
          </button>
        </div>

        <div className="card-glow text-left flex flex-col relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-violet-400 text-white text-xs font-bold px-4 py-1 rounded-full">
            POPULAR
          </div>
          <h2 className="text-xl font-bold mb-1">Premium</h2>
          <div className="text-4xl font-extrabold my-4">
            $9.99 <span className="text-base font-normal text-gray-400">/mo</span>
          </div>
          <ul className="text-sm space-y-3 flex-1 mb-8">
            {['Everything in Free', 'Face similarity matching', 'Browse matched profiles', 'Contact matches directly', 'Unlimited scans'].map(f => (
              <li key={f} className="flex items-center gap-2">
                <span className="text-violet-400">✓</span> {f}
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout} disabled={loading} className="btn-primary w-full py-3 text-center">
            {loading ? 'Loading...' : 'Get Premium'}
          </button>
        </div>
      </div>
    </div>
  )
}
