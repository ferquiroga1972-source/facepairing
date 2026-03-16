import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MatchCard from '../components/MatchCard'
import { getMatches } from '../api/face'

interface Match { user_id: number; full_name: string; similarity_score: number }

export default function Matching() {
  const navigate = useNavigate()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMatches()
      .then(({ data }) => setMatches(data.matches))
      .catch((e) => {
        if (e?.response?.status === 401) navigate('/login')
        else if (e?.response?.status === 403) setError('Premium subscription required. Please upgrade to access matches.')
        else setError(e?.response?.data?.detail || 'Failed to load matches.')
      })
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem', color: '#a78bfa' }}>Loading matches...</div>

  return (
    <div style={{ maxWidth: '680px', margin: '3rem auto', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Your Face Matches</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>People who share similar facial features and personality traits</p>
      {error ? (
        <div style={{ background: '#1e1e3f', borderRadius: '12px', padding: '2rem', textAlign: 'center', border: '1px solid #f87171' }}>
          <p style={{ color: '#f87171' }}>{error}</p>
          <button onClick={() => navigate('/pricing')} style={{ marginTop: '1rem', background: '#a78bfa', color: '#fff', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer' }}>
            Upgrade to Premium
          </button>
        </div>
      ) : matches.length === 0 ? (
        <p style={{ color: '#94a3b8' }}>No matches found yet. Make sure you have scanned your face first.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {matches.map((m) => <MatchCard key={m.user_id} userId={m.user_id} fullName={m.full_name} similarityScore={m.similarity_score} />)}
        </div>
      )}
    </div>
  )
}
