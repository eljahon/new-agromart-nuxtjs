export function normalizeQuery (query) {
  const entries = Object.entries(query).filter(
    ([, value]) => !(value === null || value === undefined || value === '')
  )
  return Object.fromEntries(entries)
}
