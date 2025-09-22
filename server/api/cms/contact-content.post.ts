import { ContactContentHelper, ContentService } from '~/server/lib/db-helpers'
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
    const body = await readBody(event)

    const contentData = {
      title: body.title,
      subtitle: body.subtitle,
      phone: body.phone,
      email: body.email,
      address: body.address,
      businessHours: body.businessHours || '{}',
      mapEmbedUrl: body.mapEmbedUrl || null,
      bannerImage: body.bannerImage || null,
      heroImage: body.heroImage || null
    }

    // Check if content exists
    const existingContent = await ContentService.getContactContent()

    let result
    if (existingContent) {
      // Update existing content
      result = await ContactContentHelper.updateById(existingContent._id, contentData)
    } else {
      // Create new content
      result = await ContactContentHelper.create(contentData)
    }

    return {
      ...result,
      id: result!._id.toString()
    }
  } catch (error) {
    console.error('Contact content save error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save contact content'
    })
  }
})