import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../supabaseClient';
import { Search } from 'lucide-react';

export default function ComparisonsPage() {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchComparisons() {
      let allData = [];
      let page = 0;
      let hasMore = true;
      
      while (hasMore) {
        const { data } = await supabase.from('tools').select('replaces').range(page * 1000, (page + 1) * 1000 - 1);
        if (data && data.length > 0) {
          allData = [...allData, ...data];
          if (data.length < 1000) hasMore = false;
          else page++;
        } else {
          hasMore = false;
        }
      }

      if (allData.length > 0) {
        const rawComparisons = allData
          .map(t => t.replaces)
          .filter(r => r && r !== 'N/A' && r.trim() !== '');
        
        // Remove duplicates and sort alphabetically
        const uniqueComparisons = Array.from(new Set(rawComparisons)).sort((a, b) => a.localeCompare(b));
        setComparisons(uniqueComparisons);
      }
      setLoading(false);
    }
    fetchComparisons();
  }, []);

  const filteredComparisons = useMemo(() => {
    return comparisons.filter(c => c.toLowerCase().includes(search.toLowerCase()));
  }, [comparisons, search]);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Open Source Software Comparisons"
  };

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <Helmet>
        <title>All Open Source Comparisons - Find Alternatives to Paid Software</title>
        <meta name="description" content="Browse our complete directory of open-source alternatives to expensive proprietary software like Notion, Slack, Jira, and hundreds more." />
        <link rel="canonical" href="https://openalternative-delta.vercel.app/comparisons" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: '800', letterSpacing: '-0.02em' }}>
          The Ultimate <span style={{ color: 'var(--accent)' }}>Comparison</span> Library
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}>
          We have indexed thousands of open-source projects. Browse our complete directory below to find the perfect free replacement for the software you currently pay for.
        </p>

        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search for any proprietary software..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3rem',
              fontSize: '1.1rem',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
              borderRadius: '100px',
              color: 'var(--text-primary)',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
          />
        </div>
      </div>

      <div style={{ padding: '3rem', backgroundColor: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--card-border)' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem 0' }}>
            <div className="skeleton" style={{ height: '40px', width: '200px', margin: '0 auto 2rem auto', borderRadius: '100px' }}></div>
            <p>Indexing hundreds of software comparisons...</p>
          </div>
        ) : filteredComparisons.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {filteredComparisons.map(comp => (
              <Link 
                key={comp}
                to={`/alternative/${comp.toLowerCase().replace(/\s+/g, '-')}`}
                style={{ 
                  padding: '0.6rem 1.25rem', 
                  borderRadius: '100px', 
                  backgroundColor: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--card-border)', 
                  fontSize: '1rem', 
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }} 
                onMouseOver={e => { 
                  e.currentTarget.style.borderColor = 'var(--accent)'; 
                  e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.1)'; 
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }} 
                onMouseOut={e => { 
                  e.currentTarget.style.borderColor = 'var(--card-border)'; 
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; 
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ color: 'var(--accent)' }}>•</span> {comp} Alternatives
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
            No comparisons found matching "{search}"
          </div>
        )}
      </div>
    </div>
  );
}
