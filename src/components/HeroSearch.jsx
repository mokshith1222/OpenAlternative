import { useState, useEffect, useRef } from 'react';

export default function HeroSearch({ searchQuery, setSearchQuery }) {
  const [placeholder, setPlaceholder] = useState('Search Notion...');
  const inputRef = useRef(null);
  const tools = ['Notion', 'Jira', 'Photoshop', 'Slack', 'Figma', 'Trello'];
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % tools.length;
      setPlaceholder(`Search ${tools[i]}...`);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
        Find Open Source Alternatives<br/>
        <span style={{ color: 'var(--text-muted)' }}>to Expensive Software</span>
      </h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px' }}>
        Discover free, self-hostable and open-source replacements for popular SaaS products.
      </p>
      <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
        <input 
          ref={inputRef}
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '1.25rem 2rem',
            fontSize: '1.2rem',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '100px',
            color: 'var(--text-primary)',
            outline: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
        />
        <div style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: '0.25rem', pointerEvents: 'none' }}>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ctrl</span>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>K</span>
        </div>
      </div>
    </div>
  );
}
