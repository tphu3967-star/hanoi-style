import { useMemo, useState } from 'react'
import { catalogActions, createMockCatalog } from './data/catalogStore'
import { MAP_CONFIG } from './config/map'
import { createDirectionsUrl, formatDistance, haversineDistanceKm } from './utils/location'
import { createMockCatalogAdapter, runCatalogSync } from './integrations/catalogAdapter'
import { PLACES_CONFIG, createPlacesSearchUrl } from './config/places'
import { getShopDistrict, hanoiDistricts, matchesHanoiText } from './utils/search'

const Icon = ({ children, size = 18 }) => <span className="icon" style={{ fontSize: size }}>{children}</span>

function App() {
  const [catalog, setCatalog] = useState(createMockCatalog)
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [query, setQuery] = useState('')
  const [selectedShop, setSelectedShop] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [view, setView] = useState('public')
  const [userLocation, setUserLocation] = useState(null)
  const [locationStatus, setLocationStatus] = useState('idle')
  const [activeDistrict, setActiveDistrict] = useState('Tất cả khu vực')

  const visibleShops = catalog.shops.filter((shop) => shop.verified)
  const filteredShops = useMemo(() => visibleShops.filter((shop) => {
    const matchesCategory = activeCategory === 'Tất cả' || shop.category === activeCategory
    const matchesDistrict = activeDistrict === 'Tất cả khu vực' || getShopDistrict(shop) === activeDistrict
    const matchesSearch = matchesHanoiText(`${shop.name} ${shop.address} ${shop.category} ${getShopDistrict(shop)}`, query)
    return matchesCategory && matchesDistrict && matchesSearch
  }), [activeCategory, activeDistrict, query, catalog.shops])
  const visibleProducts = useMemo(() => catalog.products.filter((product) => {
    const search = query.trim().toLowerCase()
    const matchesShop = !selectedShop || product.shopId === selectedShop.id
    const matchesCategory = activeCategory === 'Tất cả' || product.category === activeCategory
    const shop = catalog.shops.find((item) => item.id === product.shopId)
    const matchesSearch = matchesHanoiText(`${product.name} ${product.category} ${shop?.name || ''} ${shop?.address || ''} ${getShopDistrict(shop)}`, query)
    const matchesDistrict = activeDistrict === 'Tất cả khu vực' || getShopDistrict(shop) === activeDistrict
    return matchesShop && matchesCategory && matchesDistrict && matchesSearch
  }), [catalog.products, catalog.shops, selectedShop, activeCategory, activeDistrict, query])
  const distanceFor = (shop) => formatDistance(haversineDistanceKm(userLocation, shop.coordinates), shop.distance || 'Khoảng cách chưa có')
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus('unavailable')
      return
    }
    setLocationStatus('loading')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { setUserLocation({ lat: coords.latitude, lng: coords.longitude }); setLocationStatus('success') },
      (error) => setLocationStatus(error.code === error.PERMISSION_DENIED ? 'denied' : 'unavailable'),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }

  if (view === 'admin') {
    return <AdminPreview catalog={catalog} onCatalogChange={setCatalog} onExit={() => setView('public')} />
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="logo" href="#" aria-label="HaNoiStyle trang chủ"><span>H</span> HaNoiStyle</a>
        <nav className="desktop-nav" aria-label="Điều hướng chính"><button onClick={() => scrollTo('shops')}>Khám phá</button><button onClick={() => scrollTo('products')}>Sản phẩm</button><button onClick={() => scrollTo('about')}>Về HaNoiStyle</button></nav>
        <div className="top-actions"><button className="location-pill" onClick={requestLocation}><Icon>⌖</Icon> {locationStatus === 'success' ? 'Đã định vị' : 'Hà Nội'} <span className="chevron">⌄</span></button><button className="admin-link" onClick={() => setView('admin')}>Quản trị demo</button><button className="menu-button" aria-label="Mở menu"><Icon size={23}>☰</Icon></button></div>
      </header>
      <main>
        <section className="hero"><div className="hero-copy"><p className="eyebrow"><span className="spark">✦</span> Local fashion, local love</p><h1>Mặc chất<br /><em>Hà Nội.</em></h1><p className="hero-intro">Tìm những cửa hàng thời trang nữ hay ho nhất quanh bạn — từ những con phố thân quen đến góc nhỏ chưa từng biết.</p><div className="search-box"><Icon size={20}>⌕</Icon><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Bạn đang tìm gì hôm nay?" aria-label="Tìm kiếm cửa hàng hoặc sản phẩm" />{query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Xóa tìm kiếm">×</button>}<button className="search-submit" onClick={() => scrollTo('shops')}>Tìm kiếm</button></div><div className="quick-search"><span>Tìm kiếm phổ biến</span><button onClick={() => setQuery('váy')}>váy đi tiệc</button><button onClick={() => setQuery('công sở')}>đồ công sở</button><button onClick={() => setQuery('phụ kiện')}>phụ kiện</button></div><p className="demo-note">✦ Dữ liệu và hình ảnh hiện là mẫu minh họa, không đại diện tồn kho thực tế.</p></div><div className="hero-art"><div className="hero-image-wrap"><ImageWithFallback src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85" alt="Thời trang nữ phong cách Hà Nội, ảnh mẫu" /></div><div className="hero-note note-one"><strong>{visibleShops.length}</strong><span>shop local<br />đã tuyển chọn</span></div><div className="hero-note note-two"><span className="mini-avatar">♡</span><span>Được yêu thích<br /><strong>bởi 2.000+ nàng</strong></span></div></div></section>
        <section className="section discover-section" id="shops"><div className="section-heading"><div><p className="eyebrow">Chọn gu của bạn</p><h2>Khám phá shop khắp Hà Nội</h2></div><button className="text-link" onClick={() => { setActiveCategory('Tất cả'); setActiveDistrict('Tất cả khu vực'); setQuery(''); scrollTo('shops') }}>Xem tất cả <span>→</span></button></div><div className="category-row" aria-label="Danh mục">{catalog.categories.map((category) => <button key={category} className={`category-chip ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>)}</div><div className="district-row" aria-label="Khu vực Hà Nội">{hanoiDistricts.map((district) => <button key={district} className={`district-chip ${activeDistrict === district ? 'active' : ''}`} onClick={() => setActiveDistrict(district)}>{district}</button>)}</div><LocationNotice status={locationStatus} onRequest={requestLocation} /><div className="search-context"><span>{filteredShops.length} shop · {visibleProducts.length} sản phẩm mẫu</span><a href={createPlacesSearchUrl(query || activeDistrict === 'Tất cả khu vực' ? 'thời trang nữ' : `shop thời trang nữ ${activeDistrict}`)} target="_blank" rel="noreferrer">Mở tìm kiếm khu vực trên Google Maps ↗</a><small>Places provider: {PLACES_CONFIG.mode}</small></div><div className="shop-grid">{filteredShops.map((shop) => <ShopCard key={shop.id} shop={shop} distance={distanceFor(shop)} favorite={favorites.includes(shop.id)} onFavorite={() => toggleFavorite(shop.id)} onSelect={() => setSelectedShop(shop)} onDirections={() => window.open(createDirectionsUrl(shop, userLocation), '_blank', 'noopener,noreferrer')} onMapSearch={() => window.open(createPlacesSearchUrl(`${shop.name}, ${shop.address}`), '_blank', 'noopener,noreferrer')} />)}</div>{!filteredShops.length && <div className="empty-state"><span>◌</span><h3>Chưa tìm thấy shop phù hợp</h3><p>Thử tên shop, sản phẩm, quận/huyện hoặc chọn khu vực khác nhé.</p><button onClick={() => { setQuery(''); setActiveCategory('Tất cả'); setActiveDistrict('Tất cả khu vực') }}>Xem tất cả shop</button></div>}</section>
        <section className="section product-section" id="products"><div className="section-heading"><div><p className="eyebrow">Món mới mỗi ngày</p><h2>Đang được yêu thích</h2><p className="section-caption">{visibleProducts.length} sản phẩm mẫu · ảnh minh họa từ Unsplash</p></div><button className="text-link">Xem thêm <span>→</span></button></div>{visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />)}</div> : <div className="empty-state"><span>◌</span><h3>Chưa tìm thấy sản phẩm</h3><p>Thử từ khóa hoặc danh mục khác nhé.</p></div>}</section>
        <section className="about-banner" id="about"><div className="about-mark">H</div><div><p className="eyebrow">Một Hà Nội rất riêng</p><h2>Đi tìm cái đẹp<br /><em>ở ngay quanh mình.</em></h2></div><p>HaNoiStyle kết nối bạn với những người làm thời trang tử tế — để mỗi lần mua sắm là một lần khám phá thành phố theo cách thật riêng.</p><button className="outline-button">Câu chuyện của chúng mình <span>→</span></button></section>
      </main>
      <footer><a className="logo" href="#"><span>H</span> HaNoiStyle</a><p>Made with love in Hà Nội <span>♡</span></p><div><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">Liên hệ</a></div></footer>
      {selectedShop && <ShopModal shop={selectedShop} distance={distanceFor(selectedShop)} userLocation={userLocation} onClose={() => setSelectedShop(null)} onContact={() => window.open(`tel:${selectedShop.phone.replaceAll(' ', '')}`)} />}
      {selectedProduct && <ProductModal product={selectedProduct} shop={catalog.shops.find((shop) => shop.id === selectedProduct.shopId)} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}

function LocationNotice({ status, onRequest }) {
  if (status === 'success') return <div className="location-notice success" role="status"><Icon>✓</Icon> Đã cập nhật khoảng cách theo vị trí của bạn. <button onClick={onRequest}>Cập nhật lại</button></div>
  if (status === 'loading') return <div className="location-notice" role="status"><span className="loading-dot" /> Đang xin quyền truy cập vị trí…</div>
  if (status === 'denied') return <div className="location-notice warning" role="status"><Icon>!</Icon> Bạn đã từ chối quyền vị trí. Khoảng cách đang hiển thị theo khu vực Hà Nội. <button onClick={onRequest}>Thử lại</button></div>
  if (status === 'unavailable') return <div className="location-notice warning" role="status"><Icon>!</Icon> Không thể truy cập vị trí trên thiết bị này. Bạn vẫn có thể xem shop và mở chỉ đường. <button onClick={onRequest}>Thử lại</button></div>
  return <div className="location-notice"><Icon>⌖</Icon> Cho phép vị trí để xem khoảng cách chính xác đến từng shop. <button onClick={onRequest}>Bật vị trí</button></div>
}

function ShopCard({ shop, distance, favorite, onFavorite, onSelect, onDirections, onMapSearch }) {
  return <article className="shop-card"><div className="card-image"><ImageWithFallback src={shop.image} alt={shop.imageAlt || shop.name} loading="lazy" /><button className={`favorite ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label={favorite ? `Bỏ lưu ${shop.name}` : `Lưu ${shop.name}`}>{favorite ? '♥' : '♡'}</button><span className="distance"><Icon size={14}>⌖</Icon> {distance}</span></div><div className="card-body"><div className="card-title-row"><h3>{shop.name}</h3>{shop.verified && <span className="verified" title="Đã xác minh">✓</span>}</div><p className="muted">{shop.category} · {getShopDistrict(shop)}</p><p className="address"><Icon size={15}>⌖</Icon> {shop.address}</p><div className="shop-meta"><span><b>★</b> {shop.rating} <small>({shop.reviews})</small></span><span>{shop.priceRange}</span></div><div className="card-actions"><button className="card-link" onClick={onSelect}>Xem shop <span>→</span></button><button className="map-link" onClick={onDirections} aria-label={`Mở chỉ đường đến ${shop.name}`}>⌖ Chỉ đường</button><button className="map-link" onClick={onMapSearch} aria-label={`Tìm ${shop.name} trên Google Maps`}>Tìm Maps</button></div></div></article>
}

function ProductCard({ product, onSelect }) {
  return <article className="product-card" onClick={onSelect} tabIndex="0" role="button" onKeyDown={(event) => event.key === 'Enter' && onSelect()}><div className={`product-image ${product.color}`}><ImageWithFallback src={product.image} alt={product.imageAlt || product.name} loading="lazy" />{product.tag && <span className="product-tag">{product.tag}</span>}<span className={`stock-badge ${product.stock === 0 ? 'out' : product.stock < 4 ? 'low' : ''}`}>{product.stockStatus}</span><button className="product-heart" onClick={(event) => event.stopPropagation()} aria-label={`Lưu ${product.name}`}>♡</button></div><div className="product-info"><h3>{product.name}</h3><p>{product.price} {product.oldPrice && <del>{product.oldPrice}</del>}</p><small>{product.variants?.map((variant) => `${variant.name}: ${variant.values.join(', ')}`).join(' · ')}</small></div></article>
}

function ImageWithFallback({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className="image-fallback" role="img" aria-label={`${alt} — ảnh mẫu không tải được`}><span>✦</span><small>Ảnh mẫu</small></div>
  return <img src={src} alt={alt} onError={() => setFailed(true)} {...props} />
}

function ShopModal({ shop, distance, userLocation, onClose, onContact }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal shop-modal" role="dialog" aria-modal="true" aria-label={`Thông tin ${shop.name}`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Đóng">×</button><img className="modal-cover" src={shop.image} alt="" /><div className="modal-content"><div className="card-title-row"><h2>{shop.name}</h2><span className="verified">✓</span></div><p className="muted">{shop.description}</p><div className="detail-list"><p><Icon>⌖</Icon><span><b>Địa chỉ</b>{shop.address}</span></p><p><Icon>◷</Icon><span><b>Khoảng cách</b>{distance}</span></p><p><Icon>☎</Icon><span><b>Điện thoại</b>{shop.phone}</span></p></div><div className="modal-actions"><button className="primary-button" onClick={onContact}>☎ Gọi ngay</button><button className="secondary-button" onClick={() => window.open('https://zalo.me', '_blank', 'noopener,noreferrer')}>Nhắn Zalo</button><button className="map-button" onClick={() => window.open(createDirectionsUrl(shop, userLocation), '_blank', 'noopener,noreferrer')}>⌖ Chỉ đường</button></div><p className="map-disclaimer">Chỉ đường mở Google Maps, không phải bản đồ nhúng. Nhà cung cấp bản đồ: {MAP_CONFIG.provider}.</p></div></div></div>
}

function ProductModal({ product, shop, onClose }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal product-modal" role="dialog" aria-modal="true" aria-label={product.name} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Đóng">×</button><ImageWithFallback src={product.image} alt={product.imageAlt || product.name} /><div className="modal-content"><p className="eyebrow">Từ {shop?.name} · sản phẩm mẫu</p><h2>{product.name}</h2><p className="modal-price">{product.price}</p><p className={`stock-detail ${product.stock === 0 ? 'out' : ''}`}>{product.stockStatus} · số lượng mẫu: {product.stock}</p><div className="variant-list">{product.variants?.map((variant) => <p key={variant.name}><b>{variant.name}</b>{variant.values.join(' · ')}</p>)}</div><p className="muted">Sản phẩm và số lượng chỉ là dữ liệu demo. Liên hệ shop để xác nhận mẫu, màu, size và tồn kho thực tế.</p><button className="primary-button wide" onClick={() => window.open(`tel:${shop?.phone.replaceAll(' ', '')}`)}>Liên hệ cửa hàng <span>→</span></button></div></div></div>
}

function AdminPreview({ catalog, onCatalogChange, onExit }) {
  const [editingShop, setEditingShop] = useState(null)
  const [editingProduct, setEditingProduct] = useState(null)
  const [syncState, setSyncState] = useState({ status: 'idle', report: null })
  const runPreviewSync = async () => {
    setSyncState({ status: 'running', report: null })
    try {
      const report = await runCatalogSync(createMockCatalogAdapter(catalog), catalog)
      setSyncState({ status: 'complete', report })
    } catch (error) {
      setSyncState({ status: 'error', report: { provider: 'mock-demo', status: 'error', errors: [error.message || 'Không thể chạy preview sync'], preview: true } })
    }
  }
  const updateShop = (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const shop = { id: editingShop?.id || `shop-${Date.now()}`, name: form.get('name'), category: form.get('category'), address: form.get('address'), phone: form.get('phone'), description: form.get('description'), priceRange: form.get('priceRange'), image: editingShop?.image || 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85', imageAlt: editingShop?.imageAlt || 'Ảnh mẫu shop thời trang nữ', rating: editingShop?.rating || 'Mới', reviews: editingShop?.reviews || 0, verified: editingShop?.verified || false, distance: 'Chưa tính', coordinates: editingShop?.coordinates || { lat: 21.0287, lng: 105.8498 } }; onCatalogChange(catalogActions.upsertShop(catalog, shop)); setEditingShop(null) }
  const updateProduct = (event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const stock = Number(form.get('stock')) || 0; const product = { id: editingProduct?.id || `product-${Date.now()}`, shopId: form.get('shopId'), category: editingProduct?.category || 'Áo kiểu', name: form.get('name'), price: form.get('price'), tag: form.get('tag'), stock, stockStatus: stock > 0 ? stock < 4 ? 'Sắp hết' : 'Còn hàng' : 'Hết hàng', variants: editingProduct?.variants || [], imageAlt: editingProduct?.imageAlt || 'Ảnh mẫu sản phẩm, hình minh họa', image: editingProduct?.image || 'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=700&q=85', color: 'beige' }; onCatalogChange(catalogActions.upsertProduct(catalog, product)); setEditingProduct(null) }
  return <div className="admin-shell"><header className="admin-header"><a className="logo" href="#" onClick={onExit}><span>H</span> HaNoiStyle</a><div><span className="preview-badge">ADMIN PREVIEW · MOCK</span><button className="outline-button" onClick={onExit}>← Về trang public</button></div></header><main className="admin-main"><p className="eyebrow">Data management</p><h1>Quản lý cửa hàng & sản phẩm</h1><p className="admin-intro">Khu vực xem trước dành cho đội vận hành. Thay đổi chỉ tồn tại trong phiên trình duyệt này và chưa ghi vào database.</p><SyncPanel syncState={syncState} onSync={runPreviewSync} /><section className="admin-grid"><div className="admin-panel"><div className="admin-panel-heading"><div><h2>Shop ({catalog.shops.length})</h2><p>Kiểm tra trước khi hiển thị public</p></div><button className="primary-button" onClick={() => setEditingShop({})}>+ Thêm shop</button></div>{catalog.shops.map((shop) => <div className="admin-row" key={shop.id}><div><strong>{shop.name}</strong><small>{shop.address}</small></div><span className={`status ${shop.verified ? 'verified-status' : ''}`}>{shop.verified ? 'Đã xác minh' : 'Chờ duyệt'}</span><button onClick={() => onCatalogChange(catalogActions.setShopVerification(catalog, shop.id, !shop.verified))}>{shop.verified ? 'Gỡ xác minh' : 'Xác minh'}</button><button onClick={() => setEditingShop(shop)}>Sửa</button></div>)}</div><div className="admin-panel"><div className="admin-panel-heading"><div><h2>Sản phẩm ({catalog.products.length})</h2><p>Liên kết với shop đã có</p></div><button className="primary-button" onClick={() => setEditingProduct({})}>+ Thêm sản phẩm</button></div>{catalog.products.map((product) => <div className="admin-row" key={product.id}><div><strong>{product.name}</strong><small>{catalog.shops.find((shop) => shop.id === product.shopId)?.name || 'Chưa gắn shop'}</small></div><span className="price">{product.price}</span><button onClick={() => setEditingProduct(product)}>Sửa</button></div>)}</div></section></main>{editingShop && <AdminForm title={editingShop.id ? 'Sửa thông tin shop' : 'Thêm shop'} item={editingShop} fields={['name', 'category', 'address', 'phone', 'priceRange', 'description']} onSubmit={updateShop} onCancel={() => setEditingShop(null)} />}{editingProduct && <ProductForm product={editingProduct} shops={catalog.shops} onSubmit={updateProduct} onCancel={() => setEditingProduct(null)} />}</div>
}

function SyncPanel({ syncState, onSync }) {
  const report = syncState.report
  return <section className="sync-panel" aria-live="polite"><div><p className="eyebrow">Product automation</p><h2>Đồng bộ sản phẩm & tồn kho</h2><p>Mock adapter · chỉ chạy preview trong trình duyệt, không gọi API bên ngoài.</p>{report && <small>Provider: {report.provider} · {report.finishedAt ? new Date(report.finishedAt).toLocaleString('vi-VN') : 'chưa chạy'}</small>}</div><button className="primary-button" onClick={onSync} disabled={syncState.status === 'running'}>{syncState.status === 'running' ? 'Đang kiểm tra…' : 'Chạy sync preview'}</button>{report && <div className={`sync-result ${report.status}`}><strong>{report.status === 'success' ? '✓ Preview thành công' : report.status === 'partial' ? '! Preview một phần' : '× Preview lỗi'}</strong><span>{report.productsFetched || 0} fetched · {report.productsMapped || 0} mapped · {report.inventoryUpdated || 0} tồn kho cập nhật</span>{report.errors?.length > 0 && <ul>{report.errors.map((error) => <li key={error}>{error}</li>)}</ul>}</div>}</section>
}

function AdminForm({ title, item, fields, onSubmit, onCancel }) {
  return <div className="modal-backdrop"><form className="admin-form" onSubmit={onSubmit}><button type="button" className="modal-close dark" onClick={onCancel} aria-label="Đóng">×</button><h2>{title}</h2>{fields.map((field) => <label key={field}>{field === 'priceRange' ? 'Khoảng giá' : field === 'description' ? 'Mô tả' : field === 'name' ? 'Tên shop' : field === 'category' ? 'Danh mục' : field === 'address' ? 'Địa chỉ' : 'Điện thoại'}{field === 'description' ? <textarea name={field} defaultValue={item[field] || ''} required /> : <input name={field} defaultValue={item[field] || ''} required />}</label>)}<div className="form-actions"><button type="button" className="secondary-button" onClick={onCancel}>Hủy</button><button className="primary-button">Lưu bản nháp</button></div></form></div>
}

function ProductForm({ product, shops, onSubmit, onCancel }) {
  return <div className="modal-backdrop"><form className="admin-form" onSubmit={onSubmit}><button type="button" className="modal-close dark" onClick={onCancel} aria-label="Đóng">×</button><h2>{product.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</h2><label>Tên sản phẩm<input name="name" defaultValue={product.name || ''} required /></label><label>Giá<input name="price" defaultValue={product.price || ''} required /></label><label>Số lượng mẫu<input name="stock" type="number" min="0" defaultValue={product.stock ?? 0} required /></label><label>Nhãn<input name="tag" defaultValue={product.tag || ''} placeholder="Ví dụ: Mới về" /></label><label>Shop<select name="shopId" defaultValue={product.shopId || shops[0]?.id} required>{shops.map((shop) => <option key={shop.id} value={shop.id}>{shop.name}</option>)}</select></label><div className="form-actions"><button type="button" className="secondary-button" onClick={onCancel}>Hủy</button><button className="primary-button">Lưu bản nháp</button></div></form></div>
}

export default App
