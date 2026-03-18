import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="inline-block bg-violet-400/10 border border-violet-400/30 text-violet-300 text-sm px-4 py-1.5 rounded-full mb-6">
          AI-Powered Face Analysis
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="gradient-text">Discover Your Personality</span>
          <br />
          <span className="text-white">Through Your Face</span>
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto leading-relaxed mb-10">
          FacePairing uses advanced AI to analyze your facial features and reveal deep personality insights — then connects you with people who share your unique traits.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button onClick={() => navigate('/scan')} className="btn-primary text-lg px-8 py-4">
            Scan My Face
          </button>
          <button onClick={() => navigate('/pricing')} className="btn-outline text-lg px-8 py-4">
            See Pricing
          </button>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
        {[
          { icon: '🔍', title: 'Face Analysis', desc: 'Advanced AI scans your facial features and expression in seconds' },
          { icon: '🧠', title: 'Personality Report', desc: 'Get a vivid, detailed personality profile based on your unique features' },
          { icon: '💜', title: 'Find Your Match', desc: 'Connect with people who share similar facial features and energy' },
        ].map((f) => (
          <div key={f.title} className="card text-left hover:border-violet-400/50 transition-colors">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
