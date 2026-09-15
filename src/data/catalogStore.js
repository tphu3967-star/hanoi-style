import { categories, products, shops } from './mockData'
import { normalizeShopLinks } from '../utils/links'

export { normalizeShopLinks }

// This is the replaceable client-side data boundary. A future API adapter can
// expose the same shape and move verification/mutations to the server.
export const createMockCatalog = () => ({
  categories: [...categories],
  shops: shops.map((shop) => ({ ...shop, links: normalizeShopLinks(shop.links), coordinates: { ...shop.coordinates } })),
  products: products.map((product) => ({ ...product })),
})

export const catalogActions = {
  upsertShop(catalog, shop) {
    const exists = catalog.shops.some((item) => item.id === shop.id)
    return { ...catalog, shops: exists ? catalog.shops.map((item) => item.id === shop.id ? shop : item) : [...catalog.shops, shop] }
  },
  setShopVerification(catalog, shopId, verified) {
    return { ...catalog, shops: catalog.shops.map((shop) => shop.id === shopId ? { ...shop, verified } : shop) }
  },
  upsertProduct(catalog, product) {
    const exists = catalog.products.some((item) => item.id === product.id)
    return { ...catalog, products: exists ? catalog.products.map((item) => item.id === product.id ? product : item) : [...catalog.products, product] }
  },
}
