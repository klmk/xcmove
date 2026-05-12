import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Star, Clock } from 'lucide-react';
import { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} style={styles.card}>
      <div style={styles.posterWrapper}>
        <img
          src={movie.poster}
          alt={movie.title}
          style={styles.poster}
          loading="lazy"
        />
        <div style={styles.gradientOverlay} />
        <div style={styles.hoverOverlay}>
          <div style={styles.playBtn}>
            <Play size={24} fill="white" />
          </div>
        </div>
        <div style={styles.ratingBadge}>
          <Star size={12} fill="var(--gold)" style={{ color: 'var(--gold)' }} />
          <span style={styles.ratingText}>{movie.rating}</span>
        </div>
      </div>
      <div style={styles.info}>
        <h3 style={styles.title}>{movie.title}</h3>
        <div style={styles.meta}>
          <span style={styles.year}>{movie.year}</span>
          <span style={styles.dot} />
          <Clock size={12} style={{ color: 'var(--text-secondary)' }} />
          <span style={styles.duration}>{movie.duration}</span>
        </div>
      </div>
    </Link>
  );
};

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'var(--bg-card)',
  },
  posterWrapper: {
    position: 'relative' as const,
    width: '100%',
    paddingTop: '150%',
    overflow: 'hidden',
  },
  poster: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    transition: 'transform 0.4s ease',
  },
  gradientOverlay: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    background:
      'linear-gradient(to top, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.4) 50%, transparent 100%)',
    pointerEvents: 'none' as const,
  },
  hoverOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  playBtn: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--accent-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-glow)',
    transform: 'scale(0.8)',
    transition: 'transform 0.3s ease',
  },
  ratingBadge: {
    position: 'absolute' as const,
    top: 'var(--spacing-sm)',
    right: 'var(--spacing-sm)',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    padding: '3px 8px',
    borderRadius: 'var(--radius-full)',
  },
  ratingText: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--gold)',
  },
  info: {
    padding: 'var(--spacing-sm) var(--spacing-sm) var(--spacing-md)',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '4px',
  },
  year: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  dot: {
    width: '3px',
    height: '3px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--text-secondary)',
  },
  duration: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
};

export default MovieCard;
