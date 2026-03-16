import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Discover Your Personality Through Your Face
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '540px', lineHeight: 1.7, marginBottom: '2.5rem' }}>
        FacePairing uses advanced AI and physiognomy science to analyze your facial features and reveal deep insights about your personality.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={() => navigate('/scan')} style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)', color: '#fff', border: 'none', padding: '1rem 2.5rem', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' }}>
          Scan My Face
        </button>
        <button onClick={() => navigate('/pricing')} style={{ background: 'transparent', color: '#a78bfa', border: '2px solid #a78bfa', padding: '1rem 2.5rem', borderRadius: '10px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer' }}>
          See Pricing
        </button>
      </div>
    </div>
  )
}
