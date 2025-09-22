import { API_ENDPOINTS, buildApiUrl } from '~/constants/api'

export const useSiteSettings = () => {
  const siteSettings = ref(null)
  
  const loadSiteSettings = async () => {
    try {
      const settings = await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SITE_SETTINGS.GET))
      siteSettings.value = settings || {
        siteName: 'DigitalFlow',
        siteTagline: 'Elevating brands through innovative digital marketing solutions',
        primaryColor: '#6495ed'
      }
      return siteSettings.value
    } catch (error) {
      console.error('Failed to load site settings:', error)
      // Return default values if API fails
      siteSettings.value = {
        siteName: 'DigitalFlow',
        siteTagline: 'Elevating brands through innovative digital marketing solutions',
        primaryColor: '#6495ed'
      }
      return siteSettings.value
    }
  }

  const getSiteName = async () => {
    if (!siteSettings.value) {
      await loadSiteSettings()
    }
    return siteSettings.value?.siteName || 'DigitalFlow'
  }

  const getSiteTagline = async () => {
    if (!siteSettings.value) {
      await loadSiteSettings()
    }
    return siteSettings.value?.siteTagline || 'Elevating brands through innovative digital marketing solutions'
  }

  return {
    siteSettings: readonly(siteSettings),
    loadSiteSettings,
    getSiteName,
    getSiteTagline
  }
}