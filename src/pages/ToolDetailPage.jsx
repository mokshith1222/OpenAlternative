import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { ArrowLeft, Star, Server, ExternalLink } from 'lucide-react';

export default function ToolDetailPage() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTool() {
      const { data } = await supabase.from('tools').select('*').eq('id', id).single();
      if (data) setTool(data);
      setLoading(false);
    }
    fetchTool();
  }, [id]);

  if (loading) {
    return <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}><p>Loading...</p></div>;
  }

  if (!tool) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Tool not found</h1>
        <Link to="/" style={{ color: 'var(--accent)' }}>Return Home</Link>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": tool.category,
    "description": tool.description,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <Helmet>
        <title>{tool.name} - Open Source Alternative to {tool.replaces} (2026)</title>
        <meta name="description" content={`Read our review of ${tool.name}, the best free and open-source alternative to ${tool.replaces}.`} />
        <link rel="canonical" href={`https://openalternative.example.com/tool/${tool.id}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '3rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <ArrowLeft size={16} /> Back to Directory
      </Link>
      
      <div className="card-premium" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <span style={{ color: 'var(--accent)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'block' }}>
            Replaces {tool.replaces}
          </span>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{tool.name}</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: 1.6 }}>{tool.description}</p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', padding: '2rem 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
          {tool.githubStars !== 'N/A' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>GitHub Stars</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                <Star size={20} color="var(--accent)" /> {tool.githubStars}
              </div>
            </div>
          )}
          {tool.isSelfHostable && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Deployment</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
                <Server size={20} color="var(--accent)" /> Self-hosted
              </div>
            </div>
          )}
        </div>

        <a 
          href={`https://github.com/search?q=${tool.name}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-color)',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontWeight: '600',
            alignSelf: 'flex-start',
            fontSize: '1.1rem',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
          onMouseOut={e => e.currentTarget.style.opacity = '1'}
        >
          View on GitHub <ExternalLink size={20} />
        </a>
      </div>
    </div>
  );
}
