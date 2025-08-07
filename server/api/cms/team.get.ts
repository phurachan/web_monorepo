import { prisma } from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })

    return teamMembers
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch team members'
    })
  }
})