import { ContentService } from '~/server/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const content = await ContentService.getServicesContent()
    const defaultContent = {
      heroTitle: 'Digital Marketing Services',
      heroSubtitle: 'Transform your business with comprehensive digital marketing solutions that drive growth, increase visibility, and maximize your ROI.',
      heroImage: null
    }

    return content ? {
      ...content,
      id: content._id.toString()
    } : defaultContent
  } catch (error) {
    console.error('Error fetching services content:', error)
    return {
      heroTitle: 'Digital Marketing Services',
      heroSubtitle: 'Transform your business with comprehensive digital marketing solutions that drive growth, increase visibility, and maximize your ROI.',
      heroImage: null
    }
  }
})