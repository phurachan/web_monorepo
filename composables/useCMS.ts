export const useCMS = () => {
  const getHomeContent = async () => {
    try {
      const data = await $fetch('/api/cms/home-content')
      return data || getDefaultHomeContent()
    } catch (error) {
      console.error('Failed to fetch home content:', error)
      return getDefaultHomeContent()
    }
  }

  const getServices = async () => {
    try {
      const data = await $fetch('/api/cms/services')
      // Ensure features are parsed as arrays (fallback parsing)
      const servicesWithParsedFeatures = data?.map(service => ({
        ...service,
        features: typeof service.features === 'string' 
          ? JSON.parse(service.features) 
          : Array.isArray(service.features) 
            ? service.features 
            : []
      })) || []
      return servicesWithParsedFeatures.filter(s => s.isActive)
    } catch (error) {
      console.error('Failed to fetch services:', error)
      return []
    }
  }

  const getAboutContent = async () => {
    try {
      const data = await $fetch('/api/cms/about-content')
      return data || getDefaultAboutContent()
    } catch (error) {
      console.error('Failed to fetch about content:', error)
      return getDefaultAboutContent()
    }
  }

  const getTeamMembers = async () => {
    try {
      const data = await $fetch('/api/cms/team')
      return data || []
    } catch (error) {
      console.error('Failed to fetch team members:', error)
      return []
    }
  }

  const getContactContent = async () => {
    try {
      const data = await $fetch('/api/cms/contact-content')
      return data || getDefaultContactContent()
    } catch (error) {
      console.error('Failed to fetch contact content:', error)
      return getDefaultContactContent()
    }
  }

  const getFAQs = async () => {
    try {
      const data = await $fetch('/api/cms/faqs')
      return data?.filter(f => f.isActive) || []
    } catch (error) {
      console.error('Failed to fetch FAQs:', error)
      return []
    }
  }

  const getSiteSettings = async () => {
    try {
      const data = await $fetch('/api/cms/site-settings')
      return data || getDefaultSiteSettings()
    } catch (error) {
      console.error('Failed to fetch site settings:', error)
      return getDefaultSiteSettings()
    }
  }

  return {
    getHomeContent,
    getServices,
    getAboutContent,
    getTeamMembers,
    getContactContent,
    getFAQs,
    getSiteSettings
  }
}

// Default content functions
const getDefaultHomeContent = () => ({
  heroTitle: 'Elevate Your Digital Presence',
  heroSubtitle: 'We craft innovative digital marketing solutions that drive growth, boost engagement, and transform your business for the digital age.',
  ctaText: 'Ready to Get Started?',
  ctaButtonText: 'Start Your Journey',
  aboutTitle: 'Why Choose Us?',
  aboutDescription: 'With over a decade of experience in digital marketing, we\'ve helped hundreds of businesses transform their online presence and achieve remarkable growth.',
  heroImage: null,
  aboutImage: null,
  peopleTitle: 'Meet Our People',
  peopleDescription: 'Get to know the talented individuals who drive our success and make exceptional results possible'
})

const getDefaultAboutContent = () => ({
  missionTitle: 'Our Mission',
  missionText: 'We believe every business deserves to succeed online.',
  visionTitle: 'Our Vision',
  visionText: 'To become the leading digital marketing agency that transforms businesses through innovative technology.',
  valuesTitle: 'Our Values',
  valuesText: 'Excellence, Transparency, Innovation - these core values guide everything we do.',
  teamTitle: 'Meet Our Team',
  teamDescription: 'Passionate experts dedicated to your success',
  historyTitle: 'Our Journey',
  historyText: 'From startup to industry leader, we\'ve been helping businesses grow since 2015.',
  bannerImage: null
})

const getDefaultContactContent = () => ({
  title: 'Get In Touch',
  subtitle: 'Ready to transform your digital presence? Let\'s discuss how we can help accelerate your business growth.',
  phone: '+1 (555) 123-4567',
  email: 'hello@example.com',
  address: '123 Innovation Drive, Tech Valley, CA 94105',
  businessHours: JSON.stringify({
    'Monday - Friday': '9:00 AM - 6:00 PM',
    'Saturday': '10:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  }),
  bannerImage: null
})

const getDefaultSiteSettings = () => ({
  siteName: 'Digital Agency',
  siteTagline: 'Elevating brands through innovative digital marketing solutions',
  primaryColor: '#6495ed',
  socialLinks: JSON.stringify({
    twitter: '#',
    linkedin: '#',
    facebook: '#'
  }),
  logo: null,
  favicon: null
})