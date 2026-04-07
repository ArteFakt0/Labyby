import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export default defineEventHandler(async () => {
  try {
    const filePath = join(process.cwd(), 'server', 'data', 'plans.json')
    const raw = await readFile(filePath, 'utf-8')
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    console.error('[api/plans] unhandled error', e)
    return []
  }
})
