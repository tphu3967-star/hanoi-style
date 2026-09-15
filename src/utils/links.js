const SHOP_LINK_CHANNELS = ['website', 'facebook', 'zalo']

export function normalizeShopLinks(links = {}) {
  return Object.fromEntries(
    SHOP_LINK_CHANNELS.flatMap((channel) => {
      const value = typeof links[channel] === 'string' ? links[channel].trim() : ''
      if (!value) return []
      try {
        const url = new URL(value)
        return ['http:', 'https:'].includes(url.protocol) ? [[channel, url.toString()]] : []
      } catch {
        return []
      }
    }),
  )
}
