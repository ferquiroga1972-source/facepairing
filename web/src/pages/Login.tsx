import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/auth'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { data } = await login(email, password)
      localStorage.setItem('token', data.access_token)
      navigate('/scan')
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="card-glow w-full max-w-md">
        <h1 className="text-3xl font-bold mb-2 text-center">Sign In</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">Welcome back to FacePairing</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base mt-2">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-400 text-sm">
          No account?{' '}
          <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium">Register</Link>
        </p>
      </div>
    </div>
  )
}
