import test from 'node:test'
import assert from 'node:assert/strict'
import { haversineDistanceKm, resolveProvinceFromLocation } from '../src/utils/location.js'
import { normalizeShopLinks } from '../src/utils/links.js'

test('Haversine returns zero for the same coordinate', () => {
  assert.equal(haversineDistanceKm({ lat: 21.0287, lng: 105.8498 }, { lat: 21.0287, lng: 105.8498 }), 0)
})

test('Haversine gives a plausible Hanoi to Ho Chi Minh distance', () => {
  const distance = haversineDistanceKm({ lat: 21.0287, lng: 105.8498 }, { lat: 10.8231, lng: 106.6297 })
  assert.ok(distance > 1100 && distance < 1200)
})

test('browser boundary does not guess province without a reverse geocoder', () => {
  const result = resolveProvinceFromLocation({ lat: 21.0287, lng: 105.8498 })
  assert.deepEqual(result, { province: null, status: 'unresolved', reason: 'provider-not-configured' })
})

test('reverse-geocoder boundary accepts provider results for known city coordinates', () => {
  const fixtures = [
    [{ lat: 21.0287, lng: 105.8498 }, 'Hà Nội'],
    [{ lat: 16.0544, lng: 108.2022 }, 'Đà Nẵng'],
    [{ lat: 10.8231, lng: 106.6297 }, 'Hồ Chí Minh'],
  ]
  for (const [coordinate, province] of fixtures) {
    const result = resolveProvinceFromLocation(coordinate, () => ({ province, status: 'resolved', source: 'test-provider' }))
    assert.deepEqual(result, { province, status: 'resolved', source: 'test-provider' })
  }
})

test('shop links keep only valid web URLs', () => {
  assert.deepEqual(normalizeShopLinks({
    website: 'https://example.com/shop',
    facebook: 'javascript:alert(1)',
    zalo: 'not-a-url',
  }), { website: 'https://example.com/shop' })
})
