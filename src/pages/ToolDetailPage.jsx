import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { ArrowLeft, Star, Server, ExternalLink, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import ToolCard from '../components/ToolCard';

export default function ToolDetailPage() {
  const { id } = useParams();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readme, setReadme] = useState(null);
  const [readmeLoading, setReadmeLoading] = useState(false);
  const [similarTools, setSimilarTools] = useState([]);

  useEffect(() => {
    async function fetchToolAndReadme() {
      const { data } = await supabase.from('tools').select('*').eq('id', id).single();
      if (data) {
        setTool(data);
        
        // Fetch similar tools
        const { data: similarData } = await supabase
          .from('tools')
          .select('*')
          .eq('category', data.category)
          .neq('id', data.id)
          .limit(3);
          
        if (similarData) {
          setSimilarTools(similarData);
        }
        
        // Fetch README if githubRepo exists
        if (data.githubRepo && data.githubRepo !== 'N/A') {
          setReadmeLoading(true);
          try {
            const res = await fetch(`https://api.github.com/repos/${data.githubRepo}/readme`);
            if (res.ok) {
              const json = await res.json();
              if (json.download_url) {
                const rawRes = await fetch(json.download_url);
                if (rawRes.ok) {
                  const text = await rawRes.text();
                  setReadme(text);
                }
              }
            } else if (res.status === 403) {
              setReadme("GitHub API rate limit exceeded. Please try again later.");
            }
          } catch (e) {
            console.error('Failed to fetch README', e);
          }
          setReadmeLoading(false);
        }
      }
      setLoading(false);
    }
    fetchToolAndReadme();
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
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{tool.name}</h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: 1.6 }}>{tool.description}</p>
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

        <div style={{ display: 'flex', gap: '1rem' }}>
          <a 
            href={tool.githubRepo && tool.githubRepo !== 'N/A' ? `https://github.com/${tool.githubRepo}` : `https://github.com/search?q=${tool.name}`}
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

      {/* GitHub README Section */}
      {tool.githubRepo && tool.githubRepo !== 'N/A' && (
        <div style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
            <FileText size={28} color="var(--accent)" />
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Documentation</h2>
          </div>
          
          <div className="card-premium readme-container" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', lineHeight: 1.8 }}>
            {readmeLoading ? (
              <p style={{ color: 'var(--text-muted)' }}>Fetching live documentation from GitHub...</p>
            ) : readme ? (
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                components={{
                  img: ({node, ...props}) => <img style={{ maxWidth: '100%', borderRadius: '8px', margin: '1rem 0' }} {...props} />,
                  h1: ({node, ...props}) => <h1 style={{ fontSize: '2.5rem', marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }} {...props} />,
                  h2: ({node, ...props}) => <h2 style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.5rem' }} {...props} />,
                  h3: ({node, ...props}) => <h3 style={{ fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '1rem' }} {...props} />,
                  a: ({node, ...props}) => <a style={{ color: 'var(--accent)', textDecoration: 'underline' }} {...props} />,
                  pre: ({node, ...props}) => <pre style={{ backgroundColor: '#000', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto', margin: '1.5rem 0' }} {...props} />,
                  code: ({node, inline, ...props}) => inline ? <code style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.9em' }} {...props} /> : <code {...props} />,
                  blockquote: ({node, ...props}) => <blockquote style={{ borderLeft: '4px solid var(--accent)', paddingLeft: '1rem', color: 'var(--text-muted)', margin: '1.5rem 0' }} {...props} />
                }}
              >
                {readme}
              </ReactMarkdown>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>No documentation found for this repository.</p>
            )}
          </div>
        </div>
      )}

      {/* Similar Tools Section */}
      {similarTools.length > 0 && (
        <div style={{ marginTop: '5rem', borderTop: '1px solid var(--card-border)', paddingTop: '4rem' }}>
          <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '2rem' }}>Similar Alternatives</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {similarTools.map(t => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
