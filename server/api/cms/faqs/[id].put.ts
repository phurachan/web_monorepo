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

  try {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const faq = await prisma.fAQ.update({
      where: { id },
      data: {
        question: body.question,
        answer: body.answer,
        order: body.order || 0,
        isActive: body.isActive !== false
      }
    })

    return faq
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update FAQ'
    })
  }
})