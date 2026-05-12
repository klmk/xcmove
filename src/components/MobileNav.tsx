import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, TrendingUp, User } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const MobileNav: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      path: '/',
      label: '首页',
      icon: <Home size={22} />,
    },
    {
      path: '/search',
      label: '搜索',
      icon: <Search size={22} />,
    },
    {
      path: '/category/all',
      label: '趋势',
      icon: <TrendingUp size={22} />,
    },
    {
      path: '/category/all',
      label: '我的',
      icon: <User size={22} />,
    },
  ];

  const isActive = (path: string): boolean => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav style={styles.nav}>
      {navItems.map((item) => (
        <Link
          key={item.label}
          to={item.path}
          style={{
            ...styles.navItem,
            color: isActive(item.path)
              ? 'var(--accent-primary)'
              : 'var(--text-secondary)',
          }}
        >
          <div
            style={{
              ...styles.iconWrapper,
              transform: isActive(item.path) ? 'translateY(-2px)' : 'none',
            }}
          >
            {item.icon}
          </div>
          <span
            style={{
              ...styles.label,
              fontWeight: isActive(item.path) ? 600 : 400,
            }}
          >
            {item.label}
          </span>
          {isActive(item.path) && <div style={styles.activeIndicator} />}
        </Link>
      ))}
    </nav>
  );
};

const styles: Record<string, React.CSSProperties> = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: '70px',
    backgroundColor: 'rgba(18, 18, 26, 0.95)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '0 var(--spacing-sm)',
  },
  navItem: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    textDecoration: 'none',
    position: 'relative' as const,
    transition: 'color 0.2s ease',
    minWidth: '60px',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease',
  },
  label: {
    fontSize: '0.65rem',
    letterSpacing: '0.3px',
    transition: 'font-weight 0.2s ease',
  },
  activeIndicator: {
    position: 'absolute' as const,
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '20px',
    height: '2px',
    backgroundColor: 'var(--accent-primary)',
    borderRadius: 'var(--radius-full)',
  },
};

export default MobileNav;
