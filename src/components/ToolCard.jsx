import { Star, Server, ExternalLink, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ToolCard({ tool }) {
  const [upvotes, setUpvotes] = useState(tool.upvotes || 0);
  const [hasUpvoted, setHasUpvoted] = useState(() => {
    return localStorage.getItem(`upvote_${tool.id}`) === 'true';
  });

  const handleUpvote = async (e) => {
    e.preventDefault();
    if (hasUpvoted) return;

    setUpvotes(prev => prev + 1);
    setHasUpvoted(true);
    localStorage.setItem(`upvote_${tool.id}`, 'true');

    // To properly increment, we get the current count and update
    // In a real production app with high concurrency, use a Supabase RPC
    const { data } = await supabase.from('tools').select('upvotes').eq('id', tool.id).single();
    if (data) {
      await supabase.from('tools').update({ upvotes: data.upvotes + 1 }).eq('id', tool.id);
    }
  };
  return (
    <div className="card-premium animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <button
            onClick={handleUpvote}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: hasUpvoted ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${hasUpvoted ? 'var(--accent)' : 'transparent'}`,
              borderRadius: '8px',
              padding: '0.5rem',
              cursor: hasUpvoted ? 'default' : 'pointer',
              color: hasUpvoted ? 'var(--text-primary)' : 'var(--text-muted)',
              transition: 'all 0.2s',
              minWidth: '50px'
            }}
          >
            <ChevronUp size={20} strokeWidth={3} />
            <span style={{ fontWeight: '700', fontSize: '0.9rem', marginTop: '0.2rem' }}>{upvotes}</span>
          </button>
          
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{tool.name}</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Replaces {tool.replaces}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500' }}>
            {tool.category}
          </span>
          {tool.upvotes >= 10 && (
            <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
              🔥 Trending
            </span>
          )}
        </div>
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
        to={`/tool/${tool.id}`}
        style={{
          marginTop: 'auto',
          padding: '0.75rem',
          backgroundColor: 'rgba(124, 58, 237, 0.1)',
          color: 'var(--text-primary)',
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
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
      >
        View {tool.name} <ExternalLink size={16} />
      </Link>
    </div>
  );
}
