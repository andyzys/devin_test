/** 商品媒体类型 */
export type MediaType = 'image' | 'video';

/** Banner 媒体项 */
export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  coverUrl?: string;
  sort: number;
}

/** 商品标签 */
export interface ProductTag {
  id: string;
  name: string;
  type: 'promotion' | 'new' | 'official' | 'shipping' | 'default';
}

/** 优惠券 */
export interface Coupon {
  id: string;
  name: string;
  discount: number;
  threshold: number;
  validStart: string;
  validEnd: string;
  status: 'available' | 'claimed' | 'expired' | 'unavailable';
}

/** 满减活动 */
export interface Promotion {
  id: string;
  description: string;
  endTime: string;
}

/** SKU 规格选项 */
export interface SkuOption {
  id: string;
  name: string;
  imageUrl?: string;
}

/** SKU 规格维度 */
export interface SkuDimension {
  id: string;
  name: string;
  options: SkuOption[];
}

/** SKU 库存信息 */
export interface SkuInfo {
  skuId: string;
  specIds: string[];
  price: number;
  originalPrice: number;
  stock: number;
  imageUrl?: string;
}

/** 商品详情内容块 */
export interface DetailBlock {
  id: string;
  type: 'image' | 'text' | 'video' | 'params';
  content: string;
  params?: { label: string; value: string }[];
}

/** 评价 */
export interface Review {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: number;
  content: string;
  images?: string[];
  videos?: string[];
  specs?: string;
  createdAt: string;
  likeCount: number;
}

/** FAQ */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/** 推荐商品 */
export interface RecommendProduct {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  tags?: string[];
  salesCount?: number;
  type: 'similar' | 'match' | 'hot' | 'guess';
}

/** 商品详情完整数据 */
export interface ProductDetail {
  id: string;
  title: string;
  subtitle?: string;
  sellingPoints: string[];
  tags: ProductTag[];
  price: number;
  originalPrice: number;
  discount?: number;
  mediaList: MediaItem[];
  coupons: Coupon[];
  promotions: Promotion[];
  skuDimensions: SkuDimension[];
  skuList: SkuInfo[];
  detailBlocks: DetailBlock[];
  reviews: Review[];
  reviewSummary: {
    total: number;
    positiveRate: number;
    tags: { name: string; count: number }[];
  };
  faqList: FaqItem[];
  recommendations: RecommendProduct[];
  isFavorited: boolean;
  salesCount: number;
}

/** 评论筛选参数 */
export interface ReviewFilter {
  sortBy: 'latest' | 'rating';
  hasImage: boolean;
  page: number;
  pageSize: number;
}

/** 评论分页响应 */
export interface ReviewListResponse {
  list: Review[];
  total: number;
  page: number;
  pageSize: number;
}
