import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <nav className="bg-[#0d0d1f] border-b border-gray-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold gradient-text no-underline">
        FacePairing
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/scan" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Scan</Link>
        <Link to="/matching" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Matches</Link>
        <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Pricing</Link>
        {token ? (
          <button onClick={logout} className="border border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg transition-all cursor-pointer bg-transparent">
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn-primary text-sm px-4 py-2">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}
