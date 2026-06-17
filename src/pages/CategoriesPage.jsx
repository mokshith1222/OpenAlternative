import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Database, Server, Shield, Code, LineChart, Megaphone, Users, MessageSquare, Briefcase, Paintbrush, Box } from 'lucide-react';

const categoryData = [
  { name: 'Database & Backend', icon: <Database size={32} />, desc: 'PostgreSQL, NoSQL, and backend platforms.' },
  { name: 'DevOps & Infrastructure', icon: <Server size={32} />, desc: 'CI/CD, monitoring, and deployment.' },
  { name: 'Security & Identity', icon: <Shield size={32} />, desc: 'Auth, SSO, and security tools.' },
  { name: 'Development & APIs', icon: <Code size={32} />, desc: 'API gateways and developer tools.' },
  { name: 'Analytics & Data', icon: <LineChart size={32} />, desc: 'BI, web analytics, and data pipelines.' },
  { name: 'Marketing & Commerce', icon: <Megaphone size={32} />, desc: 'Email marketing, CRM, and storefronts.' },
  { name: 'Productivity & Collab', icon: <Users size={32} />, desc: 'Project management and wikis.' },
  { name: 'Communication & Media', icon: <MessageSquare size={32} />, desc: 'Chat, video calls, and file sharing.' },
  { name: 'Support & Operations', icon: <Briefcase size={32} />, desc: 'Helpdesk and internal operations.' },
  { name: 'Design & AI', icon: <Paintbrush size={32} />, desc: 'Design tools and AI models.' },
  { name: 'Other', icon: <Box size={32} />, desc: 'Miscellaneous applications.' }
];

export default function CategoriesPage() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <Helmet>
        <title>Software Categories | Open Source Directory</title>
        <meta name="description" content="Browse open-source software by category. Find the best self-hostable CRM, analytics, DevOps, and project management tools." />
      </Helmet>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Browse Categories</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Find the perfect open-source alternative for your specific needs.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {categoryData.map(cat => (
          <Link 
            key={cat.name} 
            to={`/?category=${encodeURIComponent(cat.name)}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="card-premium" style={{ 
              padding: '2rem', 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              gap: '1rem',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.15)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{ color: 'var(--accent)', backgroundColor: 'rgba(124, 58, 237, 0.1)', padding: '1rem', borderRadius: '50%' }}>
                {cat.icon}
              </div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{cat.name}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
