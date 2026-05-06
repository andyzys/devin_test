import { useState } from 'react';
import { IconDown, IconUp } from '@arco-design/web-react/icon';
import type { FaqItem } from '../../../types';
import './FaqSection.less';

interface FaqSectionProps {
  faqList: FaqItem[];
}

const FaqSection: React.FC<FaqSectionProps> = ({ faqList }) => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  if (faqList.length === 0) return null;

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="faq-section">
      <h3 className="section-title">常见问题</h3>
      <div className="faq-list">
        {faqList.map((faq) => {
          const isExpanded = expandedIds.has(faq.id);
          return (
            <div key={faq.id} className={`faq-item ${isExpanded ? 'expanded' : ''}`}>
              <div className="faq-question" onClick={() => toggleExpand(faq.id)}>
                <span className="faq-q-icon">Q</span>
                <span className="faq-q-text">{faq.question}</span>
                {isExpanded ? <IconUp /> : <IconDown />}
              </div>
              {isExpanded && (
                <div className="faq-answer">
                  <span className="faq-a-icon">A</span>
                  <span className="faq-a-text">{faq.answer}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaqSection;
