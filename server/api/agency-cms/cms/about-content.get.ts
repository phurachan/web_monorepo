import { ContentService } from '~/server/agency-cms/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const content = await ContentService.getAboutContent()

    return content ? {
      ...content,
      id: content._id.toString()
    } : content
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch about content'
    })
  }
})