import type {
  ProductDetail,
  ReviewListResponse,
  RecommendProduct,
} from '../types';

export const mockProductDetail: ProductDetail = {
  id: 'prod_001',
  title: '轻奢时尚真皮单肩包 2024新款女包',
  subtitle: '头层牛皮 | 轻便通勤 | 百搭出行',
  sellingPoints: ['头层牛皮手工缝制', '限时直降￥200', '顺丰包邮 7天无理由'],
  tags: [
    { id: 'tag1', name: '限时优惠', type: 'promotion' },
    { id: 'tag2', name: '新品首发', type: 'new' },
    { id: 'tag3', name: '官方正品', type: 'official' },
    { id: 'tag4', name: '包邮', type: 'shipping' },
  ],
  price: 599,
  originalPrice: 799,
  discount: 7.5,
  mediaList: [
    { id: 'm1', type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4', coverUrl: 'https://picsum.photos/800/800?random=0', sort: 0 },
    { id: 'm2', type: 'image', url: 'https://picsum.photos/800/800?random=1', sort: 1 },
    { id: 'm3', type: 'image', url: 'https://picsum.photos/800/800?random=2', sort: 2 },
    { id: 'm4', type: 'image', url: 'https://picsum.photos/800/800?random=3', sort: 3 },
    { id: 'm5', type: 'image', url: 'https://picsum.photos/800/800?random=4', sort: 4 },
  ],
  coupons: [
    { id: 'c1', name: '满500减50', discount: 50, threshold: 500, validStart: '2024-01-01', validEnd: '2026-12-31', status: 'available' },
    { id: 'c2', name: '满800减100', discount: 100, threshold: 800, validStart: '2024-01-01', validEnd: '2026-12-31', status: 'available' },
    { id: 'c3', name: '满1000减200', discount: 200, threshold: 1000, validStart: '2024-01-01', validEnd: '2026-06-30', status: 'claimed' },
  ],
  promotions: [
    { id: 'p1', description: '每满300减30', endTime: '2026-06-18T23:59:59Z' },
  ],
  skuDimensions: [
    {
      id: 'color',
      name: '颜色',
      options: [
        { id: 'black', name: '经典黑', imageUrl: 'https://picsum.photos/100/100?random=10' },
        { id: 'brown', name: '复古棕', imageUrl: 'https://picsum.photos/100/100?random=11' },
        { id: 'white', name: '奶白色', imageUrl: 'https://picsum.photos/100/100?random=12' },
      ],
    },
    {
      id: 'size',
      name: '尺码',
      options: [
        { id: 'small', name: '小号' },
        { id: 'medium', name: '中号' },
        { id: 'large', name: '大号' },
      ],
    },
  ],
  skuList: [
    { skuId: 'sku001', specIds: ['black', 'small'], price: 599, originalPrice: 799, stock: 50 },
    { skuId: 'sku002', specIds: ['black', 'medium'], price: 649, originalPrice: 849, stock: 30 },
    { skuId: 'sku003', specIds: ['black', 'large'], price: 699, originalPrice: 899, stock: 0 },
    { skuId: 'sku004', specIds: ['brown', 'small'], price: 599, originalPrice: 799, stock: 20 },
    { skuId: 'sku005', specIds: ['brown', 'medium'], price: 649, originalPrice: 849, stock: 15 },
    { skuId: 'sku006', specIds: ['brown', 'large'], price: 699, originalPrice: 899, stock: 8 },
    { skuId: 'sku007', specIds: ['white', 'small'], price: 619, originalPrice: 819, stock: 10 },
    { skuId: 'sku008', specIds: ['white', 'medium'], price: 669, originalPrice: 869, stock: 5 },
    { skuId: 'sku009', specIds: ['white', 'large'], price: 719, originalPrice: 919, stock: 0 },
  ],
  detailBlocks: [
    { id: 'd1', type: 'text', content: '采用头层牛皮精制而成，手感柔软细腻，质感高级。简约大气的设计风格，适合日常通勤与各种场合搭配。' },
    { id: 'd2', type: 'image', content: 'https://picsum.photos/750/1000?random=20' },
    { id: 'd3', type: 'params', content: '', params: [
      { label: '材质', value: '头层牛皮' },
      { label: '尺寸', value: '25cm × 18cm × 10cm' },
      { label: '重量', value: '约0.6kg' },
      { label: '产地', value: '中国广州' },
      { label: '适用场景', value: '通勤、约会、逛街' },
      { label: '内部结构', value: '主袋×1，内袋×2，卡位×4' },
    ]},
    { id: 'd4', type: 'image', content: 'https://picsum.photos/750/1000?random=21' },
    { id: 'd5', type: 'video', content: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 'd6', type: 'image', content: 'https://picsum.photos/750/1000?random=22' },
  ],
  reviews: [
    {
      id: 'r1', userId: 'u1', userName: '小*子', rating: 5,
      content: '包包质量非常好，皮质很柔软，颜色也很正，很满意的一次购物！',
      images: ['https://picsum.photos/400/400?random=30', 'https://picsum.photos/400/400?random=31'],
      specs: '经典黑 / 中号', createdAt: '2024-12-01', likeCount: 128,
    },
    {
      id: 'r2', userId: 'u2', userName: '优*购物', rating: 5,
      content: '做工精细，五金件质感很好，背起来很轻便，容量也够日常使用。',
      images: ['https://picsum.photos/400/400?random=32'],
      specs: '复古棕 / 小号', createdAt: '2024-11-25', likeCount: 86,
    },
    {
      id: 'r3', userId: 'u3', userName: '时*达人', rating: 4,
      content: '整体不错，就是肩带稍微短了一点，希望可以出加长款。',
      specs: '奶白色 / 中号', createdAt: '2024-11-20', likeCount: 45,
    },
  ],
  reviewSummary: {
    total: 2568,
    positiveRate: 96.5,
    tags: [
      { name: '质感好', count: 890 },
      { name: '做工精细', count: 756 },
      { name: '颜色正', count: 623 },
      { name: '容量大', count: 412 },
      { name: '物流快', count: 387 },
    ],
  },
  faqList: [
    { id: 'f1', question: '发货时间是多久？', answer: '下单后48小时内发出，顺丰包邮，一般2-3天到达。' },
    { id: 'f2', question: '包包的尺寸怎么选？', answer: '小号适合日常轻便出行，中号适合通勤放A4纸，大号适合短途旅行。' },
    { id: 'f3', question: '支持退换货吗？', answer: '支持7天无理由退换货，退货包运费。' },
    { id: 'f4', question: '皮质如何保养？', answer: '避免阳光直射和潮湿环境，定期用皮革护理油擦拭，不使用时用防尘袋收纳。' },
    { id: 'f5', question: '保修多长时间？', answer: '提供一年免费保修服务，包含五金件损坏、走线脱落等工艺问题。' },
  ],
  recommendations: [],
  isFavorited: false,
  salesCount: 12680,
};

export const mockRecommendations: RecommendProduct[] = [
  { id: 'rec1', title: '简约通勤托特包', imageUrl: 'https://picsum.photos/300/300?random=40', price: 459, originalPrice: 599, tags: ['热卖'], salesCount: 8900, type: 'similar' },
  { id: 'rec2', title: '链条斜挎小方包', imageUrl: 'https://picsum.photos/300/300?random=41', price: 329, originalPrice: 429, tags: ['新品'], salesCount: 5600, type: 'similar' },
  { id: 'rec3', title: '大容量双肩包', imageUrl: 'https://picsum.photos/300/300?random=42', price: 699, salesCount: 3200, type: 'match' },
  { id: 'rec4', title: '真皮卡包钱包套装', imageUrl: 'https://picsum.photos/300/300?random=43', price: 199, originalPrice: 299, salesCount: 15600, type: 'match' },
  { id: 'rec5', title: '复古手提公文包', imageUrl: 'https://picsum.photos/300/300?random=44', price: 899, tags: ['限时折扣'], salesCount: 2100, type: 'hot' },
  { id: 'rec6', title: '迷你水桶包', imageUrl: 'https://picsum.photos/300/300?random=45', price: 389, originalPrice: 489, salesCount: 7800, type: 'guess' },
  { id: 'rec7', title: '编织手拿包', imageUrl: 'https://picsum.photos/300/300?random=46', price: 259, salesCount: 4500, type: 'guess' },
  { id: 'rec8', title: '帆布拼接单肩包', imageUrl: 'https://picsum.photos/300/300?random=47', price: 189, originalPrice: 239, salesCount: 11200, type: 'guess' },
];

export const mockReviewList: ReviewListResponse = {
  list: mockProductDetail.reviews,
  total: 2568,
  page: 1,
  pageSize: 10,
};
