import { FAQHelper } from '~/server/agency-cms/lib/db-helpers'
import { verifyToken } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  // Verify authentication
  const token = getCookie(event, 'auth-token')
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    const id = getRouterParam(event, 'id')

    const deleted = await FAQHelper.deleteById(id!)

    if (!deleted) {
      throw createError({
        statusCode: 404,
        statusMessage: 'FAQ not found'
      })
    }

    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete FAQ'
    })
  }
})