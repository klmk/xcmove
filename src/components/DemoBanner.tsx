import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

/**
 * 演示模式横幅组件
 * 告知用户当前网站处于演示模式，使用占位数据
 */
const DemoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div style={styles.banner}>
      <div style={styles.content}>
        <Info size={16} style={{ flexShrink: 0 }} />
        <span style={styles.text}>
          当前为 <strong style={styles.highlight}>演示模式</strong>
          —— 影片数据为占位内容，播放功能为模拟演示。
          接入真实数据源后即可正常使用。
        </span>
      </div>
      <button onClick={() => setIsVisible(false)} style={styles.closeBtn} aria-label="关闭">
        <X size={16} />
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  banner: {
    position: 'relative',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    background: 'linear-gradient(90deg, rgba(245, 197, 24, 0.12) 0%, rgba(229, 9, 20, 0.08) 100%)',
    borderBottom: '1px solid rgba(245, 197, 24, 0.2)',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    minWidth: 0,
  },
  text: {
    fontSize: '0.8rem',
    color: 'rgba(245, 197, 24, 0.85)',
    lineHeight: 1.5,
  },
  highlight: {
    color: '#f5c518',
    fontWeight: 600,
  },
  closeBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    color: 'rgba(245, 197, 24, 0.6)',
    cursor: 'pointer',
    flexShrink: 0,
    marginLeft: '12px',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
};

export default DemoBanner;
