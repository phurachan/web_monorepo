import { FAQHelper } from '~/server/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const faqs = await FAQHelper.findMany(
      { isActive: true },
      { sort: { order: 1 } }
    )

    return faqs.map(faq => ({
      ...faq,
      id: faq._id.toString()
    }))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch FAQs'
    })
  }
})