import { useEffect, useRef, useState } from 'react';
import './DetailTabs.less';

interface DetailTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
}

const TABS = [
  { key: 'detail', label: '商品详情' },
  { key: 'review', label: '用户评价' },
  { key: 'faq', label: '常见问题' },
];

const DetailTabs: React.FC<DetailTabsProps> = ({ activeTab, onTabChange }) => {
  const [isSticky, setIsSticky] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (tabRef.current) {
        const rect = tabRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={tabRef} className={`detail-tabs ${isSticky ? 'sticky' : ''}`}>
      <div className="detail-tabs-inner">
        {TABS.map((tab) => (
          <div
            key={tab.key}
            className={`detail-tab-item ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => onTabChange(tab.key)}
          >
            {tab.label}
            {activeTab === tab.key && <div className="tab-indicator" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailTabs;
