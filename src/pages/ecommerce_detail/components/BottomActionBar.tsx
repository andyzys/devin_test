import { useState } from 'react';
import { Button, Message } from '@arco-design/web-react';
import { IconHeart, IconHeartFill, IconMessage, IconShareExternal } from '@arco-design/web-react/icon';
import { useRequest } from 'ahooks';
import { toggleFavorite, addToCart, buyNow } from '../../../api/ecommerce';
import { trackAddToCart, trackBuyNow, trackFavorite } from '../../../utils/tracker';
import type { SkuInfo } from '../../../types';
import SharePanel from './SharePanel';
import './BottomActionBar.less';

interface BottomActionBarProps {
  productId: string;
  selectedSku: SkuInfo | null;
  isFavorited: boolean;
  onFavoriteChange: (val: boolean) => void;
}

const BottomActionBar: React.FC<BottomActionBarProps> = ({
  productId,
  selectedSku,
  isFavorited,
  onFavoriteChange,
}) => {
  const [sharePanelVisible, setSharePanelVisible] = useState(false);

  const { runAsync: doToggleFavorite, loading: favLoading } = useRequest(toggleFavorite, { manual: true });
  const { runAsync: doAddToCart, loading: cartLoading } = useRequest(addToCart, { manual: true });
  const { runAsync: doBuyNow, loading: buyLoading } = useRequest(buyNow, { manual: true });

  const handleFavorite = async () => {
    try {
      const newState = !isFavorited;
      const res = await doToggleFavorite(productId, newState);
      if (res.success) {
        onFavoriteChange(newState);
        trackFavorite(productId, newState ? 'add' : 'remove');
        Message.success(newState ? '收藏成功' : '已取消收藏');
      }
    } catch {
      Message.error('操作失败，请稍后重试');
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSku) {
      Message.warning('请先选择规格');
      return;
    }
    if (selectedSku.stock <= 0) {
      Message.warning('当前规格库存不足');
      return;
    }
    try {
      const res = await doAddToCart(productId, selectedSku.skuId, 1);
      if (res.success) {
        trackAddToCart(productId, selectedSku.skuId, selectedSku.price);
        Message.success(res.message);
      }
    } catch {
      Message.error('加入购物车失败');
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSku) {
      Message.warning('请先选择规格');
      return;
    }
    if (selectedSku.stock <= 0) {
      Message.warning('当前规格库存不足');
      return;
    }
    try {
      const res = await doBuyNow(productId, selectedSku.skuId, 1);
      if (res.success) {
        trackBuyNow(productId, selectedSku.skuId, selectedSku.price);
        Message.success(res.message);
      }
    } catch {
      Message.error('购买失败');
    }
  };

  const isOutOfStock = selectedSku ? selectedSku.stock <= 0 : false;

  return (
    <>
      <div className="bottom-action-bar">
        <div className="action-icons">
          <div className="action-icon-item" onClick={() => Message.info('客服功能开发中')}>
            <IconMessage />
            <span>客服</span>
          </div>
          <div className="action-icon-item" onClick={handleFavorite}>
            {isFavorited
              ? <IconHeartFill style={{ color: '#f53f3f' }} />
              : <IconHeart />
            }
            <span>{isFavorited ? '已收藏' : '收藏'}</span>
          </div>
          <div className="action-icon-item" onClick={() => setSharePanelVisible(true)}>
            <IconShareExternal />
            <span>分享</span>
          </div>
        </div>
        <div className="action-buttons">
          <Button
            className="btn-cart"
            loading={cartLoading}
            disabled={isOutOfStock || favLoading}
            onClick={handleAddToCart}
          >
            加入购物车
          </Button>
          <Button
            type="primary"
            className="btn-buy"
            loading={buyLoading}
            disabled={isOutOfStock}
            onClick={handleBuyNow}
          >
            {isOutOfStock ? '暂时缺货' : '立即购买'}
          </Button>
        </div>
      </div>

      <SharePanel
        visible={sharePanelVisible}
        productId={productId}
        onClose={() => setSharePanelVisible(false)}
      />
    </>
  );
};

export default BottomActionBar;
