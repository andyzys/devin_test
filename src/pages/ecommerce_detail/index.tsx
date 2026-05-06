import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { Spin, Result, Button } from '@arco-design/web-react';
import { getProductDetail, getRecommendations } from '../../api/ecommerce';
import { trackPageView } from '../../utils/tracker';
import type { SkuInfo } from '../../types';
import BannerSection from './components/BannerSection';
import ProductInfoSection from './components/ProductInfoSection';
import PriceSection from './components/PriceSection';
import SkuSelector from './components/SkuSelector';
import DetailTabs from './components/DetailTabs';
import ProductDetailSection from './components/ProductDetailSection';
import ReviewSection from './components/ReviewSection';
import FaqSection from './components/FaqSection';
import RecommendSection from './components/RecommendSection';
import BottomActionBar from './components/BottomActionBar';
import './index.less';

const EcommerceDetailPage: React.FC = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const [selectedSku, setSelectedSku] = useState<SkuInfo | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeTab, setActiveTab] = useState('detail');
  const prevProductIdRef = useRef<string | null>(null);

  const detailRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const { data: product, loading, error, run: reload } = useRequest(
    () => getProductDetail(productId),
    {
      refreshDeps: [productId],
      onSuccess: (data) => {
        setIsFavorited(data.isFavorited);
      },
    }
  );

  const { data: recommendations } = useRequest(
    () => getRecommendations(productId),
    { refreshDeps: [productId] }
  );

  useEffect(() => {
    if (productId && productId !== prevProductIdRef.current) {
      prevProductIdRef.current = productId;
      trackPageView(productId);
    }
  }, [productId]);

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key);
    const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      detail: detailRef,
      review: reviewRef,
      faq: faqRef,
    };
    const ref = refMap[key];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (loading) {
    return (
      <div className="ecommerce-detail-loading">
        <Spin size={40} />
        <p>加载中...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="ecommerce-detail-error">
        <Result
          status="error"
          title="加载失败"
          subTitle="商品信息获取失败，请稍后重试"
          extra={<Button type="primary" onClick={reload}>重新加载</Button>}
        />
      </div>
    );
  }

  return (
    <div className="ecommerce-detail-page">
      <BannerSection
        productId={productId}
        mediaList={product.mediaList}
        sellingPoints={product.sellingPoints}
      />

      <ProductInfoSection
        title={product.title}
        subtitle={product.subtitle}
        tags={product.tags}
        salesCount={product.salesCount}
      />

      <PriceSection
        price={selectedSku?.price ?? product.price}
        originalPrice={selectedSku?.originalPrice ?? product.originalPrice}
        discount={product.discount}
        coupons={product.coupons}
        promotions={product.promotions}
      />

      <SkuSelector
        productId={productId}
        dimensions={product.skuDimensions}
        skuList={product.skuList}
        selectedSku={selectedSku}
        onSkuChange={setSelectedSku}
      />

      <DetailTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <div ref={detailRef} id="section-detail">
        <ProductDetailSection blocks={product.detailBlocks} />
      </div>

      <div ref={reviewRef} id="section-review">
        <ReviewSection
          productId={productId}
          summary={product.reviewSummary}
        />
      </div>

      <div ref={faqRef} id="section-faq">
        <FaqSection faqList={product.faqList} />
      </div>

      <RecommendSection products={recommendations ?? []} />

      <BottomActionBar
        productId={productId}
        selectedSku={selectedSku}
        isFavorited={isFavorited}
        onFavoriteChange={setIsFavorited}
      />
    </div>
  );
};

export default EcommerceDetailPage;
