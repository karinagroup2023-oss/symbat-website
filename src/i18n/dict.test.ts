import { describe, it, expect } from 'vitest'
import { ru } from './ru'
import { kz } from './kz'

function keyPaths(obj: unknown, prefix = ''): string[] {
  if (Array.isArray(obj)) return obj.flatMap((v, i) => keyPaths(v, `${prefix}[${i}]`))
  if (obj && typeof obj === 'object')
    return Object.entries(obj).flatMap(([k, v]) => keyPaths(v, prefix ? `${prefix}.${k}` : k))
  return [prefix]
}

describe('locale dictionaries', () => {
  it('ru and kz have identical key/array structure', () => {
    expect(keyPaths(kz)).toEqual(keyPaths(ru))
  })
  it('no empty strings', () => {
    for (const dict of [ru, kz])
      for (const [path, val] of Object.entries(flatten(dict)))
        expect(val, path).not.toBe('')
  })
})

function flatten(obj: unknown, prefix = '', out: Record<string,string> = {}): Record<string,string> {
  if (Array.isArray(obj)) obj.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out))
  else if (obj && typeof obj === 'object')
    Object.entries(obj).forEach(([k, v]) => flatten(v, prefix ? `${prefix}.${k}` : k, out))
  else out[prefix] = String(obj)
  return out
}
