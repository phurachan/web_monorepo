import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const settings = await prisma.siteSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (settings && settings.socialLinks) {
      return {
        ...settings,
        socialLinks: JSON.parse(settings.socialLinks)
      }
    }

    return settings
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch site settings'
    })
  }
})