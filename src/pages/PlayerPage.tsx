import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipForward,
  SkipBack,
  Settings,
  Subtitles,
  ChevronDown,
  Info,
} from 'lucide-react';
import { getMovieById } from '../data/movies';

const PlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movieId = parseInt(id || '0', 10);
  const movie = getMovieById(movieId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(7200); // 模拟2小时
  const [showInfo, setShowInfo] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  // 自动隐藏控制栏
  const resetHideTimer = () => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    if (isPlaying) {
      resetHideTimer();
    } else {
      setShowControls(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isPlaying]);

  // 模拟播放进度
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          return duration;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    setProgress(duration > 0 ? (currentTime / duration) * 100 : 0);
  }, [currentTime, duration]);

  if (!movie) {
    return (
      <div style={styles.notFound}>
        <h2>未找到该影片</h2>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          <ArrowLeft size={18} /> 返回首页
        </button>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    setCurrentTime(Math.floor(pct * duration));
  };

  return (
    <div
      style={styles.playerWrapper}
      onMouseMove={resetHideTimer}
      onClick={() => {
        if (!showControls) {
          setShowControls(true);
          resetHideTimer();
        }
      }}
    >
      {/* 背景 - 模拟视频画面 */}
      <div style={styles.videoArea}>
        <div
          style={{
            ...styles.videoBg,
            backgroundImage: `url(${movie.backdrop})`,
            filter: isPlaying ? 'brightness(0.6)' : 'brightness(0.4)',
          }}
        />

        {/* 演示模式提示 */}
        <div style={styles.demoOverlay}>
          <div style={styles.demoBadge}>
            <Info size={16} />
            <span>演示模式 · 暂无真实视频源</span>
          </div>
        </div>

        {/* 中央播放按钮 */}
        {!isPlaying && (
          <div style={styles.centerPlay} onClick={() => setIsPlaying(true)}>
            <div style={styles.centerPlayBtn}>
              <Play size={48} fill="white" color="white" />
            </div>
          </div>
        )}

        {/* 播放中电影信息 */}
        {isPlaying && showControls && (
          <div style={styles.playingInfo}>
            <span style={styles.playingTitle}>{movie.title}</span>
            <span style={styles.playingMeta}>
              {movie.year} · {movie.duration}
            </span>
          </div>
        )}
      </div>

      {/* 控制栏 */}
      <div
        style={{
          ...styles.controls,
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部栏 */}
        <div style={styles.topBar}>
          <button onClick={() => navigate(-1)} style={styles.topBtn}>
            <ArrowLeft size={22} />
          </button>
          <div style={styles.topTitle}>{movie.title}</div>
          <div style={styles.topActions}>
            <button
              onClick={() => setShowInfo(!showInfo)}
              style={styles.topBtn}
            >
              <Info size={20} />
            </button>
          </div>
        </div>

        {/* 底部栏 */}
        <div style={styles.bottomBar}>
          {/* 进度条 */}
          <div style={styles.progressContainer} onClick={handleProgressClick}>
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progress}%`,
                }}
              />
              <div
                style={{
                  ...styles.progressThumb,
                  left: `${progress}%`,
                }}
              />
            </div>
          </div>

          <div style={styles.controlsRow}>
            <div style={styles.controlsLeft}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                style={styles.ctrlBtn}
              >
                {isPlaying ? (
                  <Pause size={24} fill="white" />
                ) : (
                  <Play size={24} fill="white" />
                )}
              </button>
              <button style={styles.ctrlBtn}>
                <SkipBack size={20} />
              </button>
              <button style={styles.ctrlBtn}>
                <SkipForward size={20} />
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                style={styles.ctrlBtn}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <span style={styles.timeDisplay}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div style={styles.controlsRight}>
              <button style={styles.ctrlBtn}>
                <Subtitles size={20} />
              </button>
              <button style={styles.ctrlBtn}>
                <Settings size={20} />
              </button>
              <button style={styles.ctrlBtn}>
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 电影信息面板 */}
      {showInfo && (
        <div style={styles.infoPanel} onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowInfo(false)}
            style={styles.infoClose}
          >
            <ChevronDown size={24} />
          </button>
          <div style={styles.infoContent}>
            <div style={styles.infoPoster}>
              <img src={movie.poster} alt={movie.title} />
            </div>
            <div style={styles.infoDetails}>
              <h2 style={styles.infoTitle}>{movie.title}</h2>
              {movie.originalTitle && (
                <p style={styles.infoOriginal}>{movie.originalTitle}</p>
              )}
              <div style={styles.infoMeta}>
                <span>⭐ {movie.rating}</span>
                <span>🕐 {movie.duration}</span>
                <span>📅 {movie.year}</span>
              </div>
              <p style={styles.infoDesc}>{movie.description}</p>
              <div style={styles.infoTags}>
                <span style={styles.infoTag}>导演: {movie.director}</span>
                <span style={styles.infoTag}>
                  主演: {movie.cast.join('、')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  playerWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    backgroundColor: '#000',
    cursor: 'default',
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    gap: '16px',
    color: 'white',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    backgroundColor: 'var(--accent-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  videoArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  videoBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover' as const,
    backgroundPosition: 'center' as const,
    transition: 'filter 0.5s ease',
  },
  demoOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 5,
    pointerEvents: 'none' as const,
  },
  demoBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.85rem',
    fontWeight: 500,
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  centerPlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 10,
    cursor: 'pointer',
  },
  centerPlayBtn: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(229, 9, 20, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 40px rgba(229, 9, 20, 0.5)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  playingInfo: {
    position: 'absolute',
    top: '80px',
    left: '24px',
    zIndex: 10,
    animation: 'fadeIn 0.3s ease',
  },
  playingTitle: {
    display: 'block',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'white',
  },
  playingMeta: {
    display: 'block',
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: '4px',
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
  },
  topBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: 'background-color 0.2s ease',
  },
  topTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'white',
  },
  topActions: {
    display: 'flex',
    gap: '8px',
  },
  bottomBar: {
    padding: '0 24px 24px',
    background:
      'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
  },
  progressContainer: {
    padding: '8px 0',
    cursor: 'pointer',
  },
  progressTrack: {
    position: 'relative' as const,
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '2px',
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: 'var(--accent-primary)',
    borderRadius: '2px',
    transition: 'width 0.3s linear',
  },
  progressThumb: {
    position: 'absolute',
    top: '50%',
    width: '14px',
    height: '14px',
    backgroundColor: 'var(--accent-primary)',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0 0 6px rgba(229, 9, 20, 0.5)',
    transition: 'left 0.3s linear',
  },
  controlsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '4px',
  },
  controlsLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  controlsRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  ctrlBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  timeDisplay: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: '4px',
    fontVariantNumeric: 'tabular-nums' as const,
  },
  infoPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    backgroundColor: 'rgba(18, 18, 26, 0.95)',
    backdropFilter: 'blur(20px)',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    maxHeight: '60vh',
    overflowY: 'auto' as const,
    animation: 'slideUp 0.3s ease',
  },
  infoClose: {
    display: 'flex',
    justifyContent: 'center',
    padding: '12px',
    color: 'rgba(255, 255, 255, 0.5)',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
  },
  infoContent: {
    display: 'flex',
    gap: '24px',
    padding: '0 24px 32px',
  },
  infoPoster: {
    flexShrink: 0,
    width: '140px',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  infoDetails: {
    flex: 1,
    minWidth: 0,
  },
  infoTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'white',
    margin: '0 0 4px',
  },
  infoOriginal: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.5)',
    margin: '0 0 12px',
    fontStyle: 'italic',
  },
  infoMeta: {
    display: 'flex',
    gap: '16px',
    fontSize: '0.85rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '16px',
    flexWrap: 'wrap' as const,
  },
  infoDesc: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.7,
    margin: '0 0 16px',
  },
  infoTags: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px',
  },
  infoTag: {
    fontSize: '0.8rem',
    color: 'rgba(255, 255, 255, 0.5)',
  },
};

export default PlayerPage;
