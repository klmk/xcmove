import React, { useState, useEffect, useRef } from 'react';
import { Search, Film } from 'lucide-react';
import { searchMovies } from '../data/movies';
import MovieCard from '../components/MovieCard';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(searchMovies(''));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query.trim()) {
        setResults(searchMovies(query));
      } else {
        setResults([]);
      }
    }, 200);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.searchSection}>
          <div style={styles.inputWrapper}>
            <Search
              size={20}
              style={{
                color: 'var(--text-secondary)',
                flexShrink: 0,
              }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索电影、导演、演员..."
              style={styles.input}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                style={styles.clearBtn}
              >
                清除
              </button>
            )}
          </div>
        </div>

        {query.trim() && results.length > 0 && (
          <p style={styles.resultCount}>
            找到 <span style={styles.countHighlight}>{results.length}</span> 个结果
          </p>
        )}

        {results.length > 0 && (
          <div style={styles.grid}>
            {results.map((movie) => (
              <div key={movie.id} style={styles.cardWrapper}>
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}

        {query.trim() && results.length === 0 && (
          <div style={styles.emptyState}>
            <Film size={64} style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
            <h3 style={styles.emptyTitle}>未找到结果</h3>
            <p style={styles.emptyText}>
              没有找到与 "{query}" 相关的影片，请尝试其他关键词。
            </p>
          </div>
        )}

        {!query.trim() && (
          <div style={styles.emptyState}>
            <Search size={64} style={{ color: 'var(--text-secondary)', opacity: 0.3 }} />
            <h3 style={styles.emptyTitle}>搜索影片</h3>
            <p style={styles.emptyText}>
              输入电影名称、导演或演员名称来搜索影片。
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
  searchSection: {
    marginBottom: 'var(--spacing-xl)',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    transition: 'border-color 0.2s ease',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: '1.05rem',
    color: 'var(--text-primary)',
    padding: 0,
  },
  clearBtn: {
    padding: '4px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--text-secondary)',
    fontSize: '0.8rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  resultCount: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    marginBottom: 'var(--spacing-lg)',
  },
  countHighlight: {
    color: 'var(--accent-primary)',
    fontWeight: 600,
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
    marginTop: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-sm)',
  },
  emptyText: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    maxWidth: '400px',
    lineHeight: 1.6,
  },
};

export default SearchPage;
