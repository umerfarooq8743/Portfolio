// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { projects, type Project } from '../data/profile'
import { findProject, legacyProjectIds, parseWorkHash } from './projects'

describe('parseWorkHash', () => {
  it.each([
    ['#work/toolnest', 'toolnest'],
    ['#work/alam-pakwan-house', 'alam-pakwan-house'],
    ['#work/a_b-9', 'a_b-9'],
  ])('reads %s', (hash, id) => {
    expect(parseWorkHash(hash)).toBe(id)
  })

  it.each(['', '#', '#work', '#work/', '#work/a/b', '#about', 'work/toolnest', '#work/a b', '#work/x?y', ' #work/x'])(
    'ignores %j',
    (hash) => {
      expect(parseWorkHash(hash)).toBeUndefined()
    },
  )
})

describe('findProject', () => {
  it('finds a project by id', () => {
    expect(findProject('winqohub')?.name).toBe('WinqoHub')
    expect(findProject('alam-pakwan-house')?.name).toBe('Alam Pakwan House')
  })

  it('returns null for unknown or missing ids', () => {
    expect(findProject('does-not-exist')).toBeNull()
    expect(findProject(undefined)).toBeNull()
    expect(findProject('')).toBeNull()
  })

  it('follows renamed ids so old links keep working', () => {
    expect(legacyProjectIds['atlas-workspace']).toBe('toolnest')
    expect(findProject('atlas-workspace')?.id).toBe('toolnest')
  })

  it('searches the list it is given', () => {
    const list = [{ id: 'toolnest', name: 'Stub' }] as Project[]
    expect(findProject('atlas-workspace', list)?.name).toBe('Stub')
    expect(findProject('winqohub', list)).toBeNull()
  })

  it('only maps legacy ids to projects that exist', () => {
    for (const [from, to] of Object.entries(legacyProjectIds)) {
      expect(projects.some((p) => p.id === from), `${from} must be retired`).toBe(false)
      expect(projects.some((p) => p.id === to), `${to} must exist`).toBe(true)
    }
  })
})
