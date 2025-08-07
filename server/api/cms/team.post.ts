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

    const teamMember = await prisma.teamMember.create({
      data: {
        name: body.name,
        position: body.position,
        description: body.description,
        image: body.image || null,
        email: body.email || null,
        linkedin: body.linkedin || null,
        twitter: body.twitter || null,
        order: body.order || 0,
        isActive: body.isActive !== false
      }
    })

    return teamMember
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create team member'
    })
  }
})