const DISTRICT_ALIASES = {
  'hoan kiem': 'Hoàn Kiếm',
  'hoan kiem q': 'Hoàn Kiếm',
  'dong da': 'Đống Đa',
  'tay ho': 'Tây Hồ',
  'cau giay': 'Cầu Giấy',
  'ba dinh': 'Ba Đình',
  'hai ba trung': 'Hai Bà Trưng',
  'thanh xuan': 'Thanh Xuân',
  'ha dong': 'Hà Đông',
  'long bien': 'Long Biên',
  'nam tu liem': 'Nam Từ Liêm',
  'bac tu liem': 'Bắc Từ Liêm',
}

export const hanoiDistricts = ['Tất cả khu vực', ...Object.values(DISTRICT_ALIASES).filter((district, index, list) => list.indexOf(district) === index)]

export function normalizeHanoiText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\b(?:quan|q\.?)\s*/g, '')
    .replace(/\b(?:huyen|h\.?)\s*/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function matchesHanoiText(value, query) {
  const normalizedQuery = normalizeHanoiText(query)
  return !normalizedQuery || normalizeHanoiText(value).includes(normalizedQuery)
}

export function getShopDistrict(shop) {
  const address = normalizeHanoiText(shop?.address)
  const match = Object.entries(DISTRICT_ALIASES).find(([alias]) => address.includes(alias))
  return match ? match[1] : 'Khu vực khác'
}
