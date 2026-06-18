import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import ToolCard from '../components/ToolCard';
import { ArrowLeft } from 'lucide-react';

export default function AlternativePage() {
  const { name } = useParams();
  const [alternatives, setAlternatives] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const normalizedSearch = name.replace(/-/g, ' ').toLowerCase();
  
  useEffect(() => {
    async function fetchTools() {
      const { data } = await supabase.from('tools').select('*');
      if (data) {
        setAlternatives(data.filter(tool => tool.replaces.toLowerCase() === normalizedSearch));
      }
      setLoading(false);
    }
    fetchTools();
  }, [normalizedSearch]);

  const displayTitle = alternatives.length > 0 ? alternatives[0].replaces : name.replace(/-/g, ' ');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Open Source Alternatives to ${displayTitle}`
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <Helmet>
        <title>Best Open Source Alternatives to {displayTitle} (2026)</title>
        <meta name="description" content={`Compare the best free and open-source alternatives to ${displayTitle}${alternatives.length > 0 ? ' including ' + alternatives.slice(0,3).map(a=>a.name).join(', ') : ''}.`} />
        <link rel="canonical" href={`https://openalternative-delta.vercel.app/alternative/${name}`} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <ArrowLeft size={16} /> Back to all
      </Link>
      
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>
          Best Open Source Alternatives<br />to <span style={{ color: 'var(--accent)' }}>{displayTitle}</span> (2026)
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
          Discover the top free and self-hostable alternatives that can replace {displayTitle} in your workflow.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
           <p style={{ color: 'var(--text-muted)' }}>Loading alternatives...</p>
        ) : alternatives.length > 0 ? (
          alternatives.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', padding: '4rem 0', backgroundColor: 'var(--card-bg)', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--card-border)' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>No alternatives found yet</h3>
            <p>We are still adding open-source alternatives for {displayTitle}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
