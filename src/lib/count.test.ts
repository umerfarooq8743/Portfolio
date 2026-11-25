// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { formatCount, parseCount } from './count'

describe('parseCount', () => {
  it.each([
    ['20+', 20, '+'],
    ['3+', 3, '+'],
    ['12', 12, ''],
    ['1,368', 1368, ''],
    ['12,345,678 rows', 12345678, ' rows'],
    ['400+', 400, '+'],
    ['14-day', 14, '-day'],
    ['0', 0, ''],
  ])('splits %s', (value, target, suffix) => {
    expect(parseCount(value)).toEqual({ target, suffix })
  })

  it.each(['Apr ’24', '24/7', 'v2.0', '', '+20', ' 12'])('does not animate %j', (value) => {
    expect(parseCount(value)).toBeNull()
  })

  it('reads a single line only', () => {
    expect(parseCount('20\nrows')).toBeNull()
  })

  it('does not treat a malformed separator as thousands', () => {
    expect(parseCount('1,36')).toEqual({ target: 1, suffix: ',36' })
    expect(parseCount('1234,567')).toEqual({ target: 1234, suffix: ',567' })
  })
})

describe('formatCount', () => {
  it('keeps thousands separators when the original had them', () => {
    expect(formatCount(1368, '1,368')).toBe('1,368')
    expect(formatCount(999.6, '1,368')).toBe('1,000')
    expect(formatCount(12, '1,368')).toBe('12')
  })

  it('recognises separators only in a leading, well-formed number', () => {
    expect(formatCount(12345, '12,345')).toBe('12,345')
    expect(formatCount(123456, '123,456')).toBe('123,456')
    expect(formatCount(1368, 'v1,368')).toBe('1368')
    expect(formatCount(1368, '1,36')).toBe('1368')
  })

  it('writes plain numbers otherwise', () => {
    expect(formatCount(1368, '1368')).toBe('1368')
    expect(formatCount(19.4, '20+')).toBe('19')
    expect(formatCount(19.5, '20+')).toBe('20')
  })
})
