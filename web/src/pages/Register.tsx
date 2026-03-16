import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../api/auth'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await register(email, password, fullName)
      localStorage.setItem('token', data.access_token)
      navigate('/scan')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail
      setError(msg || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #374151', background: '#1e1e3f', color: '#f5f5f5', fontSize: '1rem', boxSizing: 'border-box' as const }

  return (
    <div style={{ maxWidth: '400px', margin: '6rem auto', padding: '2rem', background: '#1e1e3f', borderRadius: '16px', border: '1px solid #374151' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input type="text" placeholder="Full Name (optional)" value={fullName} onChange={(e) => setFullName(e.target.value)} style={inputStyle} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />
        {error && <p style={{ color: '#f87171', margin: 0 }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', color: '#fff', border: 'none', padding: '0.85rem', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8' }}>
        Already have an account? <Link to="/login" style={{ color: '#a78bfa' }}>Sign in</Link>
      </p>
    </div>
  )
}
