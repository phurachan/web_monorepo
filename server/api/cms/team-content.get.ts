import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const content = await prisma.teamContent.findFirst()
    return content || {
      heroTitle: 'Meet Our People',
      heroSubtitle: 'Get to know the talented individuals who drive our success and make exceptional results possible.',
      heroImage: null
    }
  } catch (error) {
    console.error('Error fetching team content:', error)
    return {
      heroTitle: 'Meet Our People', 
      heroSubtitle: 'Get to know the talented individuals who drive our success and make exceptional results possible.',
      heroImage: null
    }
  }
})