/**
 * 价格格式化工具
 * 空值返回 -，金额单位为人民币（¥），精度为 2 位小数
 */

/** 格式化价格 - 去尾零 */
export function formatPrice(price: number | null | undefined): string {
  if (price === null || price === undefined) return '-';
  if (price === 0) return '¥0';
  const formatted = price.toFixed(2).replace(/\.?0+$/, '');
  return `¥${formatted}`;
}

/** 格式化价格 - 保留两位小数 */
export function formatPriceFull(price: number | null | undefined): string {
  if (price === null || price === undefined) return '-';
  return `¥${price.toFixed(2)}`;
}

/** 格式化折扣 */
export function formatDiscount(discount: number | null | undefined): string {
  if (discount === null || discount === undefined) return '';
  return `${discount}折`;
}

/** 计算折扣百分比 */
export function calcDiscountPercent(price: number, originalPrice: number): number | null {
  if (!originalPrice || originalPrice <= 0 || price >= originalPrice) return null;
  return Math.round((price / originalPrice) * 10 * 10) / 10;
}
