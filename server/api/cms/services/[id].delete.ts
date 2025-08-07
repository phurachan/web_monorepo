import { prisma } from '~/lib/prisma'
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

  const id = getRouterParam(event, 'id')

  try {
    await prisma.service.delete({
      where: { id }
    })

    return { success: true }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to delete service'
    })
  }
})