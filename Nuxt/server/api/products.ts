export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const limit = typeof query.limit === 'string' ? Number.parseInt(query.limit, 10) : 100
  const skip = typeof query.skip === 'string' ? Number.parseInt(query.skip, 10) : 0
  const q = typeof query.q === 'string' ? query.q.trim() : ''

  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 100) : 100
  const safeSkip = Number.isFinite(skip) ? Math.max(skip, 0) : 0

  const base = q
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
    : 'https://dummyjson.com/products'

  const url = `${base}${base.includes('?') ? '&' : '?'}limit=${safeLimit}&skip=${safeSkip}`

  try {
    return await $fetch(url, { timeout: 8000 })
  } catch {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch products'
    })
  }
})
