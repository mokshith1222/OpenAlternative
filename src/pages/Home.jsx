import { useState, useMemo, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useSearchParams, useNavigate } from 'react-router-dom';
import HeroSearch from '../components/HeroSearch';
import CategoryPills from '../components/CategoryPills';
import NewsletterForm from '../components/NewsletterForm';
import FeaturedAlternative from '../components/FeaturedAlternative';
import ToolCard from '../components/ToolCard';
import { getBroadCategory } from '../utils/categoryMapping';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sortParam = searchParams.get('sort');
  const categoryParam = searchParams.get('category');

  const [activeCategory, setActiveCategory] = useState(categoryParam || 'All');
  const [toolsData, setToolsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(['All']);
  const [displayCount, setDisplayCount] = useState(50);

  // Sync category param with state if it changes
  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    async function fetchTools() {
      let allData = [];
      let page = 0;
      let hasMore = true;
      
      // Supabase has a default 1000 row limit. We must paginate to fetch all 1500+ tools.
      while (hasMore) {
        const { data } = await supabase.from('tools').select('*').range(page * 1000, (page + 1) * 1000 - 1);
        if (data && data.length > 0) {
          allData = [...allData, ...data];
          if (data.length < 1000) hasMore = false;
          else page++;
        } else {
          hasMore = false;
        }
      }

      if (allData.length > 0) {
        // Map granular categories to broad categories on the fly
        const mappedData = allData.map(t => ({ 
          ...t, 
          broadCategory: getBroadCategory(t.category) 
        }));
        setToolsData(mappedData);
        
        // Compute unique broad categories
        const uniqueCategories = Array.from(new Set(mappedData.map(t => t.broadCategory))).sort();
        setCategories(['All', ...uniqueCategories]);
      }
      setLoading(false);
    }
    fetchTools();
  }, []);

  const filteredTools = useMemo(() => {
    let result = toolsData.filter(tool => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = (tool.name?.toLowerCase() || '').includes(searchLower) || 
                            (tool.replaces?.toLowerCase() || '').includes(searchLower) ||
                            (tool.description?.toLowerCase() || '').includes(searchLower);
      let matchesCategory = activeCategory === 'All' || tool.broadCategory === activeCategory;
      if (sortParam === 'trending') {
        matchesCategory = true; // Show all categories if trending
      }
      return matchesSearch && matchesCategory;
    });

    if (sortParam === 'trending') {
      result.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    }

    return result;
  }, [toolsData, searchQuery, activeCategory, sortParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // 1. Check if it exactly matches a proprietary software name
    const exactCategoryMatch = toolsData.find(t => t.replaces && t.replaces.toLowerCase() === searchQuery.trim().toLowerCase());
    if (exactCategoryMatch) {
      navigate(`/alternative/${searchQuery.trim().toLowerCase().replace(/\s+/g, '-')}`);
      return;
    }

    // 2. Check if it exactly matches an open source tool name
    const exactToolMatch = toolsData.find(t => t.name.toLowerCase() === searchQuery.trim().toLowerCase());
    if (exactToolMatch) {
      navigate(`/tool/${exactToolMatch.id}`);
      return;
    }

    // 3. Otherwise navigate to the top result in the filtered grid
    if (filteredTools.length > 0) {
      navigate(`/tool/${filteredTools[0].id}`);
    }
  };

  return (
    <div className="container">
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSubmit={handleSearchSubmit} />
      
      {!searchQuery && activeCategory === 'All' && sortParam !== 'trending' && (
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

      {/* SEO & AdSense Content Block */}
      {!searchQuery && activeCategory === 'All' && sortParam !== 'trending' && (
        <div className="card-premium" style={{ padding: '2.5rem', marginBottom: '4rem', backgroundColor: 'var(--card-bg)' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Why Use Open Source Software?</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            OpenAlternative is the internet's most comprehensive directory for discovering open-source alternatives to proprietary SaaS. As software subscription costs continue to rise and data privacy concerns grow, switching to self-hostable tools has never been more important. Open-source software gives you total ownership over your data, eliminates vendor lock-in, and allows you to customize the codebase to fit your exact business needs.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8' }}>
            Whether you are looking for an open-source CRM, a privacy-focused analytics platform, or a self-hosted project management tool, our community-curated database maps thousands of commercial products to their free, open-source counterparts. Start taking back control of your software stack today.
          </p>
        </div>
      )}

      {!searchQuery && activeCategory === 'All' && sortParam !== 'trending' && toolsData.length > 0 && toolsData.find(t => t.id === 'appflowy') && (
        <FeaturedAlternative replaces="Notion" tool={toolsData.find(t => t.id === 'appflowy')} />
      )}

      <div style={{ marginBottom: '2rem' }}>
        {sortParam !== 'trending' && (
          <>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Browse by Category</h2>
            <CategoryPills categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
          </>
        )}
        
        {sortParam === 'trending' && (
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Trending Alternatives</h2>
            <span style={{ color: 'var(--accent)', backgroundColor: 'rgba(124, 58, 237, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '600' }}>Most Upvoted</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {loading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="card-premium skeleton" style={{ height: '300px', width: '100%' }}></div>
          ))
        ) : filteredTools.length > 0 ? (
          filteredTools.slice(0, displayCount).map(tool => (
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

      {filteredTools.length > displayCount && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
          <button 
            onClick={() => setDisplayCount(prev => prev + 50)}
            style={{ 
              backgroundColor: 'rgba(124, 58, 237, 0.1)', 
              color: 'var(--accent)', 
              border: '1px solid var(--accent)', 
              borderRadius: '9999px', 
              padding: '0.75rem 2rem', 
              fontSize: '1rem', 
              fontWeight: '600', 
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = 'var(--accent)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = 'rgba(124, 58, 237, 0.1)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
          >
            Load More Tools ({filteredTools.length - displayCount} remaining)
          </button>
        </div>
      )}

      {!searchQuery && activeCategory === 'All' && (
        <div style={{ marginTop: '6rem', marginBottom: '2rem' }}>
          <NewsletterForm />
        </div>
      )}
    </div>
  );
}
