// Demo-only catalog fixture. Images are temporary Unsplash samples, not shop-owned inventory.
import { vietnamProvinces, provinceRegions } from './vietnamProvinces'

const sampleImage = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const categories = ['Tất cả', 'Váy & đầm', 'Áo kiểu', 'Quần', 'Phụ kiện', 'Đồ công sở']

export const shops = [
  { id: 'may-studio', name: 'Mây Studio', province: 'Hà Nội', district: 'Hoàn Kiếm', category: 'Váy & đầm', description: 'Nàng thơ hiện đại, nhẹ nhàng nhưng luôn có điểm nhấn.', address: '42 Nhà Chung, Hoàn Kiếm, Hà Nội', phone: '098 765 4321', distance: '0,8 km', priceRange: '350K – 1,2M', rating: '4,9', reviews: 128, verified: true, coordinates: { lat: 21.0287, lng: 105.8498 }, image: sampleImage('photo-1496747611176-843222e1e57c'), imageAlt: 'Trang phục nữ tông be trong studio', accent: 'beige' },
  { id: 'nang-tho', name: 'Nàng Thơ', province: 'Hà Nội', district: 'Hoàn Kiếm', category: 'Đồ công sở', description: 'Đi làm thanh lịch, đi chơi vẫn thật là mình.', address: '18 Trần Quốc Toản, Hoàn Kiếm, Hà Nội', phone: '091 234 5678', distance: '1,4 km', priceRange: '280K – 890K', rating: '4,8', reviews: 96, verified: true, coordinates: { lat: 21.0197, lng: 105.8492 }, image: sampleImage('photo-1551488831-00ddcb6c6bd3'), imageAlt: 'Các mẫu áo và chân váy thời trang nữ', accent: 'lilac' },
  { id: 'tiem-nha-bom', name: 'Tiệm Nhà Bơm', province: 'Hà Nội', district: 'Hoàn Kiếm', category: 'Áo kiểu', description: 'Những món đồ nhỏ xinh cho ngày thường thêm vui.', address: '7 Ngõ Tràng Tiền, Hoàn Kiếm, Hà Nội', phone: '097 556 7788', distance: '2,1 km', priceRange: '190K – 650K', rating: '4,7', reviews: 74, verified: true, coordinates: { lat: 21.0255, lng: 105.8552 }, image: sampleImage('photo-1506629905607-d9ccf2a6e6a6'), imageAlt: 'Nữ người mẫu mặc áo kiểu sáng màu', accent: 'blue' },
  { id: 'mot-nua', name: 'Một Nửa', province: 'Hà Nội', district: 'Đống Đa', category: 'Quần', description: 'Phom dáng thoải mái cho nhịp sống thành thị.', address: '31 Đặng Văn Ngữ, Đống Đa, Hà Nội', phone: '096 312 4567', distance: '3,6 km', priceRange: '320K – 980K', rating: '4,8', reviews: 61, verified: true, coordinates: { lat: 21.0162, lng: 105.8246 }, image: sampleImage('photo-1483985988355-763728e1935b'), imageAlt: 'Không gian shop thời trang nữ hiện đại', accent: 'rose' },
  { id: 'hiem-studio', name: 'Hiên Studio', province: 'Hà Nội', district: 'Tây Hồ', category: 'Phụ kiện', description: 'Phụ kiện thủ công làm mềm mọi bộ đồ.', address: '12 Xuân Diệu, Tây Hồ, Hà Nội', phone: '090 818 2020', distance: '4,8 km', priceRange: '150K – 780K', rating: '4,9', reviews: 43, verified: true, coordinates: { lat: 21.0618, lng: 105.8235 }, image: sampleImage('photo-1529139574466-a303027c1d8b'), imageAlt: 'Phụ kiện và trang phục nữ được sắp đặt', accent: 'gold' },
  { id: 'gom-fashion', name: 'Gốm Fashion', province: 'Hà Nội', district: 'Hoàn Kiếm', category: 'Váy & đầm', description: 'Chất liệu tự nhiên, bảng màu lấy cảm hứng từ phố cũ.', address: '88 Hàng Gai, Hoàn Kiếm, Hà Nội', phone: '093 420 6868', distance: '1,1 km', priceRange: '450K – 1,5M', rating: '4,6', reviews: 38, verified: true, coordinates: { lat: 21.0339, lng: 105.8493 }, image: sampleImage('photo-1515886657613-9f3515b0c78f'), imageAlt: 'Trang phục nữ phong cách tối giản', accent: 'terracotta' },
]

// One synthetic, discoverable fixture per additional province/city. Coordinates,
// names, phone numbers and inventory are placeholders for UI demonstration only.
shops.push(...vietnamProvinces.filter((province) => province !== 'Hà Nội').map((province, index) => ({
  id: `demo-${index + 1}`,
  name: `Nét ${province}`,
  province,
  region: provinceRegions[province] || 'Khu vực Việt Nam',
  category: categories[(index % (categories.length - 1)) + 1],
  description: `Không gian thời trang nữ mẫu tại ${province}, dùng để minh họa trải nghiệm tìm kiếm toàn quốc.`,
  address: `Địa chỉ mẫu, ${province}, Việt Nam`,
  phone: '090 000 0000',
  distance: 'Chưa tính',
  priceRange: '250K – 950K',
  rating: 'Mẫu',
  reviews: 0,
  verified: true,
  coordinates: { lat: 9.2 + (index % 18) * 0.72, lng: 102.1 + (index % 12) * 0.45 },
  image: sampleImage(['photo-1496747611176-843222e1e57c', 'photo-1483985988355-763728e1935b', 'photo-1515886657613-9f3515b0c78f'][index % 3]),
  imageAlt: `Ảnh mẫu thời trang nữ tại ${province}`,
  accent: ['beige', 'lilac', 'blue'][index % 3],
})))

const product = (data) => ({
  stockStatus: data.stock > 0 ? data.stock < 4 ? 'Sắp hết' : 'Còn hàng' : 'Hết hàng',
  imageAlt: `Ảnh mẫu sản phẩm ${data.name}, hình minh họa`,
  variants: [],
  ...data,
})

export const products = [
  product({ id: 'p1', shopId: 'may-studio', category: 'Váy & đầm', name: 'Váy Linen Nắng Mai', price: '690.000đ', oldPrice: '820.000đ', tag: 'Bán chạy', stock: 8, variants: [{ name: 'Màu', values: ['Kem', 'Nâu đất'] }, { name: 'Size', values: ['S', 'M', 'L'] }], image: sampleImage('photo-1496217590455-aa63a8350eea', 700), color: 'beige' }),
  product({ id: 'p2', shopId: 'nang-tho', category: 'Đồ công sở', name: 'Áo Sơ Mi Mộc Miên', price: '420.000đ', tag: 'Mới về', stock: 12, variants: [{ name: 'Màu', values: ['Trắng', 'Xanh nhạt'] }, { name: 'Size', values: ['S', 'M', 'L'] }], image: sampleImage('photo-1605763240000-7e93b172d754', 700), color: 'lilac' }),
  product({ id: 'p3', shopId: 'may-studio', category: 'Váy & đầm', name: 'Chân Váy Midi Hạ', price: '550.000đ', stock: 3, variants: [{ name: 'Màu', values: ['Xanh khói', 'Đen'] }, { name: 'Size', values: ['S', 'M'] }], image: sampleImage('photo-1551488831-00ddcb6c6bd3', 700), color: 'blue' }),
  product({ id: 'p4', shopId: 'tiem-nha-bom', category: 'Áo kiểu', name: 'Áo Peplum Cúc Ngọc', price: '390.000đ', stock: 0, variants: [{ name: 'Màu', values: ['Hồng phấn', 'Trắng'] }, { name: 'Size', values: ['M', 'L'] }], image: sampleImage('photo-1564257577054-2e7f8d50b3b3', 700), color: 'rose' }),
  product({ id: 'p5', shopId: 'mot-nua', category: 'Quần', name: 'Quần Suông An Nhiên', price: '480.000đ', tag: 'Dễ mặc', stock: 7, variants: [{ name: 'Màu', values: ['Đen', 'Nâu'] }, { name: 'Size', values: ['S', 'M', 'L', 'XL'] }], image: sampleImage('photo-1594633312681-425c7b97ccd1', 700), color: 'sand' }),
  product({ id: 'p6', shopId: 'hiem-studio', category: 'Phụ kiện', name: 'Túi Cói Mùa Hạ', price: '320.000đ', stock: 5, variants: [{ name: 'Màu', values: ['Tự nhiên'] }], image: sampleImage('photo-1553062407-98eeb64c6a62', 700), color: 'gold' }),
  product({ id: 'p7', shopId: 'gom-fashion', category: 'Váy & đầm', name: 'Đầm Cổ Vuông Gốm', price: '790.000đ', tag: 'Mới về', stock: 2, variants: [{ name: 'Màu', values: ['Đỏ gạch', 'Kem'] }, { name: 'Size', values: ['S', 'M', 'L'] }], image: sampleImage('photo-1539008835657-9e8e9680c956', 700), color: 'terracotta' }),
  product({ id: 'p8', shopId: 'nang-tho', category: 'Đồ công sở', name: 'Blazer Vải Đũi', price: '890.000đ', stock: 4, variants: [{ name: 'Màu', values: ['Be', 'Navy'] }, { name: 'Size', values: ['S', 'M', 'L'] }], image: sampleImage('photo-1591369822096-ffd140ec948f', 700), color: 'beige' }),
  product({ id: 'p9', shopId: 'tiem-nha-bom', category: 'Áo kiểu', name: 'Áo Ren Ngày Nắng', price: '350.000đ', stock: 9, variants: [{ name: 'Màu', values: ['Trắng'] }, { name: 'Size', values: ['S', 'M'] }], image: sampleImage('photo-1596755389378-c31d21fd1273', 700), color: 'white' }),
  product({ id: 'p10', shopId: 'mot-nua', category: 'Quần', name: 'Jeans Ống Đứng Phố', price: '620.000đ', tag: 'Bán chạy', stock: 6, variants: [{ name: 'Màu', values: ['Xanh denim'] }, { name: 'Size', values: ['26', '27', '28', '29'] }], image: sampleImage('photo-1541099649105-f69ad21f3246', 700), color: 'denim' }),
  product({ id: 'p11', shopId: 'hiem-studio', category: 'Phụ kiện', name: 'Khăn Lụa Vẽ Tay', price: '280.000đ', stock: 1, variants: [{ name: 'Màu', values: ['Vàng nghệ', 'Xanh rêu'] }], image: sampleImage('photo-1601924994987-69e26d50dc26', 700), color: 'gold' }),
  product({ id: 'p12', shopId: 'gom-fashion', category: 'Váy & đầm', name: 'Váy Hai Dây Hoàng Hôn', price: '740.000đ', stock: 10, variants: [{ name: 'Màu', values: ['Cam đất', 'Nâu'] }, { name: 'Size', values: ['S', 'M', 'L'] }], image: sampleImage('photo-1515372039744-b8f02a3ae446', 700), color: 'terracotta' }),
]

products.push(...shops.filter((shop) => shop.province !== 'Hà Nội').map((shop, index) => product({
  id: `national-p-${index + 1}`,
  shopId: shop.id,
  province: shop.province,
  category: shop.category,
  name: `Mẫu ${shop.category} ${shop.province}`,
  price: `${320 + (index % 7) * 70}.000đ`,
  tag: index % 3 === 0 ? 'Mẫu mới' : '',
  stock: 2 + (index % 11),
  variants: [{ name: 'Màu', values: ['Kem', 'Xanh', 'Đen'] }, { name: 'Size', values: ['S', 'M', 'L'] }],
  image: shop.image.replace('w=900', 'w=700'),
  color: shop.accent,
})))
