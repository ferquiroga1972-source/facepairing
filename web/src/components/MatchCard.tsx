interface Props {
  userId: number
  fullName: string
  similarityScore: number
}

export default function MatchCard({ userId, fullName, similarityScore }: Props) {
  const percent = Math.round(similarityScore * 100)
  const initial = (fullName || 'U')[0].toUpperCase()

  return (
    <div className="card flex items-center gap-4 hover:border-violet-400/50 transition-colors">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 flex items-center justify-center text-xl font-bold text-white flex-shrink-0">
        {initial}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-white">{fullName || `User #${userId}`}</div>
        <div className="text-violet-400 text-sm mt-0.5">{percent}% facial similarity</div>
      </div>
      <button className="btn-primary text-sm px-4 py-2">
        Connect
      </button>
    </div>
  )
}
