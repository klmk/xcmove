import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { categories, categoryMap, getMoviesByCategory } from '../data/movies';
import MovieCard from '../components/MovieCard';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeCategory, setActiveCategory] = useState(id || 'all');
  const filteredMovies = getMoviesByCategory(activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (id) {
      setActiveCategory(id);
    }
  }, [id]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const currentCategoryName =
    categoryMap[activeCategory] || '全部';

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>{currentCategoryName}</h1>
          <p style={styles.subtitle}>
            共 {filteredMovies.length} 部影片
          </p>
        </div>

        <div style={styles.filterRow}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                ...styles.filterPill,
                backgroundColor:
                  activeCategory === cat.id
                    ? 'var(--accent-primary)'
                    : 'var(--bg-card)',
                color:
                  activeCategory === cat.id
                    ? 'var(--text-primary)'
                    : 'var(--text-secondary)',
                borderColor:
                  activeCategory === cat.id
                    ? 'var(--accent-primary)'
                    : 'rgba(255, 255, 255, 0.06)',
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div style={styles.grid}>
          {filteredMovies.map((movie) => (
            <div key={movie.id} style={styles.cardWrapper}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div style={styles.emptyState}>
            <h3 style={styles.emptyTitle}>暂无影片</h3>
            <p style={styles.emptyText}>
              该分类下暂无影片，请选择其他分类。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    paddingTop: 'var(--spacing-xl)',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 var(--spacing-lg)',
  },
  header: {
    marginBottom: 'var(--spacing-xl)',
  },
  title: {
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    margin: '0 0 var(--spacing-sm)',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    margin: 0,
  },
  filterRow: {
    display: 'flex',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-xl)',
    overflowX: 'auto',
    paddingBottom: 'var(--spacing-sm)',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none' as const,
  },
  filterPill: {
    padding: '8px 20px',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    border: '1px solid',
    transition: 'all 0.2s ease',
    flexShrink: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 'var(--spacing-md)',
  },
  cardWrapper: {},
  emptyState: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px var(--spacing-xl)',
    textAlign: 'center' as const,
  },
  emptyTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 'var(--spacing-sm)',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
};

export default CategoryPage;
