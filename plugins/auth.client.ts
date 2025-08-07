export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuth()
  
  // Check authentication status on app load (client side only)
  if (process.client) {
    await checkAuth()
  }
})