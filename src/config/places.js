// Provider-neutral boundary. Keep API keys and network calls on the server.
export const PLACES_CONFIG = {
  provider: 'google-places-ready',
  mode: 'mock-only',
  serverSearchEndpoint: '/api/places/search',
}

export function createPlacesSearchUrl(query) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query}, Hà Nội`)}`
}
