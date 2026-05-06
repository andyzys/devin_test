import type {
  ProductDetail,
  ReviewListResponse,
  ReviewFilter,
  RecommendProduct,
} from '../types';
import { mockProductDetail, mockRecommendations, mockReviewList } from './mock-data';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** 获取商品详情 */
export async function getProductDetail(productId: string): Promise<ProductDetail> {
  await delay(600);
  return { ...mockProductDetail, id: productId };
}

/** 获取 SKU 库存 */
export async function getSkuStock(productId: string, skuId: string): Promise<{ stock: number; price: number; originalPrice: number }> {
  await delay(200);
  const sku = mockProductDetail.skuList.find((s) => s.skuId === skuId);
  if (!sku) {
    return { stock: 0, price: 0, originalPrice: 0 };
  }
  void productId;
  return { stock: sku.stock, price: sku.price, originalPrice: sku.originalPrice };
}

/** 获取评论列表 */
export async function getReviewList(productId: string, filter: ReviewFilter): Promise<ReviewListResponse> {
  await delay(400);
  void productId;
  void filter;
  return mockReviewList;
}

/** 获取推荐商品 */
export async function getRecommendations(productId: string): Promise<RecommendProduct[]> {
  await delay(500);
  void productId;
  return mockRecommendations;
}

/** 领取优惠券 */
export async function claimCoupon(couponId: string): Promise<{ success: boolean; message: string }> {
  await delay(300);
  void couponId;
  return { success: true, message: '领取成功' };
}

/** 收藏/取消收藏 */
export async function toggleFavorite(productId: string, isFavorite: boolean): Promise<{ success: boolean }> {
  await delay(200);
  void productId;
  void isFavorite;
  return { success: true };
}

/** 加入购物车 */
export async function addToCart(productId: string, skuId: string, quantity: number): Promise<{ success: boolean; message: string }> {
  await delay(300);
  void productId;
  void skuId;
  void quantity;
  return { success: true, message: '已加入购物车' };
}

/** 立即购买 */
export async function buyNow(productId: string, skuId: string, quantity: number): Promise<{ success: boolean; orderId?: string; message: string }> {
  await delay(300);
  void productId;
  void skuId;
  void quantity;
  return { success: true, orderId: 'order_001', message: '下单成功' };
}
