import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const content = await prisma.contactContent.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (content && content.businessHours) {
      return {
        ...content,
        businessHours: JSON.parse(content.businessHours)
      }
    }

    return content
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch contact content'
    })
  }
})