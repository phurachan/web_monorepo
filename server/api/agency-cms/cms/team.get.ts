import { TeamMemberService } from '~/server/agency-cms/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const teamMembers = await TeamMemberService.getActiveMembers()

    return teamMembers.map(member => ({
      ...member,
      id: member._id.toString()
    }))
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch team members'
    })
  }
})