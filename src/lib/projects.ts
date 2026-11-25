import { projects, type Project } from '../data/profile'

/** Ids from before a rename, so links shared earlier still open the right case study. */
export const legacyProjectIds: Readonly<Record<string, string>> = {
  'atlas-workspace': 'toolnest',
}

/** Extracts the project id from a `#work/<id>` deep link. */
export function parseWorkHash(hash: string): string | undefined {
  return /^#work\/([\w-]+)$/.exec(hash)?.[1]
}

/** Finds a project by id, following legacy ids. */
export function findProject(id: string | undefined, list: readonly Project[] = projects): Project | null {
  // Stryker disable next-line ConditionalExpression: equivalent — an empty id matches no project either way
  if (!id) return null
  const resolved = legacyProjectIds[id] ?? id
  return list.find((p) => p.id === resolved) ?? null
}
