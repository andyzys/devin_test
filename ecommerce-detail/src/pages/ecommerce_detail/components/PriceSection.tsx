import { useState } from 'react';
import { Tag } from '@arco-design/web-react';
import { IconRight } from '@arco-design/web-react/icon';
import { useInterval } from 'ahooks';
import { formatPrice, formatDiscount } from '../../../utils/format-price';
import type { Coupon, Promotion } from '../../../types';
import CouponModal from './CouponModal';
import './PriceSection.less';

interface PriceSectionProps {
  price: number;
  originalPrice: number;
  discount?: number;
  coupons: Coupon[];
  promotions: Promotion[];
}

function calcCountdownFromPromotion(promotions: Promotion[]): string {
  if (promotions.length === 0) return '';
  const endTime = new Date(promotions[0].endTime).getTime();
  const now = Date.now();
  const diff = endTime - now;
  if (diff <= 0) return '活动已结束';
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  if (days > 0) return `${days}天${hours}时${minutes}分`;
  return `${hours}时${minutes}分${seconds}秒`;
}

const PriceSection: React.FC<PriceSectionProps> = ({
  price,
  originalPrice,
  discount,
  coupons,
  promotions,
}) => {
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(() => calcCountdownFromPromotion(promotions));

  useInterval(() => {
    setCountdown(calcCountdownFromPromotion(promotions));
  }, promotions.length > 0 ? 1000 : undefined);

  const availableCoupons = coupons.filter((c) => c.status === 'available');

  return (
    <div className="price-section">
      <div className="price-main">
        <span className="price-current">{formatPrice(price)}</span>
        {originalPrice > price && (
          <>
            <span className="price-original">{formatPrice(originalPrice)}</span>
            {discount && <Tag color="red" size="small">{formatDiscount(discount)}</Tag>}
          </>
        )}
      </div>

      {promotions.length > 0 && (
        <div className="promotion-row">
          <Tag color="orangered" size="small">满减</Tag>
          <span className="promotion-desc">{promotions[0].description}</span>
          {countdown && (
            <span className="promotion-countdown">
              {countdown === '活动已结束' ? countdown : `剩余 ${countdown}`}
            </span>
          )}
        </div>
      )}

      {availableCoupons.length > 0 && (
        <div className="coupon-row" onClick={() => setCouponModalVisible(true)}>
          <Tag color="red" size="small">券</Tag>
          <span className="coupon-desc">
            {availableCoupons.map((c) => c.name).join(' | ')}
          </span>
          <IconRight className="coupon-arrow" />
        </div>
      )}

      <CouponModal
        visible={couponModalVisible}
        coupons={coupons}
        onClose={() => setCouponModalVisible(false)}
      />
    </div>
  );
};

export default PriceSection;
