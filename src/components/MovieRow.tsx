import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../data/movies';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  linkTo?: string;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, linkTo }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        {linkTo && (
          <Link to={linkTo} style={styles.viewAll}>
            查看全部
          </Link>
        )}
      </div>

      <div
        style={styles.rowWrapper}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            style={{
              ...styles.arrowBtn,
              ...styles.arrowLeft,
            }}
            aria-label="向左滚动"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        <div ref={scrollRef} style={styles.row}>
          {movies.map((movie) => (
            <div key={movie.id} style={styles.cardWrapper}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {isHovering && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            style={{
              ...styles.arrowBtn,
              ...styles.arrowRight,
            }}
            aria-label="向右滚动"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  section: {
    marginBottom: 'var(--spacing-2xl)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--spacing-md)',
    padding: '0 var(--spacing-lg)',
    maxWidth: '1400px',
    margin: '0 auto var(--spacing-md)',
  },
  title: {
    fontSize: '1.35rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    margin: 0,
  },
  viewAll: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s ease',
    whiteSpace: 'nowrap' as const,
  },
  rowWrapper: {
    position: 'relative' as const,
    maxWidth: '1400px',
    margin: '0 auto',
  },
  row: {
    display: 'flex',
    gap: 'var(--spacing-md)',
    overflowX: 'auto',
    scrollBehavior: 'smooth' as const,
    scrollSnapType: 'x mandatory',
    padding: 'var(--spacing-sm) var(--spacing-lg) var(--spacing-md)',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none' as const,
  },
  cardWrapper: {
    flex: '0 0 auto',
    width: '180px',
    scrollSnapAlign: 'start' as const,
  },
  arrowBtn: {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: '44px',
    height: '44px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'var(--text-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    boxShadow: 'var(--shadow-lg)',
  },
  arrowLeft: {
    left: '8px',
  },
  arrowRight: {
    right: '8px',
  },
};

export default MovieRow;
