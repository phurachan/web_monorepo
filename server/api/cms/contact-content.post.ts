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
    const existingContent = await prisma.contactContent.findFirst()

    if (existingContent) {
      // Update existing content
      const updatedContent = await prisma.contactContent.update({
        where: { id: existingContent.id },
        data: {
          title: body.title,
          subtitle: body.subtitle,
          phone: body.phone,
          email: body.email,
          address: body.address,
          businessHours: body.businessHours || '{}',
          mapEmbedUrl: body.mapEmbedUrl || null,
          bannerImage: body.bannerImage || null
        }
      })

      return updatedContent
    } else {
      // Create new content
      const newContent = await prisma.contactContent.create({
        data: {
          title: body.title,
          subtitle: body.subtitle,
          phone: body.phone,
          email: body.email,
          address: body.address,
          businessHours: body.businessHours || '{}',
          mapEmbedUrl: body.mapEmbedUrl || null,
          bannerImage: body.bannerImage || null
        }
      })

      return newContent
    }
  } catch (error) {
    console.error('Contact content save error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save contact content'
    })
  }
})