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
          teamTitle: body.teamTitle,
          teamDescription: body.teamDescription,
          historyTitle: body.historyTitle,
          historyText: body.historyText,
          bannerImage: body.bannerImage || null
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
          teamTitle: body.teamTitle,
          teamDescription: body.teamDescription,
          historyTitle: body.historyTitle,
          historyText: body.historyText,
          bannerImage: body.bannerImage || null
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