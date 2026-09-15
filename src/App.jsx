import { useMemo, useState } from 'react'
import { categories, products, shops } from './data/mockData'

const Icon = ({ children, size = 18 }) => <span className="icon" style={{ fontSize: size }}>{children}</span>

function App() {
  const [activeCategory, setActiveCategory] = useState('Tất cả')
  const [query, setQuery] = useState('')
  const [selectedShop, setSelectedShop] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [favorites, setFavorites] = useState([])

  const filteredShops = useMemo(() => shops.filter((shop) => {
    const matchesCategory = activeCategory === 'Tất cả' || shop.category === activeCategory
    const search = query.trim().toLowerCase()
    return matchesCategory && (!search || `${shop.name} ${shop.address} ${shop.category}`.toLowerCase().includes(search))
  }), [activeCategory, query])

  const visibleProducts = products.filter((product) => !selectedShop || product.shopId === selectedShop.id)
  const toggleFavorite = (id) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="logo" href="#" aria-label="HaNoiStyle trang chủ"><span>H</span> HaNoiStyle</a>
        <nav className="desktop-nav">
          <button onClick={() => scrollTo('shops')}>Khám phá</button>
          <button onClick={() => scrollTo('products')}>Sản phẩm</button>
          <button onClick={() => scrollTo('about')}>Về HaNoiStyle</button>
        </nav>
        <div className="top-actions">
          <button className="location-pill"><Icon>⌖</Icon> Hà Nội <span className="chevron">⌄</span></button>
          <button className="menu-button" aria-label="Mở menu"><Icon size={23}>☰</Icon></button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="spark">✦</span> Local fashion, local love</p>
            <h1>Mặc chất<br /><em>Hà Nội.</em></h1>
            <p className="hero-intro">Tìm những cửa hàng thời trang nữ hay ho nhất quanh bạn — từ những con phố thân quen đến góc nhỏ chưa từng biết.</p>
            <div className="search-box">
              <Icon size={20}>⌕</Icon>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Bạn đang tìm gì hôm nay?" aria-label="Tìm kiếm cửa hàng" />
              {query && <button className="clear-search" onClick={() => setQuery('')}>×</button>}
              <button className="search-submit" onClick={() => scrollTo('shops')}>Tìm kiếm</button>
            </div>
            <div className="quick-search"><span>Tìm kiếm phổ biến</span><button onClick={() => setQuery('váy')}>váy đi tiệc</button><button onClick={() => setQuery('công sở')}>đồ công sở</button><button onClick={() => setQuery('phụ kiện')}>phụ kiện</button></div>
          </div>
          <div className="hero-art">
            <div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85" alt="Thời trang nữ phong cách Hà Nội" /></div>
            <div className="hero-note note-one"><strong>50+</strong><span>shop local<br />đã tuyển chọn</span></div>
            <div className="hero-note note-two"><span className="mini-avatar">♡</span><span>Được yêu thích<br /><strong>bởi 2.000+ nàng</strong></span></div>
          </div>
        </section>

        <section className="section discover-section" id="shops">
          <div className="section-heading"><div><p className="eyebrow">Chọn gu của bạn</p><h2>Khám phá theo phong cách</h2></div><button className="text-link" onClick={() => { setActiveCategory('Tất cả'); scrollTo('shops') }}>Xem tất cả <span>→</span></button></div>
          <div className="category-row">{categories.map((category) => <button key={category} className={`category-chip ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
          <div className="shop-grid">
            {filteredShops.map((shop) => <ShopCard key={shop.id} shop={shop} favorite={favorites.includes(shop.id)} onFavorite={() => toggleFavorite(shop.id)} onSelect={() => setSelectedShop(shop)} />)}
          </div>
          {!filteredShops.length && <div className="empty-state"><span>◌</span><h3>Chưa tìm thấy shop phù hợp</h3><p>Thử một từ khóa khác hoặc xem tất cả cửa hàng nhé.</p><button onClick={() => { setQuery(''); setActiveCategory('Tất cả') }}>Xem tất cả shop</button></div>}
        </section>

        <section className="section product-section" id="products">
          <div className="section-heading"><div><p className="eyebrow">Món mới mỗi ngày</p><h2>Đang được yêu thích</h2></div><button className="text-link">Xem thêm <span>→</span></button></div>
          <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />)}</div>
        </section>

        <section className="about-banner" id="about"><div className="about-mark">H</div><div><p className="eyebrow">Một Hà Nội rất riêng</p><h2>Đi tìm cái đẹp<br /><em>ở ngay quanh mình.</em></h2></div><p>HaNoiStyle kết nối bạn với những người làm thời trang tử tế — để mỗi lần mua sắm là một lần khám phá thành phố theo cách thật riêng.</p><button className="outline-button">Câu chuyện của chúng mình <span>→</span></button></section>
      </main>

      <footer><a className="logo" href="#"><span>H</span> HaNoiStyle</a><p>Made with love in Hà Nội <span>♡</span></p><div><a href="#">Instagram</a><a href="#">Facebook</a><a href="#">Liên hệ</a></div></footer>

      {selectedShop && <ShopModal shop={selectedShop} onClose={() => setSelectedShop(null)} onContact={() => window.open(`tel:${selectedShop.phone.replaceAll(' ', '')}`)} />}
      {selectedProduct && <ProductModal product={selectedProduct} shop={shops.find((shop) => shop.id === selectedProduct.shopId)} onClose={() => setSelectedProduct(null)} />}
    </div>
  )
}

function ShopCard({ shop, favorite, onFavorite, onSelect }) {
  return <article className="shop-card">
    <div className="card-image"><img src={shop.image} alt={shop.name} /><button className={`favorite ${favorite ? 'is-favorite' : ''}`} onClick={onFavorite} aria-label="Lưu cửa hàng">{favorite ? '♥' : '♡'}</button><span className="distance"><Icon size={14}>⌖</Icon> {shop.distance}</span></div>
    <div className="card-body"><div className="card-title-row"><h3>{shop.name}</h3>{shop.verified && <span className="verified" title="Đã xác minh">✓</span>}</div><p className="muted">{shop.category}</p><p className="address"><Icon size={15}>⌖</Icon> {shop.address}</p><div className="shop-meta"><span><b>★</b> {shop.rating} <small>({shop.reviews})</small></span><span>{shop.priceRange}</span></div><button className="card-link" onClick={onSelect}>Xem shop <span>→</span></button></div>
  </article>
}

function ProductCard({ product, onSelect }) {
  return <article className="product-card" onClick={onSelect}><div className={`product-image ${product.color}`}><img src={product.image} alt={product.name} />{product.tag && <span className="product-tag">{product.tag}</span>}<button className="product-heart" onClick={(event) => event.stopPropagation()}>♡</button></div><div className="product-info"><h3>{product.name}</h3><p>{product.price} {product.oldPrice && <del>{product.oldPrice}</del>}</p></div></article>
}

function ShopModal({ shop, onClose, onContact }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal shop-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><img className="modal-cover" src={shop.image} alt="" /><div className="modal-content"><div className="card-title-row"><h2>{shop.name}</h2><span className="verified">✓</span></div><p className="muted">{shop.description}</p><div className="detail-list"><p><Icon>⌖</Icon><span><b>Địa chỉ</b>{shop.address}</span></p><p><Icon>◷</Icon><span><b>Giờ mở cửa</b>09:00 – 21:30 · Tất cả các ngày</span></p><p><Icon>☎</Icon><span><b>Điện thoại</b>{shop.phone}</span></p></div><div className="modal-actions"><button className="primary-button" onClick={onContact}>☎ Gọi ngay</button><button className="secondary-button" onClick={() => window.open('https://zalo.me', '_blank')}>Nhắn Zalo</button><button className="map-button" onClick={() => window.open('https://maps.google.com', '_blank')}>⌖ Chỉ đường</button></div></div></div></div>
}

function ProductModal({ product, shop, onClose }) {
  return <div className="modal-backdrop" onClick={onClose}><div className="modal product-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose}>×</button><img src={product.image} alt={product.name} /><div className="modal-content"><p className="eyebrow">Từ {shop?.name}</p><h2>{product.name}</h2><p className="modal-price">{product.price}</p><p className="muted">Sản phẩm có sẵn tại cửa hàng. Liên hệ shop để xem màu, size và đặt hàng.</p><button className="primary-button wide" onClick={() => window.open(`tel:${shop?.phone.replaceAll(' ', '')}`)}>Liên hệ cửa hàng <span>→</span></button></div></div></div>
}

export default App
