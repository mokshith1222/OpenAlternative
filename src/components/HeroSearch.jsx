import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSearch({ searchQuery, setSearchQuery }) {
  const [currentToolIndex, setCurrentToolIndex] = useState(0);
  const inputRef = useRef(null);
  const tools = ['Shopify', 'Notion', 'Jira', 'Slack', 'Figma', 'Salesforce', 'Airtable', 'Zendesk'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToolIndex((prev) => (prev + 1) % tools.length);
    }, 2500);
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
    <div style={{ textAlign: 'center', padding: '8rem 0 6rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      
      {/* Background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '800px', height: '400px', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: -1, pointerEvents: 'none' }}></div>

      <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1, fontWeight: '800', letterSpacing: '-0.03em' }}>
        Find the best open source<br/>
        alternative to <span style={{ color: 'var(--accent)', transition: 'opacity 0.3s ease-in-out' }}>{tools[currentToolIndex]}</span>
      </h1>
      <p style={{ fontSize: '1.35rem', color: 'var(--text-muted)', marginBottom: '3.5rem', maxWidth: '650px', lineHeight: 1.6 }}>
        Discover and deploy free, self-hostable replacements for the world's most expensive proprietary software.
      </p>
      <div style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
        <input 
          ref={inputRef}
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for any software or category..."
          style={{
            width: '100%',
            padding: '1.5rem 2.5rem',
            fontSize: '1.25rem',
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
      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Popular Comparisons:</span>
        <Link to="/alternative/notion" style={{ padding: '0.4rem 1.2rem', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', fontSize: '0.9rem', color: 'var(--text-primary)', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.1)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}>Notion</Link>
        <Link to="/alternative/slack" style={{ padding: '0.4rem 1.2rem', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', fontSize: '0.9rem', color: 'var(--text-primary)', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.1)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}>Slack</Link>
        <Link to="/alternative/jira" style={{ padding: '0.4rem 1.2rem', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', fontSize: '0.9rem', color: 'var(--text-primary)', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.1)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}>Jira</Link>
        <Link to="/alternative/shopify" style={{ padding: '0.4rem 1.2rem', borderRadius: '100px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', fontSize: '0.9rem', color: 'var(--text-primary)', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.1)'; }} onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--card-border)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)'; }}>Shopify</Link>
      </div>
    </div>
  );
}
