import { Star, Server, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ToolCard({ tool }) {
  return (
    <div className="card-premium animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{tool.name}</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Replaces {tool.replaces}</span>
        </div>
        <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500' }}>
          {tool.category}
        </span>
      </div>
      
      <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', flexGrow: 1, lineHeight: 1.5 }}>{tool.description}</p>
      
      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', paddingTop: '1rem', borderTop: '1px solid var(--card-border)' }}>
        {tool.githubStars !== 'N/A' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Star size={14} /> {tool.githubStars}
          </div>
        )}
        {tool.isSelfHostable && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Server size={14} /> Self-hostable
          </div>
        )}
      </div>
      
      <Link 
        to={`/alternative/${tool.replaces.toLowerCase().replace(/\s+/g, '-')}`}
        style={{
          marginTop: 'auto',
          padding: '0.75rem',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          color: 'var(--accent)',
          textAlign: 'center',
          borderRadius: '8px',
          fontWeight: '600',
          transition: 'all 0.2s',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.1)';
          e.currentTarget.style.color = 'var(--accent)';
        }}
      >
        View Alternatives <ExternalLink size={16} />
      </Link>
    </div>
  );
}
