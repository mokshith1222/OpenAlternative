import { Star, Server, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FeaturedAlternative({ replaces, tool }) {
  return (
    <div className="card-premium" style={{ padding: '2.5rem', marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'linear-gradient(145deg, var(--card-bg) 0%, rgba(124, 58, 237, 0.08) 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Featured Match</span>
        <div style={{ height: '1px', flexGrow: 1, backgroundColor: 'var(--card-border)' }}></div>
      </div>
      
      <div>
        <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Replace {replaces} with {tool.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6 }}>{tool.description}</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        {tool.githubStars !== 'N/A' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={18} color="var(--text-primary)" /> {tool.githubStars} GitHub Stars
          </div>
        )}
        {tool.isSelfHostable && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={18} color="var(--text-primary)" /> Self-hosted
          </div>
        )}
      </div>

      <Link 
        to={`/alternative/${replaces.toLowerCase().replace(/\s+/g, '-')}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'var(--text-primary)',
          color: 'var(--bg-color)',
          padding: '0.85rem 1.75rem',
          borderRadius: '8px',
          fontWeight: '600',
          alignSelf: 'flex-start',
          transition: 'opacity 0.2s',
          fontSize: '1rem'
        }}
        onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}
      >
        See all {replaces} alternatives <ArrowRight size={18} />
      </Link>
    </div>
  );
}
