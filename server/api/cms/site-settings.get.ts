import { ContentService } from '~/server/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const settings = await ContentService.getSiteSettings()

    if (settings && settings.socialLinks) {
      return {
        ...settings,
        id: settings._id.toString(),
        socialLinks: JSON.parse(settings.socialLinks)
      }
    }

    return settings ? {
      ...settings,
      id: settings._id.toString()
    } : settings
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch site settings'
    })
  }
})