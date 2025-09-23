import { verifyToken } from '~/lib/auth'
import { UserHelper } from '~/server/agency-cms/lib/db-helpers'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth-token')
  const allCookies = parseCookies(event)

  console.log('Auth me endpoint called')
  console.log('All cookies:', Object.keys(allCookies))
  console.log('Auth token present:', !!token)
  console.log('Auth token length:', token?.length || 0)

  if (!token) {
    console.log('No auth token found in cookies')
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const decoded = verifyToken(token)

  if (!decoded) {
    console.log('Token verification failed')
    throw createError({
      statusCode: 401,
      statusMessage: 'Invalid token'
    })
  }

  try {
    const user = await UserHelper.findById(decoded.userId)

    if (!user) {
      console.log('User not found in database for ID:', decoded.userId)
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    console.log('Auth me endpoint: returning user data for:', user.email)
    return {
      user: {
        id: user._id!.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    }
  } catch (error) {
    console.log('Database error in auth me:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})