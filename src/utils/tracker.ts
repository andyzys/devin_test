/**
 * 埋点封装
 * 基于 byted-tea-sdk 规划，当前使用 console 替代真实上报
 * 事件名、公共参数、业务参数、上报环境均待埋点文档确认后接入
 */

interface TrackParams {
  [key: string]: string | number | boolean | undefined;
}

/** 公共参数 */
function getCommonParams(): TrackParams {
  return {
    page: 'ecommerce_detail',
    timestamp: Date.now(),
    platform: 'h5',
  };
}

/** 上报事件 */
export function trackEvent(eventName: string, params?: TrackParams): void {
  const payload = {
    ...getCommonParams(),
    ...params,
  };
  // TODO: 接入 byted-tea-sdk 后替换为真实上报
  console.log(`[Track] ${eventName}`, payload);
}

/** 页面曝光 */
export function trackPageView(productId: string): void {
  trackEvent('page_view', { product_id: productId });
}

/** Banner 点击 */
export function trackBannerClick(productId: string, mediaId: string, mediaType: string, index: number): void {
  trackEvent('banner_click', { product_id: productId, media_id: mediaId, media_type: mediaType, index });
}

/** 视频播放 */
export function trackVideoPlay(productId: string, mediaId: string): void {
  trackEvent('video_play', { product_id: productId, media_id: mediaId });
}

/** SKU 切换 */
export function trackSkuSwitch(productId: string, skuId: string, specs: string): void {
  trackEvent('sku_switch', { product_id: productId, sku_id: skuId, specs });
}

/** 加入购物车 */
export function trackAddToCart(productId: string, skuId: string, price: number): void {
  trackEvent('add_to_cart', { product_id: productId, sku_id: skuId, price });
}

/** 立即购买 */
export function trackBuyNow(productId: string, skuId: string, price: number): void {
  trackEvent('buy_now', { product_id: productId, sku_id: skuId, price });
}

/** 分享点击 */
export function trackShare(productId: string, channel: string): void {
  trackEvent('share_click', { product_id: productId, channel });
}

/** 收藏 */
export function trackFavorite(productId: string, action: 'add' | 'remove'): void {
  trackEvent('favorite', { product_id: productId, action });
}
