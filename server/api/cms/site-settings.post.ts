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

    // Check if settings exist
    const existingSettings = await prisma.siteSettings.findFirst()

    if (existingSettings) {
      // Update existing settings
      const updatedSettings = await prisma.siteSettings.update({
        where: { id: existingSettings.id },
        data: {
          siteName: body.siteName,
          siteTagline: body.siteTagline,
          logo: body.logo || null,
          favicon: body.favicon || null,
          primaryColor: body.primaryColor || '#6495ed',
          secondaryColor: body.secondaryColor || '#9333ea',
          socialLinks: body.socialLinks || '{}',
          metaDescription: body.metaDescription || '',
          keywords: body.keywords || '',
          contactEmail: body.contactEmail || '',
          contactPhone: body.contactPhone || ''
        }
      })

      return updatedSettings
    } else {
      // Create new settings
      const newSettings = await prisma.siteSettings.create({
        data: {
          siteName: body.siteName,
          siteTagline: body.siteTagline,
          logo: body.logo || null,
          favicon: body.favicon || null,
          primaryColor: body.primaryColor || '#6495ed',
          secondaryColor: body.secondaryColor || '#9333ea',
          socialLinks: body.socialLinks || '{}',
          metaDescription: body.metaDescription || '',
          keywords: body.keywords || '',
          contactEmail: body.contactEmail || '',
          contactPhone: body.contactPhone || ''
        }
      })

      return newSettings
    }
  } catch (error) {
    console.error('Site settings save error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save site settings'
    })
  }
})