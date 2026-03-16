import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav style={{ background: '#1a1a2e', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Link to="/" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#a78bfa', textDecoration: 'none' }}>
        FacePairing
      </Link>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/scan" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Scan</Link>
        <Link to="/matching" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Matches</Link>
        <Link to="/pricing" style={{ color: '#e2e8f0', textDecoration: 'none' }}>Pricing</Link>
        {token ? (
          <button onClick={logout} style={{ background: 'transparent', border: '1px solid #a78bfa', color: '#a78bfa', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ background: '#a78bfa', color: '#fff', padding: '0.4rem 1rem', borderRadius: '6px', textDecoration: 'none' }}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
