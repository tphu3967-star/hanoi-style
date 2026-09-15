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

// Reverse geocoding is intentionally unresolved in the browser-only demo.
// Production should inject a server-side provider adapter; never infer a
// province from the nearest shop or centroid.
export function resolveProvinceFromLocation(location, reverseGeocoder = null) {
  if (!location || !Number.isFinite(location.lat) || !Number.isFinite(location.lng)) {
    return { province: null, status: 'unresolved', reason: 'invalid-location' }
  }
  if (typeof reverseGeocoder !== 'function') {
    return { province: null, status: 'unresolved', reason: 'provider-not-configured' }
  }
  return reverseGeocoder(location)
}

export function createDirectionsUrl(shop, userLocation) {
  const destination = `${shop.coordinates.lat},${shop.coordinates.lng}`
  const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : ''
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}${origin ? `&origin=${encodeURIComponent(origin)}` : ''}`
}
