import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--card-border)', marginTop: '4rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: '800' }}>OpenAlternative</h3>
          <p>Discover free, self-hostable and open-source<br />replacements for popular SaaS products.</p>
        </div>
        <div style={{ display: 'flex', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: 'var(--text-primary)' }}>Top Alternatives</h4>
            <Link to="/alternative/notion" style={{ transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Notion Alternatives</Link>
            <Link to="/alternative/slack" style={{ transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Slack Alternatives</Link>
            <Link to="/alternative/photoshop" style={{ transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Photoshop Alternatives</Link>
            <Link to="/alternative/jira" style={{ transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--accent)'} onMouseOut={e => e.target.style.color = 'var(--text-muted)'}>Jira Alternatives</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
