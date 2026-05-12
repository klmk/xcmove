import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Play, ArrowLeft, Star, Clock, Film } from 'lucide-react';
import { getMovieById, getRelatedMovies } from '../data/movies';
import MovieCard from '../components/MovieCard';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = parseInt(id || '0', 10);
  const movie = getMovieById(movieId);
  const relatedMovies = getRelatedMovies(movieId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  if (!movie) {
    return (
      <div style={styles.notFound}>
        <h2 style={styles.notFoundTitle}>未找到该影片</h2>
        <p style={styles.notFoundText}>
          您访问的影片不存在或已被移除。
        </p>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>返回首页</span>
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Backdrop Header */}
      <div style={styles.backdropSection}>
        <div
          style={{
            ...styles.backdropImage,
            backgroundImage: `url(${movie.backdrop})`,
          }}
        />
        <div style={styles.backdropOverlay} />
        <div style={styles.backdropContent}>
          <button
            onClick={() => navigate(-1)}
            style={styles.backButton}
          >
            <ArrowLeft size={20} />
            <span>返回</span>
          </button>

          <div style={styles.heroContent}>
            <div style={styles.posterSmall}>
              <img
                src={movie.poster}
                alt={movie.title}
                style={styles.posterImg}
              />
            </div>

            <div style={styles.heroInfo}>
              <div style={styles.genreTags}>
                {movie.genres.map((genre) => (
                  <span key={genre} style={styles.genreTag}>
                    {genre}
                  </span>
                ))}
              </div>
              <h1 style={styles.movieTitle}>{movie.title}</h1>
              {movie.originalTitle && (
                <p style={styles.originalTitle}>{movie.originalTitle}</p>
              )}

              <div style={styles.metaRow}>
                <div style={styles.metaItem}>
                  <Star
                    size={16}
                    fill="var(--gold)"
                    style={{ color: 'var(--gold)' }}
                  />
                  <span style={styles.ratingValue}>{movie.rating}</span>
                </div>
                <div style={styles.metaItem}>
                  <Clock size={16} style={{ color: 'var(--text-secondary)' }} />
                  <span>{movie.duration}</span>
                </div>
                <div style={styles.metaItem}>
                  <Film size={16} style={{ color: 'var(--text-secondary)' }} />
                  <span>{movie.year}</span>
                </div>
              </div>

              <button
                style={styles.playButton}
                onClick={() => navigate(`/play/${movie.id}`)}
              >
                <Play size={22} fill="white" />
                <span>立即播放</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div style={styles.detailsSection}>
        <div style={styles.container}>
          <div style={styles.infoGrid}>
            <div style={styles.infoBlock}>
              <h3 style={styles.infoLabel}>导演</h3>
              <p style={styles.infoValue}>{movie.director}</p>
            </div>
            <div style={styles.infoBlock}>
              <h3 style={styles.infoLabel}>主演</h3>
              <p style={styles.infoValue}>{movie.cast.join('、')}</p>
            </div>
            <div style={styles.infoBlock}>
              <h3 style={styles.infoLabel}>类型</h3>
              <p style={styles.infoValue}>{movie.genres.join(' / ')}</p>
            </div>
            <div style={styles.infoBlock}>
              <h3 style={styles.infoLabel}>年份</h3>
              <p style={styles.infoValue}>{movie.year}</p>
            </div>
          </div>

          <div style={styles.descriptionSection}>
            <h3 style={styles.sectionTitle}>剧情简介</h3>
            <p style={styles.description}>{movie.description}</p>
          </div>
        </div>
      </div>

      {/* Related Movies */}
      {relatedMovies.length > 0 && (
        <div style={styles.relatedSection}>
          <div style={styles.container}>
            <h2 style={styles.relatedTitle}>相关推荐</h2>
            <div style={styles.relatedGrid}>
              {relatedMovies.map((m) => (
                <div key={m.id} style={styles.relatedCardWrapper}>
                  <MovieCard movie={m} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-xl)',
  },
  notFoundTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
  },
  notFoundText: {
    color: 'var(--text-secondary)',
    fontSize: '1rem',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: '10px 24px',
    backgroundColor: 'var(--accent-primary)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius-md)',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: 'var(--spacing-md)',
  },
  backdropSection: {
    position: 'relative' as const,
    width: '100%',
    height: '70vh',
    minHeight: '450px',
    maxHeight: '700px',
  },
  backdropImage: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover' as const,
    backgroundPosition: 'center' as const,
  },
  backdropOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(to top, var(--bg-primary) 0%, rgba(10, 10, 15, 0.7) 40%, rgba(10, 10, 15, 0.4) 100%)',
  },
  backdropContent: {
    position: 'relative' as const,
    zIndex: 2,
    maxWidth: '1400px',
    margin: '0 auto',
    padding: 'var(--spacing-xl) var(--spacing-lg)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'flex-end',
  },
  backButton: {
    position: 'absolute' as const,
    top: 'var(--spacing-xl)',
    left: 'var(--spacing-lg)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'background-color 0.2s ease',
  },
  heroContent: {
    display: 'flex',
    gap: 'var(--spacing-xl)',
    alignItems: 'flex-end',
  },
  posterSmall: {
    flexShrink: 0,
    width: '200px',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-lg)',
    display: 'none',
  },
  posterImg: {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
  heroInfo: {
    flex: 1,
  },
  genreTags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 'var(--spacing-sm)',
    marginBottom: 'var(--spacing-md)',
  },
  genreTag: {
    padding: '4px 12px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  },
  movieTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    fontWeight: 800,
    color: 'var(--text-primary)',
    margin: '0 0 var(--spacing-sm)',
    lineHeight: 1.1,
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
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-xl)',
    flexWrap: 'wrap' as const,
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
  },
  ratingValue: {
    color: 'var(--gold)',
    fontWeight: 700,
    fontSize: '1.1rem',
  },
  playButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: '14px 36px',
    backgroundColor: 'var(--accent-primary)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius-md)',
    fontSize: '1.1rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: 'var(--shadow-glow)',
    transition: 'background-color 0.2s ease, transform 0.2s ease',
  },
  detailsSection: {
    padding: 'var(--spacing-2xl) 0',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 var(--spacing-lg)',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-lg)',
    marginBottom: 'var(--spacing-2xl)',
    padding: 'var(--spacing-xl)',
    backgroundColor: 'var(--bg-secondary)',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
  },
  infoBlock: {},
  infoLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    marginBottom: 'var(--spacing-sm)',
  },
  infoValue: {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: 1.5,
  },
  descriptionSection: {},
  sectionTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 'var(--spacing-md)',
  },
  description: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.8,
    margin: 0,
    maxWidth: '800px',
  },
  relatedSection: {
    padding: 'var(--spacing-2xl) 0 var(--spacing-2xl)',
    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
  },
  relatedTitle: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 'var(--spacing-xl)',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: 'var(--spacing-md)',
  },
  relatedCardWrapper: {},
};

export default MovieDetailPage;
