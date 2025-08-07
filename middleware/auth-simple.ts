export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only protect /manage routes
  if (!to.path.startsWith('/manage')) {
    return
  }

  // Skip middleware on server side during SSR
  if (import.meta.server) return

  console.log('Simple auth middleware: Checking authentication for:', to.path)

  // If coming from login, add a small delay to ensure cookies are set
  if (from?.path === '/login') {
    console.log('Coming from login, waiting for cookies to be set...')
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  try {
    // First check the client-accessible auth status cookie
    const authStatus = useCookie('auth-status')
    
    if (authStatus.value === 'authenticated') {
      console.log('Simple auth middleware: Auth status cookie found, user is authenticated')
      return // Allow access
    }

    console.log('Simple auth middleware: No auth status cookie, checking API...')
    
    // Fallback to API check - use navigateTo with external check
    const response = await fetch('/api/auth/me', {
      credentials: 'include'
    }).then(res => res.json())
    
    if (!response?.user) {
      console.log('Simple auth middleware: No user found in API response')
      return navigateTo('/login', { replace: true })
    }

    console.log('Simple auth middleware: User authenticated via API:', response.user.email)
  } catch (error: any) {
    console.log('Simple auth middleware: Authentication failed:', error.data?.message || error.message || error)
    return navigateTo('/login', { replace: true })
  }
})