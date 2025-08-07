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
    const existingContent = await prisma.homeContent.findFirst()

    if (existingContent) {
      // Update existing content
      const updatedContent = await prisma.homeContent.update({
        where: { id: existingContent.id },
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          heroImage: body.heroImage || null,
          ctaText: body.ctaText,
          ctaButtonText: body.ctaButtonText,
          aboutTitle: body.aboutTitle,
          aboutDescription: body.aboutDescription,
          aboutImage: body.aboutImage || null,
          peopleTitle: body.peopleTitle,
          peopleDescription: body.peopleDescription
        }
      })

      return updatedContent
    } else {
      // Create new content
      const newContent = await prisma.homeContent.create({
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          heroImage: body.heroImage || null,
          ctaText: body.ctaText,
          ctaButtonText: body.ctaButtonText,
          aboutTitle: body.aboutTitle,
          aboutDescription: body.aboutDescription,
          aboutImage: body.aboutImage || null,
          peopleTitle: body.peopleTitle,
          peopleDescription: body.peopleDescription
        }
      })

      return newContent
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save home content'
    })
  }
})