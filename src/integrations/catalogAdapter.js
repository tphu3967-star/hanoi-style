/**
 * Platform-neutral normalized catalog contract.
 * Keep provider credentials and network calls in a server-side adapter.
 *
 * @typedef {{id:string,name:string,address:string,phone:string,category:string,verified:boolean,coordinates:{lat:number,lng:number},image:string,imageAlt:string}} NormalizedShop
 * @typedef {{id:string,shopId:string,name:string,category:string,price:string,stock:number,stockStatus:string,variants:Array<{name:string,values:string[]}>,image:string,imageAlt:string}} NormalizedProduct
 * @typedef {{productId:string,quantity:number,status:'in_stock'|'low_stock'|'out_of_stock'}} NormalizedInventory
 * @typedef {{provider:string,startedAt:string,finishedAt:string,status:'success'|'partial'|'error',productsFetched:number,productsMapped:number,inventoryUpdated:number,errors:string[],preview:boolean}} SyncReport
 */

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0
const isCoordinate = (value) => value && Number.isFinite(value.lat) && Number.isFinite(value.lng)

export function validateShop(shop) {
  const errors = []
  if (!isNonEmptyString(shop?.id)) errors.push('Shop thiếu id')
  if (!isNonEmptyString(shop?.name)) errors.push('Shop thiếu tên')
  if (!isNonEmptyString(shop?.address)) errors.push('Shop thiếu địa chỉ')
  if (!isNonEmptyString(shop?.category)) errors.push('Shop thiếu danh mục')
  if (!isCoordinate(shop?.coordinates)) errors.push('Shop thiếu tọa độ hợp lệ')
  return errors
}

export function validateProduct(product) {
  const errors = []
  if (!isNonEmptyString(product?.id)) errors.push('Sản phẩm thiếu id')
  if (!isNonEmptyString(product?.shopId)) errors.push('Sản phẩm thiếu shopId')
  if (!isNonEmptyString(product?.name)) errors.push('Sản phẩm thiếu tên')
  if (!isNonEmptyString(product?.price)) errors.push('Sản phẩm thiếu giá')
  if (!Number.isInteger(product?.stock) || product.stock < 0) errors.push('Sản phẩm có số lượng không hợp lệ')
  if (!Array.isArray(product?.variants)) errors.push('Sản phẩm thiếu biến thể')
  return errors
}

export function normalizeProduct(product) {
  const errors = validateProduct(product)
  if (errors.length) return { value: null, errors }
  return {
    value: {
      id: product.id.trim(),
      shopId: product.shopId.trim(),
      name: product.name.trim(),
      category: product.category || 'Chưa phân loại',
      price: product.price.trim(),
      stock: product.stock,
      stockStatus: product.stock > 0 ? product.stock < 4 ? 'Sắp hết' : 'Còn hàng' : 'Hết hàng',
      variants: product.variants.map((variant) => ({ name: String(variant.name), values: Array.isArray(variant.values) ? variant.values.map(String) : [] })),
      image: product.image || '',
      imageAlt: product.imageAlt || `Ảnh mẫu ${product.name}`,
    },
    errors: [],
  }
}

export function normalizeShop(shop) {
  const errors = validateShop(shop)
  if (errors.length) return { value: null, errors }
  return {
    value: {
      id: shop.id.trim(),
      name: shop.name.trim(),
      address: shop.address.trim(),
      phone: shop.phone || '',
      category: shop.category.trim(),
      verified: Boolean(shop.verified),
      coordinates: { lat: shop.coordinates.lat, lng: shop.coordinates.lng },
      image: shop.image || '',
      imageAlt: shop.imageAlt || `Ảnh mẫu ${shop.name}`,
    },
    errors: [],
  }
}

// Adapter interface: provider implementations should fulfill these four methods.
export function createMockCatalogAdapter(catalog) {
  return {
    provider: 'mock-demo',
    async fetchProducts() {
      return catalog.products
    },
    mapProduct(product) {
      return normalizeProduct(product)
    },
    async syncInventory(products) {
      return products.map((item) => ({ productId: item.id, quantity: item.stock, status: item.stock > 0 ? item.stock < 4 ? 'low_stock' : 'in_stock' : 'out_of_stock' }))
    },
    reportErrors(errors) {
      return errors
    },
  }
}

export async function runCatalogSync(adapter, catalog) {
  const startedAt = new Date().toISOString()
  const errors = []
  const sourceProducts = await adapter.fetchProducts()
  const mappedProducts = sourceProducts.map((product) => adapter.mapProduct(product)).filter((result) => {
    errors.push(...result.errors.map((error) => `${product.id || 'unknown'}: ${error}`))
    return result.value
  }).map((result) => result.value)
  const inventory = await adapter.syncInventory(mappedProducts)
  adapter.reportErrors(errors)
  return {
    provider: adapter.provider,
    startedAt,
    finishedAt: new Date().toISOString(),
    status: errors.length ? mappedProducts.length ? 'partial' : 'error' : 'success',
    productsFetched: sourceProducts.length,
    productsMapped: mappedProducts.length,
    inventoryUpdated: inventory.length,
    errors,
    preview: true,
  }
}
