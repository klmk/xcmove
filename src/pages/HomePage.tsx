import React, { useEffect, useRef } from 'react';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import { movies } from '../data/movies';

const HomePage: React.FC = () => {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const nowPlaying = movies.filter((m) => m.newRelease);
  const trending = movies.filter((m) => m.trending);
  const newReleases = movies.filter((m) => m.newRelease);
  const topRated = movies
    .filter((m) => m.topRated)
    .sort((a, b) => b.rating - a.rating);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div style={styles.page}>
      <HeroBanner />

      <div style={styles.content}>
        <div ref={addToRefs} className="fade-in-section">
          <MovieRow
            title="正在热映"
            movies={nowPlaying}
            linkTo="/category/all"
          />
        </div>

        <div ref={addToRefs} className="fade-in-section">
          <MovieRow
            title="热门趋势"
            movies={trending}
            linkTo="/category/all"
          />
        </div>

        <div ref={addToRefs} className="fade-in-section">
          <MovieRow
            title="新片上线"
            movies={newReleases}
            linkTo="/category/all"
          />
        </div>

        <div ref={addToRefs} className="fade-in-section">
          <MovieRow
            title="高分佳作"
            movies={topRated}
            linkTo="/category/all"
          />
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
  },
  content: {
    padding: 'var(--spacing-xl) 0',
  },
};

export default HomePage;
