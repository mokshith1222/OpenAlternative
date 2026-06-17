import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogs } from '../data/blogs';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

export default function BlogPostPage() {
  const { slug } = useParams();
  const blog = blogs.find(b => b.id === slug);

  if (!blog) {
    return (
      <div className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Article not found</h1>
        <Link to="/blog" style={{ color: 'var(--accent)' }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <Helmet>
        <title>{blog.title} - OpenAlternative Blog</title>
        <meta name="description" content={blog.excerpt} />
      </Helmet>

      <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '3rem', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
        <ArrowLeft size={16} /> Back to all articles
      </Link>

      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
          {blog.title}
        </h1>
        
        <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-muted)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', padding: '1.5rem 0' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={18} color="var(--accent)" /> {blog.date}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="var(--accent)" /> {blog.readTime}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} color="var(--accent)" /> {blog.author}
          </span>
        </div>
      </div>

      <div className="readme-container" style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '1.15rem' }}>
        <ReactMarkdown 
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({node, ...props}) => <h2 style={{ fontSize: '2.2rem', marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }} {...props} />,
            h2: ({node, ...props}) => <h2 style={{ fontSize: '1.8rem', marginTop: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }} {...props} />,
            h3: ({node, ...props}) => <h3 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }} {...props} />,
            p: ({node, ...props}) => <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }} {...props} />,
            ul: ({node, ...props}) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }} {...props} />,
            li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
            strong: ({node, ...props}) => <strong style={{ color: 'var(--text-primary)', fontWeight: '600' }} {...props} />
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>

      <div className="card-premium" style={{ marginTop: '6rem', padding: '3rem', textAlign: 'center', backgroundColor: 'rgba(124, 58, 237, 0.05)', borderColor: 'rgba(124, 58, 237, 0.2)' }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Find your open source stack</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>Search our directory of 1,500+ self-hostable alternatives to proprietary software.</p>
        <Link to="/" style={{ backgroundColor: 'var(--accent)', color: 'white', padding: '1rem 2rem', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', display: 'inline-block' }}>
          Explore Directory
        </Link>
      </div>
    </div>
  );
}
