import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { movies } from '../data/movies';

const featuredMovies = movies.slice(0, 5);

const HeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [isTransitioning]
  );

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % featuredMovies.length);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext]);

  const movie = featuredMovies[currentIndex];

  return (
    <div style={styles.wrapper}>
      <div
        style={{
          ...styles.banner,
          backgroundImage: `url(${movie.backdrop})`,
        }}
      >
        <div style={styles.overlay} />
        <div style={styles.content}>
          <div style={styles.tagRow}>
            <span style={styles.tag}>精选推荐</span>
            <span style={styles.rating}>
              {movie.rating} 分
            </span>
          </div>
          <h1 style={styles.title}>{movie.title}</h1>
          {movie.originalTitle && (
            <p style={styles.originalTitle}>{movie.originalTitle}</p>
          )}
          <div style={styles.metaRow}>
            <span style={styles.metaItem}>{movie.year}</span>
            <span style={styles.metaDivider}>|</span>
            <span style={styles.metaItem}>{movie.duration}</span>
            <span style={styles.metaDivider}>|</span>
            <span style={styles.metaItem}>{movie.genres.join(' / ')}</span>
          </div>
          <p style={styles.description}>{movie.description}</p>
          <div style={styles.buttons}>
            <Link
              to={`/movie/${movie.id}`}
              style={styles.playButton}
            >
              <Play size={20} fill="white" />
              <span>立即播放</span>
            </Link>
            <Link
              to={`/movie/${movie.id}`}
              style={styles.infoButton}
            >
              <Info size={20} />
              <span>详细信息</span>
            </Link>
          </div>
        </div>
      </div>

      <div style={styles.dots}>
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...styles.dot,
              backgroundColor:
                index === currentIndex
                  ? 'var(--accent-primary)'
                  : 'rgba(255, 255, 255, 0.3)',
              width: index === currentIndex ? '24px' : '8px',
            }}
            aria-label={`切换到第 ${index + 1} 张`}
          />
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    position: 'relative' as const,
    width: '100%',
    marginBottom: 'var(--spacing-xl)',
  },
  banner: {
    position: 'relative' as const,
    width: '100%',
    height: '85vh',
    minHeight: '500px',
    maxHeight: '800px',
    backgroundSize: 'cover' as const,
    backgroundPosition: 'center top' as const,
    backgroundRepeat: 'no-repeat' as const,
    display: 'flex',
    alignItems: 'flex-end',
  },
  overlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(to right, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.6) 40%, rgba(10, 10, 15, 0.2) 70%, rgba(10, 10, 15, 0.3) 100%), linear-gradient(to top, rgba(10, 10, 15, 1) 0%, rgba(10, 10, 15, 0) 40%)',
  },
  content: {
    position: 'relative' as const,
    zIndex: 2,
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 var(--spacing-lg) var(--spacing-2xl)',
    width: '100%',
  },
  tagRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-md)',
  },
  tag: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: 'var(--accent-primary)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
  },
  rating: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    color: 'var(--gold)',
    fontSize: '0.9rem',
    fontWeight: 700,
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    margin: '0 0 var(--spacing-sm)',
    lineHeight: 1.1,
    letterSpacing: '-0.5px',
  },
  originalTitle: {
    fontSize: '1rem',
    color: 'var(--text-secondary)',
    margin: '0 0 var(--spacing-md)',
    fontStyle: 'italic',
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-md)',
    flexWrap: 'wrap' as const,
  },
  metaItem: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  metaDivider: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: '0.85rem',
  },
  description: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    maxWidth: '600px',
    lineHeight: 1.6,
    margin: '0 0 var(--spacing-xl)',
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md)',
  },
  playButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: '12px 28px',
    backgroundColor: 'var(--accent-primary)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    boxShadow: 'var(--shadow-glow)',
  },
  infoButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: '12px 28px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
  },
  dots: {
    position: 'absolute' as const,
    bottom: 'var(--spacing-xl)',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    zIndex: 10,
  },
  dot: {
    height: '8px',
    borderRadius: 'var(--radius-full)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default HeroBanner;
