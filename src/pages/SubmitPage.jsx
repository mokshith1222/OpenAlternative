import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { CheckCircle } from 'lucide-react';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Development & APIs',
    replaces: '',
    description: '',
    githubRepo: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Format the ID
    const id = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const { error: insertError } = await supabase.from('tools').insert([{
      id,
      name: formData.name,
      category: formData.category,
      replaces: formData.replaces,
      description: formData.description,
      githubRepo: formData.githubRepo,
      isSelfHostable: true
    }]);

    setLoading(false);

    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess(true);
      setFormData({ name: '', category: 'Development & APIs', replaces: '', description: '', githubRepo: '' });
    }
  };

  if (success) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center', maxWidth: '600px' }}>
        <CheckCircle size={64} color="var(--accent)" style={{ margin: '0 auto 2rem auto' }} />
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Tool Submitted!</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>
          Thank you for contributing to OpenAlternative. Your tool is now live in the directory!
        </p>
        <button 
          onClick={() => setSuccess(false)}
          style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)', border: '1px solid var(--card-border)', padding: '0.75rem 2rem', borderRadius: '8px', cursor: 'pointer' }}
        >
          Submit Another Tool
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Submit a Tool</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Know of a great open-source alternative? Add it to the directory.
        </p>
      </div>

      <div className="card-premium" style={{ padding: '3rem', backgroundColor: 'var(--card-bg)' }}>
        {error && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '8px', marginBottom: '2rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            Error: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Open Source Tool Name *</label>
            <input 
              required
              type="text" 
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Supabase"
              style={{ width: '100%', padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'white', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Proprietary SaaS it Replaces *</label>
              <input 
                required
                type="text" 
                value={formData.replaces}
                onChange={e => setFormData({...formData, replaces: e.target.value})}
                placeholder="e.g. Firebase"
                style={{ width: '100%', padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'white', outline: 'none' }} 
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Category *</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                style={{ width: '100%', padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'white', outline: 'none', appearance: 'none' }}
              >
                <option value="Analytics & Data">Analytics & Data</option>
                <option value="Database & Backend">Database & Backend</option>
                <option value="Security & Identity">Security & Identity</option>
                <option value="DevOps & Infrastructure">DevOps & Infrastructure</option>
                <option value="Development & APIs">Development & APIs</option>
                <option value="Marketing & Commerce">Marketing & Commerce</option>
                <option value="Productivity & Collab">Productivity & Collab</option>
                <option value="Communication & Media">Communication & Media</option>
                <option value="Support & Operations">Support & Operations</option>
                <option value="Design & AI">Design & AI</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>GitHub Repository URL (Optional)</label>
            <input 
              type="url" 
              value={formData.githubRepo ? `https://github.com/${formData.githubRepo}` : ''}
              onChange={e => {
                const val = e.target.value;
                if (val.includes('github.com/')) {
                  setFormData({...formData, githubRepo: val.split('github.com/')[1]});
                } else {
                  setFormData({...formData, githubRepo: val});
                }
              }}
              placeholder="https://github.com/supabase/supabase"
              style={{ width: '100%', padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'white', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Description *</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="What does this tool do?"
              style={{ width: '100%', padding: '0.85rem', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'vertical' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: 'var(--accent)', 
              color: 'white', 
              border: 'none', 
              padding: '1rem', 
              borderRadius: '8px', 
              fontSize: '1rem', 
              fontWeight: '600', 
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '1rem'
            }}
          >
            {loading ? 'Submitting...' : 'Submit to Directory'}
          </button>
        </form>
      </div>
    </div>
  );
}
