import { Tag, Typography } from '@arco-design/web-react';
import type { ProductTag } from '../../../types';
import './ProductInfoSection.less';

interface ProductInfoSectionProps {
  title: string;
  subtitle?: string;
  tags: ProductTag[];
  salesCount: number;
}

const TAG_COLOR_MAP: Record<ProductTag['type'], string> = {
  promotion: 'red',
  new: 'orangered',
  official: 'blue',
  shipping: 'green',
  default: 'gray',
};

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({ title, subtitle, tags, salesCount }) => {
  return (
    <div className="product-info-section">
      <Typography.Title heading={5} className="product-title">
        {title}
      </Typography.Title>

      {subtitle && (
        <Typography.Text className="product-subtitle">
          {subtitle}
        </Typography.Text>
      )}

      <div className="product-tags">
        {tags.map((tag) => (
          <Tag key={tag.id} color={TAG_COLOR_MAP[tag.type] || 'gray'} size="small">
            {tag.name}
          </Tag>
        ))}
      </div>

      <div className="product-sales">
        已售 {salesCount > 10000 ? `${(salesCount / 10000).toFixed(1)}万` : salesCount}+
      </div>
    </div>
  );
};

export default ProductInfoSection;
