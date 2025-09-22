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
    const body = await readBody(event)

    // Check if content exists
    const existingContent = await prisma.aboutContent.findFirst()

    if (existingContent) {
      // Update existing content
      const updatedContent = await prisma.aboutContent.update({
        where: { id: existingContent.id },
        data: {
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
      })

      return updatedContent
    } else {
      // Create new content
      const newContent = await prisma.aboutContent.create({
        data: {
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
      })

      return newContent
    }
  } catch (error) {
    console.error('About content save error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save about content'
    })
  }
})