import { AboutContentHelper, ContentService } from '~/server/agency-cms/lib/db-helpers'
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
      missionTitle: body.missionTitle,
      missionText: body.missionText,
      visionTitle: body.visionTitle,
      visionText: body.visionText,
      valuesTitle: body.valuesTitle,
      valuesText: body.valuesText,
      historyTitle: body.historyTitle,
      historyText: body.historyText,
      missionImage: body.missionImage || null,
      heroImage: body.heroImage || null,
      // Statistics
      happyClientsCount: body.happyClientsCount || '500+',
      happyClientsLabel: body.happyClientsLabel || 'Happy Clients',
      experienceCount: body.experienceCount || '10+',
      experienceLabel: body.experienceLabel || 'Years Experience',
      // Dynamic arrays
      visionItems: body.visionItems || '[]',
      valuesItems: body.valuesItems || '[]',
      journeyItems: body.journeyItems || '[]'
    }

    // Check if content exists
    const existingContent = await ContentService.getAboutContent()

    let result
    if (existingContent) {
      // Update existing content
      result = await AboutContentHelper.updateById(existingContent._id, contentData)
    } else {
      // Create new content
      result = await AboutContentHelper.create(contentData)
    }

    return {
      ...result,
      id: result!._id.toString()
    }
  } catch (error) {
    console.error('About content save error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save about content'
    })
  }
})