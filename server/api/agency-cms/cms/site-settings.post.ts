import { SiteSettingsHelper, ContentService } from '~/server/agency-cms/lib/db-helpers'
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

    const settingsData = {
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

    // Check if settings exist
    const existingSettings = await ContentService.getSiteSettings()

    let result
    if (existingSettings) {
      // Update existing settings
      result = await SiteSettingsHelper.updateById(existingSettings._id, settingsData)
    } else {
      // Create new settings
      result = await SiteSettingsHelper.create(settingsData)
    }

    return {
      ...result,
      id: result!._id.toString()
    }
  } catch (error) {
    console.error('Site settings save error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save site settings'
    })
  }
})