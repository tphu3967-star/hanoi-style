const EARTH_RADIUS_KM = 6371

export function haversineDistanceKm(from, to) {
  if (!from || !to || !Number.isFinite(from.lat) || !Number.isFinite(from.lng) || !Number.isFinite(to.lat) || !Number.isFinite(to.lng)) return null
  const toRadians = (value) => value * Math.PI / 180
  const latitudeDelta = toRadians(to.lat - from.lat)
  const longitudeDelta = toRadians(to.lng - from.lng)
  const a = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(longitudeDelta / 2) ** 2
  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(distanceKm, fallback = 'Khoảng cách chưa có') {
  if (!Number.isFinite(distanceKm)) return fallback
  return distanceKm < 1 ? `${Math.round(distanceKm * 1000)} m` : `${distanceKm.toFixed(1).replace('.', ',')} km`
}

// Demo-only resolver: chooses the nearest existing catalog coordinate and returns
// its province. It is deliberately not reverse geocoding or claiming boundary precision.
export function detectNearestCatalogProvince(location, shops) {
  const candidates = shops.filter((shop) => shop?.province && shop?.coordinates)
  if (!location || !candidates.length) return { province: null, distanceKm: null, isDemoMapping: true }
  const nearest = candidates.reduce((best, shop) => {
    const distanceKm = haversineDistanceKm(location, shop.coordinates)
    return !best || distanceKm < best.distanceKm ? { province: shop.province, distanceKm } : best
  }, null)
  return { ...nearest, isDemoMapping: true }
}

export function createDirectionsUrl(shop, userLocation) {
  const destination = `${shop.coordinates.lat},${shop.coordinates.lng}`
  const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : ''
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`
}
