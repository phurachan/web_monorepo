export default defineEventHandler(async (event) => {
  // Clear the httpOnly auth token
  setCookie(event, 'auth-token', '', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  })

  // Clear the client-accessible auth status
  setCookie(event, 'auth-status', '', {
    httpOnly: false,
    secure: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  })

  console.log('Logout: Cookies cleared')

  return { success: true }
})