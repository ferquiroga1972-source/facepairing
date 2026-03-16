interface Props {
  userId: number
  fullName: string
  similarityScore: number
}

export default function MatchCard({ userId, fullName, similarityScore }: Props) {
  const percent = Math.round(similarityScore * 100)

  return (
    <div style={{ background: '#1e1e3f', borderRadius: '12px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid #374151' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 700 }}>
        {(fullName || 'U')[0].toUpperCase()}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, fontSize: '1rem' }}>{fullName || `User #${userId}`}</div>
        <div style={{ color: '#a78bfa', fontSize: '0.9rem' }}>{percent}% facial similarity</div>
      </div>
      <button style={{ background: '#a78bfa', color: '#fff', border: 'none', padding: '0.5rem 1.2rem', borderRadius: '8px', cursor: 'pointer' }}>
        Connect
      </button>
    </div>
  )
}
