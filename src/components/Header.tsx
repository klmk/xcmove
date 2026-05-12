import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearchClick = () => {
    navigate('/search');
  };

  return (
    <header
      style={{
        ...styles.header,
        backgroundColor: isScrolled
          ? 'rgba(10, 10, 15, 0.85)'
          : 'transparent',
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
      }}
    >
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoAccent}>XC</span>
          <span style={styles.logoText}>Move</span>
        </Link>

        <nav style={styles.desktopNav}>
          <Link
            to="/"
            style={{
              ...styles.navLink,
              color:
                location.pathname === '/'
                  ? 'var(--accent-primary)'
                  : 'var(--text-secondary)',
            }}
          >
            首页
          </Link>
          <Link
            to="/category/all"
            style={{
              ...styles.navLink,
              color:
                location.pathname.startsWith('/category')
                  ? 'var(--accent-primary)'
                  : 'var(--text-secondary)',
            }}
          >
            分类
          </Link>
          <Link
            to="/category/scifi"
            style={{
              ...styles.navLink,
              color: 'var(--text-secondary)',
            }}
          >
            科幻
          </Link>
          <Link
            to="/category/action"
            style={{
              ...styles.navLink,
              color: 'var(--text-secondary)',
            }}
          >
            动作
          </Link>
          <Link
            to="/category/animation"
            style={{
              ...styles.navLink,
              color: 'var(--text-secondary)',
            }}
          >
            动画
          </Link>
        </nav>

        <div style={styles.actions}>
          <button
            onClick={handleSearchClick}
            style={styles.iconBtn}
            aria-label="搜索"
          >
            <Search size={20} />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              ...styles.iconBtn,
              ...styles.hamburgerBtn,
            }}
            aria-label="菜单"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileNavLink}>
            首页
          </Link>
          <Link to="/category/all" style={styles.mobileNavLink}>
            分类浏览
          </Link>
          <Link to="/category/scifi" style={styles.mobileNavLink}>
            科幻
          </Link>
          <Link to="/category/action" style={styles.mobileNavLink}>
            动作
          </Link>
          <Link to="/category/animation" style={styles.mobileNavLink}>
            动画
          </Link>
          <Link to="/category/drama" style={styles.mobileNavLink}>
            剧情
          </Link>
          <Link to="/category/romance" style={styles.mobileNavLink}>
            爱情
          </Link>
          <Link to="/category/suspense" style={styles.mobileNavLink}>
            悬疑
          </Link>
          <button
            onClick={() => {
              navigate('/search');
              setIsMobileMenuOpen(false);
            }}
            style={styles.mobileSearchBtn}
          >
            <Search size={18} />
            <span>搜索影片</span>
          </button>
        </div>
      )}
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 var(--spacing-lg)',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: 800,
    letterSpacing: '-0.5px',
    textDecoration: 'none',
  },
  logoAccent: {
    color: 'var(--accent-primary)',
  },
  logoText: {
    color: 'var(--text-primary)',
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xl)',
  },
  navLink: {
    fontSize: '0.9rem',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    whiteSpace: 'nowrap' as const,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-full)',
    color: 'var(--text-primary)',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  },
  hamburgerBtn: {
    display: 'none',
  },
  mobileMenu: {
    position: 'absolute',
    top: '64px',
    left: 0,
    right: 0,
    backgroundColor: 'rgba(18, 18, 26, 0.98)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    padding: 'var(--spacing-md) 0',
    display: 'flex',
    flexDirection: 'column' as const,
    animation: 'slideDown 0.3s ease',
  },
  mobileNavLink: {
    padding: 'var(--spacing-md) var(--spacing-lg)',
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.2s ease, background-color 0.2s ease',
  },
  mobileSearchBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    marginTop: 'var(--spacing-sm)',
  },
};

export default Header;
