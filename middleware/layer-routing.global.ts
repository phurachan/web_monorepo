export default defineNuxtRouteMiddleware((to, from) => {
  // Simple metadata tracking for digital-agency routes
  if (to.path.startsWith('/digital-agency')) {
    to.meta.layerPrefix = 'digital-agency'
    to.meta.originalPath = to.path
  }
})