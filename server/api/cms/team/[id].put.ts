import { TeamMemberHelper } from '~/server/lib/db-helpers'
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
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    const teamMember = await TeamMemberHelper.updateById(id!, {
      name: body.name,
      position: body.position,
      description: body.description,
      image: body.image || null,
      email: body.email || null,
      linkedin: body.linkedin || null,
      twitter: body.twitter || null,
      order: body.order || 0,
      isActive: body.isActive !== false
    })

    if (!teamMember) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Team member not found'
      })
    }

    return {
      ...teamMember,
      id: teamMember._id.toString()
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update team member'
    })
  }
})