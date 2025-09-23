import { ServiceHelper } from '~/server/agency-cms/lib/db-helpers'
import { verifyToken } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  // Verify authentication
  const token = getCookie(event, 'auth-token')
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  try {
    const service = await ServiceHelper.updateById(id!, {
      title: body.title,
      description: body.description,
      icon: body.icon || '',
      image: body.image || null,
      color: body.color || '#6495ed',
      features: JSON.stringify(body.features || []),
      order: body.order || 0,
      isActive: body.isActive !== false
    })

    if (!service) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Service not found'
      })
    }

    return {
      ...service,
      id: service._id.toString(),
      features: JSON.parse(service.features || '[]')
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update service'
    })
  }
})