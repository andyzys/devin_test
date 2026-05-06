import { Image, Tag } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../../utils/format-price';
import type { RecommendProduct } from '../../../types';
import './RecommendSection.less';

interface RecommendSectionProps {
  products: RecommendProduct[];
}

const TYPE_LABEL: Record<string, string> = {
  similar: '相似推荐',
  match: '搭配推荐',
  hot: '热销商品',
  guess: '猜你喜欢',
};

const RecommendSection: React.FC<RecommendSectionProps> = ({ products }) => {
  const navigate = useNavigate();

  if (products.length === 0) return null;

  const grouped = products.reduce<Record<string, RecommendProduct[]>>((acc, p) => {
    if (!acc[p.type]) acc[p.type] = [];
    acc[p.type].push(p);
    return acc;
  }, {});

  const handleClick = (product: RecommendProduct) => {
    navigate(`/ecommerce-detail/${product.id}`);
  };

  return (
    <div className="recommend-section">
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="recommend-group">
          <h3 className="group-title">{TYPE_LABEL[type] || '推荐商品'}</h3>
          <div className="recommend-grid">
            {items.map((product) => (
              <div
                key={product.id}
                className="recommend-card"
                onClick={() => handleClick(product)}
              >
                <div className="card-image">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width="100%"
                    height={140}
                    style={{ objectFit: 'cover' }}
                    lazyload
                    error={<div className="img-placeholder">暂无图片</div>}
                  />
                  {product.tags && product.tags.length > 0 && (
                    <div className="card-tags">
                      {product.tags.map((t) => (
                        <Tag key={t} size="small" color="red">{t}</Tag>
                      ))}
                    </div>
                  )}
                </div>
                <div className="card-info">
                  <div className="card-title">{product.title}</div>
                  <div className="card-price-row">
                    <span className="card-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="card-original-price">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  {product.salesCount && (
                    <div className="card-sales">
                      已售 {product.salesCount > 10000 ? `${(product.salesCount / 10000).toFixed(1)}万` : product.salesCount}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendSection;
