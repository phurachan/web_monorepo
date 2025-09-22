import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const content = await prisma.servicesContent.findFirst()
    return content || {
      heroTitle: 'Digital Marketing Services',
      heroSubtitle: 'Transform your business with comprehensive digital marketing solutions that drive growth, increase visibility, and maximize your ROI.',
      heroImage: null
    }
  } catch (error) {
    console.error('Error fetching services content:', error)
    return {
      heroTitle: 'Digital Marketing Services',
      heroSubtitle: 'Transform your business with comprehensive digital marketing solutions that drive growth, increase visibility, and maximize your ROI.',
      heroImage: null
    }
  }
})