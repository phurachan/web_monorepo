import { ContentService } from '~/server/agency-cms/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const content = await ContentService.getTeamContent()
    const defaultContent = {
      heroTitle: 'Meet Our People',
      heroSubtitle: 'Get to know the talented individuals who drive our success and make exceptional results possible.',
      heroImage: null
    }

    return content ? {
      ...content,
      id: content._id.toString()
    } : defaultContent
  } catch (error) {
    console.error('Error fetching team content:', error)
    return {
      heroTitle: 'Meet Our People', 
      heroSubtitle: 'Get to know the talented individuals who drive our success and make exceptional results possible.',
      heroImage: null
    }
  }
})