import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import DemoBanner from './components/DemoBanner';
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import PlayerPage from './pages/PlayerPage';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import './styles/global.css';
import './styles/components.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isPlayerPage = location.pathname.startsWith('/play/');

  return (
    <div style={styles.app}>
      {!isPlayerPage && <DemoBanner />}
      {!isPlayerPage && <Header />}
      <main style={{ ...styles.main, paddingTop: isPlayerPage ? 0 : undefined }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/play/:id" element={<PlayerPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes>
      </main>
      {!isPlayerPage && <MobileNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const styles: Record<string, React.CSSProperties> = {
  app: {
    minHeight: '100vh',
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    paddingTop: '64px',
    paddingBottom: '70px',
  },
};

export default App;
