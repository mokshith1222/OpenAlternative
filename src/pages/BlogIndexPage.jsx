import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogs } from '../data/blogs';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogIndexPage() {
  return (
    <div className="container" style={{ padding: '6rem 0' }}>
      <Helmet>
        <title>Blog & Open Source Insights - OpenAlternative</title>
        <meta name="description" content="Read our latest articles on open-source software, self-hosting, and data privacy." />
      </Helmet>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          The Open Source Blog
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Insights on data privacy, self-hosting, and migrating away from proprietary SaaS.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {blogs.map(blog => (
          <Link 
            key={blog.id} 
            to={`/blog/${blog.id}`}
            className="card-premium"
            style={{ 
              padding: '2.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              textDecoration: 'none',
              height: '100%'
            }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} /> {blog.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={16} /> {blog.readTime}
              </span>
            </div>
            
            <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {blog.title}
            </h2>
            
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1 }}>
              {blog.excerpt}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontWeight: '600', marginTop: '1rem' }}>
              Read Article <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
