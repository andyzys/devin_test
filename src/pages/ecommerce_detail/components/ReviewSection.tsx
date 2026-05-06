import { useState } from 'react';
import { Image, Tag, Rate, Empty } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { getReviewList } from '../../../api/ecommerce';
import type { ReviewFilter } from '../../../types';
import './ReviewSection.less';

interface ReviewSectionProps {
  productId: string;
  summary: {
    total: number;
    positiveRate: number;
    tags: { name: string; count: number }[];
  };
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId, summary }) => {
  const [filter, setFilter] = useState<ReviewFilter>({
    sortBy: 'latest',
    hasImage: false,
    page: 1,
    pageSize: 10,
  });

  const { data: reviewData } = useRequest(
    () => getReviewList(productId, filter),
    { refreshDeps: [filter] }
  );

  const reviews = reviewData?.list ?? [];

  return (
    <div className="review-section">
      <h3 className="section-title">
        用户评价
        <span className="review-count">({summary.total})</span>
      </h3>

      <div className="review-summary">
        <div className="positive-rate">
          <span className="rate-value">{summary.positiveRate}%</span>
          <span className="rate-label">好评率</span>
        </div>
        <div className="review-tags">
          {summary.tags.map((tag) => (
            <Tag key={tag.name} size="small" className="review-tag">
              {tag.name} ({tag.count})
            </Tag>
          ))}
        </div>
      </div>

      <div className="review-filters">
        <span
          className={`filter-item ${filter.sortBy === 'latest' && !filter.hasImage ? 'active' : ''}`}
          onClick={() => setFilter((f) => ({ ...f, sortBy: 'latest', hasImage: false }))}
        >
          最新
        </span>
        <span
          className={`filter-item ${filter.hasImage ? 'active' : ''}`}
          onClick={() => setFilter((f) => ({ ...f, hasImage: !f.hasImage }))}
        >
          有图
        </span>
        <span
          className={`filter-item ${filter.sortBy === 'rating' ? 'active' : ''}`}
          onClick={() => setFilter((f) => ({ ...f, sortBy: 'rating', hasImage: false }))}
        >
          好评
        </span>
      </div>

      <div className="review-list">
        {reviews.length === 0 ? (
          <Empty description="暂无评价" />
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="reviewer-avatar">
                    {review.avatar
                      ? <img src={review.avatar} alt="" />
                      : <span>{review.userName[0]}</span>
                    }
                  </div>
                  <span className="reviewer-name">{review.userName}</span>
                </div>
                <Rate readonly value={review.rating} style={{ fontSize: 12 }} />
              </div>
              {review.specs && (
                <div className="review-specs">{review.specs}</div>
              )}
              <div className="review-content">{review.content}</div>
              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  <Image.PreviewGroup>
                    {review.images.map((img, idx) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={`评价图${idx + 1}`}
                        width={80}
                        height={80}
                        style={{ objectFit: 'cover', borderRadius: 4 }}
                        lazyload
                      />
                    ))}
                  </Image.PreviewGroup>
                </div>
              )}
              <div className="review-footer">
                <span className="review-date">{review.createdAt}</span>
                <span className="review-like">👍 {review.likeCount}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
