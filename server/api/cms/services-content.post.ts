import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    
    const existingContent = await prisma.servicesContent.findFirst()
    
    if (existingContent) {
      const updatedContent = await prisma.servicesContent.update({
        where: { id: existingContent.id },
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          heroImage: body.heroImage
        }
      })
      return updatedContent
    } else {
      const newContent = await prisma.servicesContent.create({
        data: {
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          heroImage: body.heroImage
        }
      })
      return newContent
    }
  } catch (error) {
    console.error('Error saving services content:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to save services content'
    })
  }
})