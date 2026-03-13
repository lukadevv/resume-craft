import { describe, it, expect } from 'vitest'
import { generateUUID, randomNumber, randomItem, shuffleArray } from '@/utils/random'
import { truncateText, slugify, capitalize } from '@/utils/strings'
import { calculatePercentage, clamp, roundToDecimals } from '@/utils/math'
import { formatDateISO, addDays, isValidDate } from '@/utils/date'

describe('Random Utils', () => {
  it('generates UUID in correct format', () => {
    const uuid = generateUUID()
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })

  it('generates random number within range', () => {
    const num = randomNumber(1, 10)
    expect(num).toBeGreaterThanOrEqual(1)
    expect(num).toBeLessThanOrEqual(10)
  })

  it('returns random item from array', () => {
    const items = ['a', 'b', 'c']
    const item = randomItem(items)
    expect(items).toContain(item)
  })

  it('shuffles array without removing items', () => {
    const items = [1, 2, 3, 4, 5]
    const shuffled = shuffleArray(items)
    expect(shuffled).toHaveLength(5)
    expect(shuffled.sort()).toEqual(items)
  })
})

describe('String Utils', () => {
  it('truncates text correctly', () => {
    expect(truncateText('Hello World', 8)).toBe('Hello...')
    expect(truncateText('Hi', 10)).toBe('Hi')
  })

  it('slugifies text correctly', () => {
    expect(slugify('Hello World')).toBe('hello-world')
    expect(slugify('Test @#File')).toBe('test-file')
  })

  it('capitalizes first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
    expect(capitalize('')).toBe('')
  })
})

describe('Math Utils', () => {
  it('calculates percentage correctly', () => {
    expect(calculatePercentage(50, 100)).toBe(50)
    expect(calculatePercentage(1, 3)).toBe(33)
    expect(calculatePercentage(0, 100)).toBe(0)
  })

  it('clamps value within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })

  it('rounds to specified decimals', () => {
    expect(roundToDecimals(3.14159, 2)).toBe(3.14)
    expect(roundToDecimals(3.14159, 0)).toBe(3)
  })
})

describe('Date Utils', () => {
  it('formats date to ISO', () => {
    const date = new Date('2024-01-15T12:00:00Z')
    expect(formatDateISO(date)).toBe('2024-01-15')
  })

  it('adds days to date', () => {
    const date = new Date('2024-01-01')
    const result = addDays(date, 5)
    expect(result.getDate()).toBe(6)
  })

  it('validates dates correctly', () => {
    expect(isValidDate(new Date())).toBe(true)
    expect(isValidDate(new Date('invalid'))).toBe(false)
  })
})
