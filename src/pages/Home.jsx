import { useState, useMemo } from 'react';
import { toolsData } from '../data/tools';
import HeroSearch from '../components/HeroSearch';
import CategoryPills from '../components/CategoryPills';
import FeaturedAlternative from '../components/FeaturedAlternative';
import ToolCard from '../components/ToolCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = useMemo(() => {
    return toolsData.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tool.replaces.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="container">
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {!searchQuery && activeCategory === 'All' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginBottom: '4rem', padding: '2rem 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>15+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Open Source Tools</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>10+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Categories</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>100%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Free & Community Driven</div>
          </div>
        </div>
      )}

      {!searchQuery && activeCategory === 'All' && (
        <FeaturedAlternative replaces="Notion" tool={toolsData.find(t => t.id === 'appflowy')} />
      )}

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Browse by Category</h2>
        <CategoryPills activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredTools.length > 0 ? (
          filteredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))
        ) : (
          <div style={{ color: 'var(--text-muted)', gridColumn: '1 / -1', padding: '4rem 0', backgroundColor: 'var(--card-bg)', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--card-border)' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.2rem' }}>No exact match found.</h3>
            <p style={{ marginBottom: '1rem' }}>Try searching for:</p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button onClick={() => setSearchQuery('Notion')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}>• Notion</button>
              <button onClick={() => setSearchQuery('Jira')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}>• Jira</button>
              <button onClick={() => setSearchQuery('Slack')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}>• Slack</button>
              <button onClick={() => setSearchQuery('Photoshop')} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}>• Photoshop</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
