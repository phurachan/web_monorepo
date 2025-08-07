import { prisma } from '~/lib/prisma'
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

  try {
    const body = await readBody(event)

    const service = await prisma.service.create({
      data: {
        title: body.title,
        description: body.description,
        icon: body.icon || '',
        image: body.image || null,
        color: body.color || '#6495ed',
        features: JSON.stringify(body.features || []),
        order: body.order || 0,
        isActive: body.isActive !== false
      }
    })

    return {
      ...service,
      features: JSON.parse(service.features || '[]')
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create service'
    })
  }
})