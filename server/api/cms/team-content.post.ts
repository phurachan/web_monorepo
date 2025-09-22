import { TeamContentHelper, ContentService } from '~/server/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const contentData = {
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImage: body.heroImage
    }

    const existingContent = await ContentService.getTeamContent()

    let result
    if (existingContent) {
      result = await TeamContentHelper.updateById(existingContent._id, contentData)
    } else {
      result = await TeamContentHelper.create(contentData)
    }

    return {
      ...result,
      id: result!._id.toString()
    }
  } catch (error) {
    console.error('Error saving team content:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save team content'
    })
  }
})