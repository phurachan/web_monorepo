import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return faqs
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch FAQs'
    })
  }
})