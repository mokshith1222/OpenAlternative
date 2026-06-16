import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

export default function Header() {
  return (
    <header style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--card-border)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          Open<span style={{ color: 'var(--accent)' }}>Alternative</span>
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <a href="mailto:submit@openalternative.example.com?subject=New%20Tool%20Submission" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }} className="hover:text-white transition-colors">Submit Tool</a>
          <a href="https://github.com/openalternative" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hover:text-white transition-colors">
            <Star size={20} />
            <span style={{ fontSize: '0.9rem' }}>Star on GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
