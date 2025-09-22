import { ServicesContentHelper, ContentService } from '~/server/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const contentData = {
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImage: body.heroImage
    }

    const existingContent = await ContentService.getServicesContent()

    let result
    if (existingContent) {
      result = await ServicesContentHelper.updateById(existingContent._id, contentData)
    } else {
      result = await ServicesContentHelper.create(contentData)
    }

    return {
      ...result,
      id: result!._id.toString()
    }
  } catch (error) {
    console.error('Error saving services content:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save services content'
    })
  }
})