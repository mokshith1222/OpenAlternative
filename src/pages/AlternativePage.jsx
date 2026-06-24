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
      let allData = [];
      let page = 0;
      let hasMore = true;
      
      while (hasMore) {
        const { data } = await supabase.from('tools').select('*').range(page * 1000, (page + 1) * 1000 - 1);
        if (data && data.length > 0) {
          allData = [...allData, ...data];
          if (data.length < 1000) hasMore = false;
          else page++;
        } else {
          hasMore = false;
        }
      }

      if (allData.length > 0) {
        setAlternatives(allData.filter(tool => tool.replaces && tool.replaces.toLowerCase() === normalizedSearch));
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
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`Best Open Source Alternatives to ${displayTitle} (2026)`} />
        <meta property="og:description" content={`Compare the best free and open-source alternatives to ${displayTitle}.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://openalternative-delta.vercel.app/alternative/${name}`} />
        <meta property="og:site_name" content="OpenAlternative" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Best Open Source Alternatives to ${displayTitle} (2026)`} />
        <meta name="twitter:description" content={`Compare the best free and open-source alternatives to ${displayTitle}.`} />
        
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <ArrowLeft size={16} /> Back to all
      </Link>
      
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1.1 }}>
          Best Open Source Alternatives<br />to <span style={{ color: 'var(--accent)' }}>{displayTitle}</span> (2026)
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '800px', marginBottom: '1.5rem', lineHeight: '1.6' }}>
          Discover the top free and self-hostable alternatives that can replace {displayTitle} in your workflow. 
          Proprietary software often comes with high subscription costs, vendor lock-in, and privacy concerns. 
          By adopting open-source solutions, you regain control over your data, reduce operational expenses, and 
          join a thriving community of developers. Whether you are looking for enterprise-grade applications or 
          simple personal tools, this curated list provides the most reliable and feature-rich alternatives to {displayTitle}.
        </p>
        <a 
          href={`https://twitter.com/intent/tweet?text=Check out these amazing open-source alternatives to ${displayTitle}!&url=https://openalternative-delta.vercel.app/alternative/${name}`} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#1DA1F2', fontWeight: '500', textDecoration: 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          Share on Twitter
        </a>
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
