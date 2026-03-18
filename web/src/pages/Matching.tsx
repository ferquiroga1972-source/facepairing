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
        else if (e?.response?.status === 403) setError('Premium subscription required.')
        else setError(e?.response?.data?.detail || 'Failed to load matches.')
      })
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-4 border-violet-400 border-t-transparent animate-spin" />
        <p className="text-violet-300">Loading matches...</p>
      </div>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">Your Face Matches</h1>
      <p className="text-gray-400 mb-8">People who share similar facial features and personality traits</p>

      {error ? (
        <div className="card-glow text-center py-12">
          <div className="text-4xl mb-4">🔒</div>
          <p className="text-gray-300 mb-6">{error}</p>
          <button onClick={() => navigate('/pricing')} className="btn-primary px-8 py-3">
            Upgrade to Premium
          </button>
        </div>
      ) : matches.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-4xl mb-4">👤</div>
          <p className="text-gray-400">No matches found yet.</p>
          <p className="text-gray-500 text-sm mt-2">Scan your face first to find matches.</p>
          <button onClick={() => navigate('/scan')} className="btn-outline mt-6 px-8 py-3">
            Scan My Face
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {matches.map((m) => <MatchCard key={m.user_id} userId={m.user_id} fullName={m.full_name} similarityScore={m.similarity_score} />)}
        </div>
      )}
    </div>
  )
}
