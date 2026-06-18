import { Link, useNavigate } from 'react-router-dom';
import { Code, MessageSquare, Search, Plus, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home and pass search query via state or URL params
      // Since Home.jsx handles search internally via state right now, 
      // a global search would either need context or redirect to a /search page.
      // For now, we will just navigate home.
      navigate('/');
      // In a real app, we'd pass ?q=searchQuery
    }
  };

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 100,
      padding: '1rem 0', 
      backgroundColor: 'var(--header-bg)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* Brand Logo */}
        <Link to="/" style={{ padding: '0.5rem', marginLeft: '-0.5rem', fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', borderRadius: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, var(--accent) 0%, #3b82f6 100%)', borderRadius: '6px' }}></div>
          Open<span style={{ color: 'var(--text-muted)' }}>Alternative</span>
        </Link>
        
        {/* Center Nav */}
        <nav style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="md:flex">
          <Link to="/" style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '500' }}>Discover</Link>
          <Link to="/comparisons" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Comparisons</Link>
          <Link to="/blog" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Blog</Link>
          <Link to="/categories" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Categories</Link>
          <Link to="/?sort=trending" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Trending</Link>
        </nav>

        {/* Right Nav & Actions */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ padding: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', transition: 'color 0.2s', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderRight: '1px solid var(--card-border)', paddingRight: '1.25rem', borderLeft: '1px solid var(--card-border)', paddingLeft: '1.25rem' }}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" style={{ padding: '0.5rem', color: 'var(--text-muted)', transition: 'color 0.2s', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.color = '#1DA1F2'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <MessageSquare size={20} />
            </a>
            <a href="https://github.com/mokshith1222/OpenAlternative" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ padding: '0.5rem', color: 'var(--text-muted)', transition: 'color 0.2s', borderRadius: '8px' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
              <Code size={20} />
            </a>
          </div>

          {/* CTA */}
          <Link 
            to="/submit"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              backgroundColor: 'var(--accent)', 
              color: '#ffffff', 
              padding: '0.6rem 1.2rem', 
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.2s',
              boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.39)'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.5)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(124, 58, 237, 0.39)';
            }}
          >
            <Plus size={16} /> Submit Tool
          </Link>
        </div>
      </div>
    </header>
  );
}
