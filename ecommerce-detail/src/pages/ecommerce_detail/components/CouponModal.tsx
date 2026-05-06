import { Modal, Button, Message } from '@arco-design/web-react';
import { useRequest } from 'ahooks';
import { claimCoupon } from '../../../api/ecommerce';
import type { Coupon } from '../../../types';
import './CouponModal.less';

interface CouponModalProps {
  visible: boolean;
  coupons: Coupon[];
  onClose: () => void;
}

const CouponModal: React.FC<CouponModalProps> = ({ visible, coupons, onClose }) => {
  const { runAsync: doClaim, loading: claiming } = useRequest(claimCoupon, { manual: true });

  const handleClaim = async (coupon: Coupon) => {
    try {
      const res = await doClaim(coupon.id);
      if (res.success) {
        Message.success(res.message);
      }
    } catch {
      Message.error('领取失败，请稍后重试');
    }
  };

  const getStatusText = (status: Coupon['status']) => {
    switch (status) {
      case 'available': return '立即领取';
      case 'claimed': return '已领取';
      case 'expired': return '已过期';
      case 'unavailable': return '不可用';
    }
  };

  return (
    <Modal
      title="领取优惠券"
      visible={visible}
      onCancel={onClose}
      footer={null}
      className="coupon-modal"
      unmountOnExit
    >
      <div className="coupon-list">
        {coupons.length === 0 ? (
          <div className="coupon-empty">暂无可用优惠券</div>
        ) : (
          coupons.map((coupon) => (
            <div key={coupon.id} className={`coupon-item ${coupon.status !== 'available' ? 'disabled' : ''}`}>
              <div className="coupon-left">
                <span className="coupon-amount">¥{coupon.discount}</span>
                <span className="coupon-threshold">满{coupon.threshold}可用</span>
              </div>
              <div className="coupon-right">
                <div className="coupon-name">{coupon.name}</div>
                <div className="coupon-validity">
                  {coupon.validStart} ~ {coupon.validEnd}
                </div>
                <Button
                  type="primary"
                  size="mini"
                  disabled={coupon.status !== 'available'}
                  loading={claiming}
                  onClick={() => handleClaim(coupon)}
                >
                  {getStatusText(coupon.status)}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default CouponModal;
