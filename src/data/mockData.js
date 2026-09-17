// BÔNG catalog fixture. Product names, shades and reference prices are based on
// public brand listings; editorial images use the Unsplash license and are not
// presented as official packshots.
const realProductImages = {
  red: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Crystal_Hearts_Lipstick_Review.jpg?download=1',
  pink: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Lipstick-_My_top_5%21_-_18072840654.jpg?download=1',
  hearts: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Crystal_Hearts_Lipstick_Review.jpg?download=1',
  collection: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Lipstick-_My_top_5%21_-_18072840654.jpg?download=1',
}

const customerProductImages = {
  dior999: '/images/products/dior-999-velvet-2-1.png',
  dior999Gallery: [
    '/images/products/dior-999-velvet-2-1.png',
    '/images/products/dior-999-velvet-4-3.png',
    '/images/products/dior-999-velvet.webp',
  ],
  dior720Gallery: [
    '/images/products/dior-720-icone-1.jpg',
    '/images/products/dior-720-icone-2.jpg',
    '/images/products/dior-720-icone-3.jpg',
  ],
  diorAddict720Gallery: [
    '/images/products/dior-addict-720-icone-1.webp',
    '/images/products/dior-addict-720-icone-2.jpg',
    '/images/products/dior-addict-720-icone-3.webp',
    '/images/products/dior-addict-720-icone-4.webp',
  ],
  diorOnStageInkGallery: [
    '/images/products/dior-on-stage-ink/shade-100.jpg',
    '/images/products/dior-on-stage-ink/shade-122.jpg',
    '/images/products/dior-on-stage-ink/shade-200.jpg',
    '/images/products/dior-on-stage-ink/shade-217.png',
    '/images/products/dior-on-stage-ink/shade-458.jpg',
    '/images/products/dior-on-stage-ink/shade-480.jpg',
    '/images/products/dior-on-stage-ink/shade-558.png',
    '/images/products/dior-on-stage-ink/shade-999.jpg',
  ],
}

const image = (id) => {
  if (id.includes('1586495777744')) return realProductImages.red
  if (id.includes('1512496015851')) return '/images/eye.jpg'
  return '/images/beauty.jpg'
}

export const categories = ['Tất cả', 'Son môi', 'Trang điểm mặt', 'Trang điểm mắt', 'Skincare', 'Quà tặng']
export const marketplaceSources = [
  { id: 'bong', label: 'BÔNG Beauty', shortLabel: 'BÔNG', tone: 'rose' },
  { id: 'official', label: 'Official brand', shortLabel: 'Official', tone: 'dark' },
]

const brandLinks = {
  Dior: 'https://www.dior.com/en_int/beauty',
  Chanel: 'https://www.chanel.com/us/makeup/',
  YSL: 'https://www.yslbeautyus.com/makeup/',
  Merzy: 'https://merzycosmetic.com/',
  'Black Rouge': 'https://blackrouge.com/',
  'Rom&nd': 'https://romand.us/',
  '3CE': 'https://stylenanda.com/',
  Lancôme: 'https://www.lancome-usa.com/makeup/',
  'Tom Ford': 'https://www.tomfordbeauty.com/',
  Burberry: 'https://us.burberry.com/beauty/',
  Gucci: 'https://www.gucci.com/us/en/ca/beauty-c-makeup',
}

const shop = (data) => ({
  verified: true,
  province: 'Hà Nội',
  district: 'Hoàn Kiếm',
  category: 'Son môi',
  priceRange: '280K – 2,4M',
  rating: '4,9',
  reviews: 320,
  distance: '0,8 km',
  phone: '090 818 2020',
  address: '18 Nhà Chung, Hoàn Kiếm, Hà Nội',
  description: 'Tư vấn shade trực tiếp, thử màu dưới ánh sáng tự nhiên và gói quà miễn phí.',
  linksAreDemo: false,
  links: { website: 'https://bongbeauty.vn', facebook: 'https://www.facebook.com/' },
  coordinates: { lat: 21.0287, lng: 105.8498 },
  image: image('photo-1596462502278-27bfdc403348'),
  imageAlt: 'Bàn trang điểm với các sản phẩm mỹ phẩm tông hồng',
  ...data,
})

export const shops = [
  shop({ id: 'bong-hoan-kiem', name: 'BÔNG Beauty · Nhà Chung', accent: 'rose' }),
  shop({ id: 'bong-tay-ho', name: 'BÔNG Beauty · Tây Hồ', district: 'Tây Hồ', address: '52 Xuân Diệu, Tây Hồ, Hà Nội', distance: '4,2 km', coordinates: { lat: 21.0618, lng: 105.8235 }, image: image('photo-1522335789203-a90fb38ba796') }),
  shop({ id: 'bong-online', name: 'BÔNG Online Concierge', district: 'Đống Đa', address: 'Tư vấn online toàn quốc', distance: 'Online', coordinates: { lat: 21.0162, lng: 105.8246 }, image: image('photo-1512496015851-a90fb38ba796') }),
]

const product = (data) => ({
  stockStatus: data.stock > 0 ? data.stock < 4 ? 'Sắp hết' : 'Còn hàng' : 'Hết hàng',
  imageAlt: `Ảnh minh họa ${data.name}`,
  marketplaceSource: data.marketplaceSource || 'bong',
  sourceLabel: data.sourceLabel || 'BÔNG Beauty',
  outboundUrl: data.outboundUrl || brandLinks[data.brand] || 'https://bongbeauty.vn',
  variants: [],
  image: data.image || realProductImages.red,
  ...data,
})

const lipstickImage = 'photo-1586495777744-4413f21062fa'
const beautyImage = 'photo-1596462502278-27bfdc403348'
const eyeImage = 'photo-1512496015851-a90fb38ba796'

export const products = [
  product({ id: 'p-dior-999', shopId: 'bong-hoan-kiem', brand: 'Dior', category: 'Son môi', name: 'Dior Rouge Dior 999 Velvet', price: '1.050.000đ', oldPrice: '1.250.000đ', tag: 'Iconic red', stock: 8, finish: 'Velvet lì mịn', need: 'Đi tiệc · sang trọng', image: customerProductImages.dior999, images: customerProductImages.dior999Gallery, color: 'rose', variants: [{ name: 'Shade', values: ['999 Velvet'] }], sourceLabel: 'Customer-provided image', marketplaceSource: 'official' }),
  product({ id: 'p-chanel-rouge', shopId: 'bong-hoan-kiem', brand: 'Chanel', category: 'Son môi', name: 'Chanel Rouge Allure 99 Pirate', price: '1.180.000đ', tag: 'Luxury', stock: 5, finish: 'Satin ánh nhẹ', need: 'Đỏ cổ điển · tôn da', image: realProductImages.pink, color: 'terracotta', variants: [{ name: 'Shade', values: ['99 Pirate'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-ysl-rouge', shopId: 'bong-tay-ho', brand: 'YSL', category: 'Son môi', name: 'YSL Rouge Pur Couture 1 Le Rouge', price: '1.050.000đ', tag: 'Best seller', stock: 6, finish: 'Satin căng môi', need: 'Hẹn hò · nổi bật', image: image(lipstickImage), color: 'rose', variants: [{ name: 'Shade', values: ['01 Le Rouge'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-merzy-m2', shopId: 'bong-online', brand: 'Merzy', category: 'Son môi', name: 'Merzy The First Velvet Tint M2 Jane', price: '189.000đ', oldPrice: '239.000đ', tag: 'Giá yêu', stock: 14, finish: 'Velvet tint lâu trôi', need: 'Hằng ngày · tiết kiệm', image: image(lipstickImage), color: 'rose', variants: [{ name: 'Shade', values: ['M2 Jane'] }], sourceLabel: 'BÔNG Beauty' }),
  product({ id: 'p-black-rouge', shopId: 'bong-online', brand: 'Black Rouge', category: 'Son môi', name: 'Black Rouge Air Fit Velvet Tint A06', price: '159.000đ', tag: 'Dễ dùng', stock: 11, finish: 'Velvet tint', need: 'Đi học · đi làm', image: image(lipstickImage), color: 'terracotta', variants: [{ name: 'Shade', values: ['A06 Brick Red'] }] }),
  product({ id: 'p-romand-23', shopId: 'bong-tay-ho', brand: 'Rom&nd', category: 'Son môi', name: 'Rom&nd Juicy Lasting Tint 23 Nucadamia', price: '229.000đ', tag: 'Trending', stock: 9, finish: 'Juicy bóng nhẹ', need: 'Môi căng mọng · MLBB', image: realProductImages.hearts, color: 'rose', variants: [{ name: 'Shade', values: ['23 Nucadamia'] }] }),
  product({ id: 'p-3ce-chili', shopId: 'bong-hoan-kiem', brand: '3CE', category: 'Son môi', name: '3CE Blur Water Tint Chasing Rose', price: '390.000đ', stock: 4, finish: 'Blur tint mờ môi', need: 'Makeup Hàn · tự nhiên', image: image(lipstickImage), color: 'rose', variants: [{ name: 'Shade', values: ['Chasing Rose'] }] }),
  product({ id: 'p-lancome', shopId: 'bong-hoan-kiem', brand: 'Lancôme', category: 'Son môi', name: 'Lancôme L’Absolu Rouge 274 French Touch', price: '920.000đ', tag: 'Premium', stock: 3, finish: 'Cream mượt môi', need: 'Môi khô · dưỡng ẩm', image: image(lipstickImage), color: 'terracotta', variants: [{ name: 'Shade', values: ['274 French Touch'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-tom-ford', shopId: 'bong-hoan-kiem', brand: 'Tom Ford', category: 'Quà tặng', name: 'Tom Ford Lip Color 16 Scarlet Rouge', price: '1.650.000đ', tag: 'Luxury gift', stock: 2, finish: 'Cream satin', need: 'Quà tặng · sưu tầm', image: realProductImages.collection, color: 'gold', variants: [{ name: 'Shade', values: ['16 Scarlet Rouge'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-burberry', shopId: 'bong-tay-ho', brand: 'Burberry', category: 'Son môi', name: 'Burberry Kisses 109 Military Red', price: '980.000đ', stock: 3, finish: 'Satin sheer', need: 'Thanh lịch · công sở', image: image(lipstickImage), color: 'terracotta', variants: [{ name: 'Shade', values: ['109 Military Red'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-gucci', shopId: 'bong-hoan-kiem', brand: 'Gucci', category: 'Quà tặng', name: 'Gucci Rouge à Lèvres Goldie Red 25', price: '1.350.000đ', tag: 'Collector', stock: 2, finish: 'Lipstick satin', need: 'Quà tặng · fashionista', image: image(lipstickImage), color: 'gold', variants: [{ name: 'Shade', values: ['25 Goldie Red'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-face', shopId: 'bong-tay-ho', brand: 'BÔNG edit', category: 'Trang điểm mặt', name: 'Kem má dạng lỏng Soft Bloom', price: '320.000đ', tag: 'Tư vấn viên chọn', stock: 7, finish: 'Dewy tự nhiên', need: 'Da glowy · makeup nhanh', image: image(beautyImage), color: 'rose', variants: [{ name: 'Tone', values: ['Peach', 'Rose'] }] }),
  product({ id: 'p-eye', shopId: 'bong-online', brand: 'BÔNG edit', category: 'Trang điểm mắt', name: 'Bảng mắt 9 ô Everyday Muse', price: '420.000đ', stock: 6, finish: 'Matte & shimmer', need: 'Makeup đi làm', image: image(eyeImage), color: 'gold', variants: [{ name: 'Tone', values: ['Warm nude'] }] }),
  product({ id: 'p-care', shopId: 'bong-online', brand: 'BÔNG edit', category: 'Skincare', name: 'Son dưỡng phục hồi Petal Balm', price: '260.000đ', tag: 'Môi khô', stock: 12, finish: 'Bóng dưỡng', need: 'Môi khô · dùng mỗi ngày', image: image(beautyImage), color: 'rose', variants: [{ name: 'Mùi', values: ['Không mùi'] }] }),
  product({ id: 'p-dior-720', shopId: 'bong-hoan-kiem', brand: 'Dior', category: 'Son môi', name: 'Dior Rouge Dior 720 Icone Velvet', price: '1.050.000đ', stock: 5, finish: 'Velvet lì mịn', need: 'Hồng đất · đi làm', image: customerProductImages.dior720Gallery[0], images: customerProductImages.dior720Gallery, color: 'rose', variants: [{ name: 'Shade', values: ['720 Icone'] }], sourceLabel: 'Customer-provided image', marketplaceSource: 'official' }),
  product({ id: 'p-dior-on-stage-ink', shopId: 'bong-hoan-kiem', brand: 'Dior', category: 'Son môi', name: 'Rouge Dior On Stage Ink Blur Matte', price: 'Liên hệ', tag: 'Official Dior', stock: 0, finish: 'Liquid lì mờ · chống lem', need: 'Lì nhẹ môi · không chuyển màu', image: realProductImages.red, images: realProductImages.red ? customerProductImages.diorOnStageInkGallery : [], color: 'rose', variants: [{ name: 'Shade', values: ['100', '122', '200', '217', '458', '480', '558', '999'] }], sourceLabel: 'Dior.com official', marketplaceSource: 'official', outboundUrl: 'https://www.dior.com/en_vn/beauty/products/rouge-dior-on-stage-ink-Y0000242.html' }),
  product({ id: 'p-chanel-116', shopId: 'bong-hoan-kiem', brand: 'Chanel', category: 'Son môi', name: 'Chanel Rouge Allure 116 Êblouissante', price: '1.180.000đ', stock: 4, finish: 'Satin ánh nhẹ', need: 'Đỏ berry · tiệc tối', image: realProductImages.pink, color: 'terracotta', variants: [{ name: 'Shade', values: ['116 Êblouissante'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-ysl-21', shopId: 'bong-tay-ho', brand: 'YSL', category: 'Son môi', name: 'YSL Rouge Pur Couture 21 Rouge Paradoxe', price: '1.050.000đ', stock: 5, finish: 'Satin căng môi', need: 'Đỏ lạnh · nổi bật', image: realProductImages.red, color: 'rose', variants: [{ name: 'Shade', values: ['21 Rouge Paradoxe'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-merzy-v6', shopId: 'bong-online', brand: 'Merzy', category: 'Son môi', name: 'Merzy The First Velvet Tint V6 Firenze Negroni', price: '189.000đ', stock: 10, finish: 'Velvet tint lâu trôi', need: 'Đỏ nâu · cá tính', image: realProductImages.hearts, color: 'terracotta', variants: [{ name: 'Shade', values: ['V6 Firenze Negroni'] }] }),
  product({ id: 'p-merzy-m13', shopId: 'bong-online', brand: 'Merzy', category: 'Son môi', name: 'Merzy The First Velvet Tint M13 Seul', price: '189.000đ', stock: 8, finish: 'Velvet tint', need: 'Đỏ gạch · hằng ngày', image: realProductImages.collection, color: 'rose', variants: [{ name: 'Shade', values: ['M13 Seul'] }] }),
  product({ id: 'p-black-rouge-a12', shopId: 'bong-online', brand: 'Black Rouge', category: 'Son môi', name: 'Black Rouge Air Fit Velvet Tint A12 Dashed Brown', price: '159.000đ', stock: 13, finish: 'Velvet tint', need: 'Nâu cam · makeup Hàn', image: realProductImages.collection, color: 'terracotta', variants: [{ name: 'Shade', values: ['A12 Dashed Brown'] }] }),
  product({ id: 'p-black-rouge-a37', shopId: 'bong-online', brand: 'Black Rouge', category: 'Son môi', name: 'Black Rouge Air Fit Velvet Tint A37 Peach Ade', price: '159.000đ', stock: 9, finish: 'Velvet tint', need: 'Cam đào · trẻ trung', image: realProductImages.pink, color: 'rose', variants: [{ name: 'Shade', values: ['A37 Peach Ade'] }] }),
  product({ id: 'p-romand-06', shopId: 'bong-tay-ho', brand: 'Rom&nd', category: 'Son môi', name: 'Rom&nd Juicy Lasting Tint 06 Figfig', price: '229.000đ', stock: 12, finish: 'Juicy bóng nhẹ', need: 'Hồng mận · MLBB', image: realProductImages.hearts, color: 'rose', variants: [{ name: 'Shade', values: ['06 Figfig'] }] }),
  product({ id: 'p-romand-22', shopId: 'bong-tay-ho', brand: 'Rom&nd', category: 'Son môi', name: 'Rom&nd Juicy Lasting Tint 22 Pomelo Skin', price: '229.000đ', stock: 10, finish: 'Juicy bóng nhẹ', need: 'Cam nude · tự nhiên', image: realProductImages.pink, color: 'rose', variants: [{ name: 'Shade', values: ['22 Pomelo Skin'] }] }),
  product({ id: 'p-3ce-speak', shopId: 'bong-hoan-kiem', brand: '3CE', category: 'Son môi', name: '3CE Blur Water Tint Speak Up', price: '390.000đ', stock: 7, finish: 'Blur tint mờ môi', need: 'Đỏ hồng · dễ dùng', image: realProductImages.red, color: 'rose', variants: [{ name: 'Shade', values: ['Speak Up'] }] }),
  product({ id: 'p-3ce-chill', shopId: 'bong-hoan-kiem', brand: '3CE', category: 'Son môi', name: '3CE Velvet Lip Tint Chill Move', price: '390.000đ', stock: 6, finish: 'Velvet tint', need: 'Nâu lạnh · thời thượng', image: realProductImages.collection, color: 'terracotta', variants: [{ name: 'Shade', values: ['Chill Move'] }] }),
  product({ id: 'p-lancome-295', shopId: 'bong-hoan-kiem', brand: 'Lancôme', category: 'Son môi', name: 'Lancôme L’Absolu Rouge 295 French Touch', price: '920.000đ', stock: 4, finish: 'Cream mượt môi', need: 'Đỏ hồng · sang nhẹ', image: realProductImages.red, color: 'rose', variants: [{ name: 'Shade', values: ['295 French Touch'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-tomford-07', shopId: 'bong-hoan-kiem', brand: 'Tom Ford', category: 'Quà tặng', name: 'Tom Ford Lip Color 07 Ruby Rush', price: '1.650.000đ', stock: 2, finish: 'Cream satin', need: 'Đỏ ruby · quà tặng', image: realProductImages.collection, color: 'gold', variants: [{ name: 'Shade', values: ['07 Ruby Rush'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-burberry-93', shopId: 'bong-tay-ho', brand: 'Burberry', category: 'Son môi', name: 'Burberry Kisses 93 Russet', price: '980.000đ', stock: 3, finish: 'Satin sheer', need: 'Đỏ nâu · thanh lịch', image: realProductImages.pink, color: 'terracotta', variants: [{ name: 'Shade', values: ['93 Russet'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-gucci-505', shopId: 'bong-hoan-kiem', brand: 'Gucci', category: 'Quà tặng', name: 'Gucci Rouge à Lèvres 505 Janet Rust', price: '1.350.000đ', stock: 2, finish: 'Lipstick satin', need: 'Cam đất · fashionista', image: realProductImages.collection, color: 'gold', variants: [{ name: 'Shade', values: ['505 Janet Rust'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-dior-720-satin', shopId: 'bong-hoan-kiem', brand: 'Dior', category: 'Son môi', name: 'Dior Addict Shine Lipstick 720 Icône', price: '1.090.000đ', stock: 4, finish: 'Shine căng bóng', need: 'Môi mọng · hằng ngày', image: customerProductImages.diorAddict720Gallery[0], images: customerProductImages.diorAddict720Gallery, color: 'rose', variants: [{ name: 'Shade', values: ['720 Icône'] }], sourceLabel: 'Customer-provided image', marketplaceSource: 'official' }),
  product({ id: 'p-dior-760', shopId: 'bong-hoan-kiem', brand: 'Dior', category: 'Son môi', name: 'Dior Addict Shine Lipstick 760 Favori', price: '1.090.000đ', stock: 3, finish: 'Shine căng bóng', need: 'Hồng berry · nữ tính', image: realProductImages.hearts, color: 'rose', variants: [{ name: 'Shade', values: ['760 Favori'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-chanel-58', shopId: 'bong-hoan-kiem', brand: 'Chanel', category: 'Son môi', name: 'Chanel Rouge Allure 58 Rouge Vie', price: '1.180.000đ', stock: 4, finish: 'Satin ánh nhẹ', need: 'Đỏ hồng · thanh lịch', image: realProductImages.red, color: 'rose', variants: [{ name: 'Shade', values: ['58 Rouge Vie'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-chanel-152', shopId: 'bong-hoan-kiem', brand: 'Chanel', category: 'Son môi', name: 'Chanel Rouge Coco 152 Shake', price: '1.090.000đ', stock: 3, finish: 'Cream mềm môi', need: 'Cam san hô · tươi sáng', image: realProductImages.collection, color: 'terracotta', variants: [{ name: 'Shade', values: ['152 Shake'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-ysl-1966', shopId: 'bong-tay-ho', brand: 'YSL', category: 'Son môi', name: 'YSL Rouge Pur Couture 1966 Rouge Libre', price: '1.050.000đ', stock: 5, finish: 'Satin mịn môi', need: 'Đỏ cam · nổi bật', image: realProductImages.red, color: 'terracotta', variants: [{ name: 'Shade', values: ['1966 Rouge Libre'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-ysl-12', shopId: 'bong-tay-ho', brand: 'YSL', category: 'Son môi', name: 'YSL The Slim 12 Nu Incongru', price: '980.000đ', stock: 4, finish: 'Lì mảnh nhẹ môi', need: 'Nude hồng · công sở', image: realProductImages.collection, color: 'rose', variants: [{ name: 'Shade', values: ['12 Nu Incongru'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-merzy-v17', shopId: 'bong-online', brand: 'Merzy', category: 'Son môi', name: 'Merzy The First Velvet Tint V17 Firenze Negroni', price: '189.000đ', stock: 11, finish: 'Velvet tint lâu trôi', need: 'Đỏ gạch · cá tính', image: realProductImages.red, color: 'terracotta', variants: [{ name: 'Shade', values: ['V17 Firenze Negroni'] }] }),
  product({ id: 'p-merzy-m8', shopId: 'bong-online', brand: 'Merzy', category: 'Son môi', name: 'Merzy The First Velvet Tint M8 Firenze Negroni', price: '189.000đ', stock: 10, finish: 'Velvet tint', need: 'Đỏ nâu · đi tiệc', image: realProductImages.hearts, color: 'terracotta', variants: [{ name: 'Shade', values: ['M8 Firenze Negroni'] }] }),
  product({ id: 'p-black-rouge-a04', shopId: 'bong-online', brand: 'Black Rouge', category: 'Son môi', name: 'Black Rouge Air Fit Velvet Tint A04 Raspberry Syrup', price: '159.000đ', stock: 12, finish: 'Velvet tint', need: 'Đỏ mâm xôi · tôn da', image: realProductImages.red, color: 'rose', variants: [{ name: 'Shade', values: ['A04 Raspberry Syrup'] }] }),
  product({ id: 'p-black-rouge-a11', shopId: 'bong-online', brand: 'Black Rouge', category: 'Son môi', name: 'Black Rouge Air Fit Velvet Tint A11 Tanned Brick', price: '159.000đ', stock: 8, finish: 'Velvet tint', need: 'Đỏ nâu · makeup Hàn', image: realProductImages.collection, color: 'terracotta', variants: [{ name: 'Shade', values: ['A11 Tanned Brick'] }] }),
  product({ id: 'p-romand-07', shopId: 'bong-tay-ho', brand: 'Rom&nd', category: 'Son môi', name: 'Rom&nd Juicy Lasting Tint 07 Jujube', price: '229.000đ', stock: 11, finish: 'Juicy bóng nhẹ', need: 'Đỏ nâu · MLBB', image: realProductImages.hearts, color: 'terracotta', variants: [{ name: 'Shade', values: ['07 Jujube'] }] }),
  product({ id: 'p-romand-19', shopId: 'bong-tay-ho', brand: 'Rom&nd', category: 'Son môi', name: 'Rom&nd Juicy Lasting Tint 19 Almond Rose', price: '229.000đ', stock: 9, finish: 'Juicy bóng nhẹ', need: 'Hồng đất · hằng ngày', image: realProductImages.pink, color: 'rose', variants: [{ name: 'Shade', values: ['19 Almond Rose'] }] }),
  product({ id: 'p-3ce-go-now', shopId: 'bong-hoan-kiem', brand: '3CE', category: 'Son môi', name: '3CE Blur Water Tint Go Now', price: '390.000đ', stock: 5, finish: 'Blur tint mờ môi', need: 'Đỏ hồng · trẻ trung', image: realProductImages.red, color: 'rose', variants: [{ name: 'Shade', values: ['Go Now'] }] }),
  product({ id: 'p-3ce-double-wind', shopId: 'bong-hoan-kiem', brand: '3CE', category: 'Son môi', name: '3CE Velvet Lip Tint Double Wind', price: '390.000đ', stock: 5, finish: 'Velvet tint', need: 'Đỏ lạnh · thời thượng', image: realProductImages.hearts, color: 'rose', variants: [{ name: 'Shade', values: ['Double Wind'] }] }),
  product({ id: 'p-lancome-888', shopId: 'bong-hoan-kiem', brand: 'Lancôme', category: 'Son môi', name: 'Lancôme L’Absolu Rouge 888 French Touch', price: '920.000đ', stock: 3, finish: 'Cream mượt môi', need: 'Đỏ ruby · sang trọng', image: realProductImages.red, color: 'rose', variants: [{ name: 'Shade', values: ['888 French Touch'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-lancome-274', shopId: 'bong-hoan-kiem', brand: 'Lancôme', category: 'Son môi', name: 'Lancôme L’Absolu Rouge Drama Ink 274', price: '890.000đ', stock: 4, finish: 'Liquid lì nhẹ môi', need: 'Đỏ nâu · lâu trôi', image: realProductImages.collection, color: 'terracotta', variants: [{ name: 'Shade', values: ['274'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-tomford-100', shopId: 'bong-hoan-kiem', brand: 'Tom Ford', category: 'Quà tặng', name: 'Tom Ford Lip Color 100 Dismantle', price: '1.650.000đ', stock: 2, finish: 'Cream satin', need: 'Nude hồng · luxury', image: realProductImages.pink, color: 'gold', variants: [{ name: 'Shade', values: ['100 Dismantle'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-burberry-407', shopId: 'bong-tay-ho', brand: 'Burberry', category: 'Son môi', name: 'Burberry Kisses 407 English Rose', price: '980.000đ', stock: 3, finish: 'Satin sheer', need: 'Hồng rose · thanh lịch', image: realProductImages.pink, color: 'rose', variants: [{ name: 'Shade', values: ['407 English Rose'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-burberry-429', shopId: 'bong-tay-ho', brand: 'Burberry', category: 'Son môi', name: 'Burberry Kisses 429 Military Red', price: '980.000đ', stock: 2, finish: 'Satin sheer', need: 'Đỏ lạnh · cổ điển', image: realProductImages.red, color: 'rose', variants: [{ name: 'Shade', values: ['429 Military Red'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-gucci-25', shopId: 'bong-hoan-kiem', brand: 'Gucci', category: 'Quà tặng', name: 'Gucci Rouge à Lèvres 25 Goldie Red', price: '1.350.000đ', stock: 2, finish: 'Lipstick satin', need: 'Đỏ tươi · collector', image: realProductImages.red, color: 'gold', variants: [{ name: 'Shade', values: ['25 Goldie Red'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
  product({ id: 'p-gucci-208', shopId: 'bong-hoan-kiem', brand: 'Gucci', category: 'Quà tặng', name: 'Gucci Rouge à Lèvres 208 They Met in Argentina', price: '1.350.000đ', stock: 2, finish: 'Lipstick satin', need: 'Hồng đỏ · fashionista', image: realProductImages.hearts, color: 'rose', variants: [{ name: 'Shade', values: ['208 They Met in Argentina'] }], sourceLabel: 'Official brand', marketplaceSource: 'official' }),
]
