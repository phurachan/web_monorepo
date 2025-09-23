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
    const body = await readBody(event)

    const faq = await FAQHelper.updateById(id!, {
      question: body.question,
      answer: body.answer,
      order: body.order || 0,
      isActive: body.isActive !== false
    })

    if (!faq) {
      throw createError({
        statusCode: 404,
        statusMessage: 'FAQ not found'
      })
    }

    return {
      ...faq,
      id: faq._id.toString()
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update FAQ'
    })
  }
})