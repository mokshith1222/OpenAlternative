import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Trash2, ShieldCheck, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Super simple hardcoded auth for MVP
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect passcode');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTools();
    }
  }, [isAuthenticated]);

  async function fetchTools() {
    setLoading(true);
    let allData = [];
    let page = 0;
    let hasMore = true;
    
    while (hasMore) {
      const { data } = await supabase.from('tools').select('*').range(page * 1000, (page + 1) * 1000 - 1).order('name');
      if (data && data.length > 0) {
        allData = [...allData, ...data];
        if (data.length < 1000) hasMore = false;
        else page++;
      } else {
        hasMore = false;
      }
    }
    setTools(allData);
    setLoading(false);
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tool? This cannot be undone.')) {
      const { error } = await supabase.from('tools').delete().eq('id', id);
      if (error) {
        alert('Failed to delete: ' + error.message);
      } else {
        setTools(tools.filter(t => t.id !== id));
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '6rem 0', maxWidth: '400px' }}>
        <Helmet><title>Admin Login - OpenAlternative</title></Helmet>
        <div className="card-premium" style={{ padding: '3rem', textAlign: 'center' }}>
          <Lock size={48} color="var(--accent)" style={{ margin: '0 auto 1.5rem auto' }} />
          <h1 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Admin Access</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Enter passcode (admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--card-border)', backgroundColor: 'rgba(0,0,0,0.1)', color: 'var(--text-primary)', outline: 'none' }}
            />
            <button type="submit" style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', padding: '1rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <Helmet><title>Admin Dashboard - OpenAlternative</title></Helmet>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ShieldCheck size={36} color="var(--accent)" />
          <h1 style={{ fontSize: '2.5rem' }}>Content Management</h1>
        </div>
        <div style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: 'var(--accent)', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: '600' }}>
          {tools.length} Tools Indexed
        </div>
      </div>

      <div className="card-premium" style={{ overflowX: 'auto', backgroundColor: 'var(--card-bg)' }}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading database...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--card-border)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Replaces</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Category</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-muted)' }}>Upvotes</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tools.map(tool => (
                <tr key={tool.id} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background-color 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{tool.name}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>{tool.replaces}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.85rem' }}>
                      {tool.category}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--accent)', fontWeight: '600' }}>{tool.upvotes || 0}</td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(tool.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '4px', transition: 'background-color 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
                      title="Delete Tool"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
