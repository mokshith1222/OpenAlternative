export default function CategoryPills({ activeCategory, setActiveCategory }) {
  const categories = ['All', 'Productivity', 'Design', 'Development', 'Marketing', 'Analytics', 'Communication', 'Project Management'];

  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActiveCategory(cat)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: activeCategory === cat ? 'var(--text-primary)' : 'var(--card-bg)',
            color: activeCategory === cat ? 'var(--bg-color)' : 'var(--text-muted)',
            border: '1px solid',
            borderColor: activeCategory === cat ? 'var(--text-primary)' : 'var(--card-border)',
            borderRadius: '100px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
