import { Link } from 'react-router-dom';
import { Code, MessageSquare, Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    const { error } = await supabase.from('subscribers').insert([{ email }]);
    
    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <footer style={{ 
      padding: '5rem 0 2rem 0', 
      borderTop: '1px solid rgba(255,255,255,0.05)', 
      marginTop: '5rem',
      backgroundColor: '#050505',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow effect */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent)' }}></div>

      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '4rem', 
          marginBottom: '4rem' 
        }}>
          
          {/* Column 1: Brand & Newsletter */}
          <div style={{ gridColumn: '1 / -1', '@media (min-width: 1024px)': { gridColumn: 'span 2' }, maxWidth: '400px' }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: '24px', height: '24px', background: 'linear-gradient(135deg, var(--accent) 0%, #3b82f6 100%)', borderRadius: '4px' }}></div>
              Open<span style={{ color: 'var(--text-muted)' }}>Alternative</span>
            </Link>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Discover the best free, self-hostable and open-source replacements for popular SaaS products. Take back control of your data.
            </p>
            
            <div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>Subscribe to our Newsletter</h4>
              {status === 'success' ? (
                <p style={{ color: '#10b981', fontSize: '0.9rem' }}>Thanks for subscribing!</p>
              ) : (
                <form style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }} onSubmit={handleSubscribe}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <div style={{ position: 'relative', flexGrow: 1 }}>
                      <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email" 
                        style={{ 
                          width: '100%', 
                          padding: '0.75rem 1rem 0.75rem 2.5rem', 
                          backgroundColor: 'rgba(255,255,255,0.03)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }} 
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={status === 'loading'}
                      style={{ 
                        backgroundColor: 'var(--accent)', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '8px', 
                        padding: '0 1rem', 
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        opacity: status === 'loading' ? 0.7 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                      onMouseOut={e => e.currentTarget.style.opacity = '1'}
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                  {status === 'error' && <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.5rem' }}>Error saving email. Table might not exist.</p>}
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Top Categories */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem' }}>Categories</h4>
            {['Database & Backend', 'DevOps & Infrastructure', 'Security & Identity', 'Development & APIs', 'Analytics & Data'].map(cat => (
              <a href="#" key={cat} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>
                {cat}
              </a>
            ))}
          </div>

          {/* Column 3: Top Replacements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem' }}>Top Replacements</h4>
            {['Notion', 'Slack', 'Photoshop', 'Jira', 'Airtable'].map(saas => (
              <Link to={`/alternative/${saas.toLowerCase()}`} key={saas} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color = 'var(--accent)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>
                {saas} Alternatives
              </Link>
            ))}
          </div>

          {/* Column 4: Resources */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem' }}>Resources</h4>
            <Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>About Us</Link>
            <Link to="/submit" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Submit a Tool</Link>
            <Link to="/privacy" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'var(--text-muted)', fontSize: '0.9rem', transition: 'color 0.2s', textDecoration: 'none' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Terms of Service</Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          paddingTop: '2rem', 
          borderTop: '1px solid rgba(255,255,255,0.05)',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}>
          <div>
            &copy; {new Date().getFullYear()} OpenAlternative. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}><MessageSquare size={18} /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--text-primary)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}><Code size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
