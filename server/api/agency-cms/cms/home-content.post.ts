import { HomeContentHelper, ContentService } from '~/server/agency-cms/lib/db-helpers'
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
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImage: body.heroImage || null,
      featureTitle: body.featureTitle,
      featureDescription: body.featureDescription,
      featureImage: body.featureImage || null,
      ctaText: body.ctaText,
      ctaButtonText: body.ctaButtonText,
      aboutTitle: body.aboutTitle,
      aboutDescription: body.aboutDescription,
      aboutImage: body.aboutImage || null,
      peopleTitle: body.peopleTitle,
      peopleDescription: body.peopleDescription
    }

    // Check if content exists
    const existingContent = await ContentService.getHomeContent()

    let result
    if (existingContent) {
      // Update existing content
      result = await HomeContentHelper.updateById(existingContent._id, contentData)
    } else {
      // Create new content
      result = await HomeContentHelper.create(contentData)
    }

    return {
      ...result,
      id: result!._id.toString()
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save home content'
    })
  }
})