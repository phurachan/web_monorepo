import { ServiceService } from '~/server/agency-cms/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const services = await ServiceService.getAllServices()

    return services.map(service => {
      console.log('Processing service:', service.title, 'features type:', typeof service.features, 'value:', service.features)
      try {
        const parsedFeatures = JSON.parse(service.features || '[]')
        console.log('Parsed features:', parsedFeatures)
        return {
          ...service,
          id: service._id.toString(),
          features: parsedFeatures
        }
      } catch (error) {
        console.error('Failed to parse features for service:', service._id.toString(), error)
        return {
          ...service,
          id: service._id.toString(),
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