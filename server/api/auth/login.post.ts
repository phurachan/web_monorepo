import { verifyPassword, generateToken } from '~/lib/auth'
import { UserService } from '~/server/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event)

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }

    const user = await UserService.findByEmail(email)

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    const token = generateToken(user._id!.toString(), user.email)

    // Set httpOnly cookie for API authentication
    setCookie(event, 'auth-token', token, {
      httpOnly: true,
      secure: false, // Set to false for localhost development
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    // Set a client-accessible cookie with just auth status (no sensitive data)
    setCookie(event, 'auth-status', 'authenticated', {
      httpOnly: false, // Accessible to client-side JavaScript
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    console.log('Login successful: Cookies set for user:', user.email)

    return {
      user: {
        id: user._id!.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    }
  } catch (error: any) {
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error: ' + error.message
    })
  }
})