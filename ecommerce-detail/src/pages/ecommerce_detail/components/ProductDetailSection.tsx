import { Image, Table } from '@arco-design/web-react';
import type { DetailBlock } from '../../../types';
import './ProductDetailSection.less';

interface ProductDetailSectionProps {
  blocks: DetailBlock[];
}

const ProductDetailSection: React.FC<ProductDetailSectionProps> = ({ blocks }) => {
  const renderBlock = (block: DetailBlock) => {
    switch (block.type) {
      case 'text':
        return (
          <div className="detail-text-block" key={block.id}>
            <p>{block.content}</p>
          </div>
        );
      case 'image':
        return (
          <div className="detail-image-block" key={block.id}>
            <Image
              src={block.content}
              alt="商品详情"
              width="100%"
              lazyload
              preview
              error={
                <div className="image-placeholder">图片加载失败</div>
              }
            />
          </div>
        );
      case 'video':
        return (
          <div className="detail-video-block" key={block.id}>
            <video
              src={block.content}
              controls
              playsInline
              preload="none"
              style={{ width: '100%' }}
            />
          </div>
        );
      case 'params':
        return (
          <div className="detail-params-block" key={block.id}>
            <Table
              columns={[
                { title: '参数', dataIndex: 'label', width: 120 },
                { title: '值', dataIndex: 'value' },
              ]}
              data={block.params?.map((p, i) => ({ ...p, key: i })) ?? []}
              pagination={false}
              border
              size="small"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="product-detail-section">
      <h3 className="section-title">商品详情</h3>
      {blocks.length === 0 ? (
        <div className="section-empty">暂无商品详情</div>
      ) : (
        blocks.map(renderBlock)
      )}
    </div>
  );
};

export default ProductDetailSection;
