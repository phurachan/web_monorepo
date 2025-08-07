import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const content = await prisma.aboutContent.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    return content
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch about content'
    })
  }
})