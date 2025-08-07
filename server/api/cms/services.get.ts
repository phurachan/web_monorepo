import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { order: 'asc' }
    })

    return services.map(service => {
      console.log('Processing service:', service.title, 'features type:', typeof service.features, 'value:', service.features)
      try {
        const parsedFeatures = JSON.parse(service.features || '[]')
        console.log('Parsed features:', parsedFeatures)
        return {
          ...service,
          features: parsedFeatures
        }
      } catch (error) {
        console.error('Failed to parse features for service:', service.id, error)
        return {
          ...service,
          features: []
        }
      }
    })
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch services'
    })
  }
})