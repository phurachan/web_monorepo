<template>
  <div class="min-h-screen">
    <!-- Top Navbar -->
    <TopNavbar />
    
    <!-- Navigation -->
    <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100" style="top: 40px;">
      <div class="container">
        <div class="flex justify-between items-center py-4">
          <NuxtLink to="/" class="text-2xl font-bold gradient-text">{{ siteSettings.siteName }}</NuxtLink>
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.home') }}</NuxtLink>
            <NuxtLink to="/services" class="text-blue-500 font-medium">{{ t('nav.services') }}</NuxtLink>
            <NuxtLink to="/about" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.about') }}</NuxtLink>
            <NuxtLink to="/team" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.team') }}</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.contact') }}</NuxtLink>
          </div>
          <button class="btn-primary hidden md:block">{{ t('common.getStarted') }}</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section 
      class="section-padding text-white relative overflow-hidden" 
      style="padding-top: 140px;"
      :class="servicesContent.heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
      :style="servicesContent.heroImage ? { backgroundImage: `url(${servicesContent.heroImage})` } : {}"
    >
      <!-- Overlay for better text readability when using background image -->
      <div v-if="servicesContent.heroImage" class="absolute inset-0 bg-black/40"></div>
      
      <div class="container text-center relative z-10">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">{{ servicesContent.heroTitle }}</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          {{ servicesContent.heroSubtitle }}
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- SEO Services -->
          <div class="card p-8">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">{{ t('footer.seoOptimization') }}</h3>
            </div>
            <p class="text-gray-600 mb-6">{{ t('services.seoDescription') }}</p>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ t('services.keywordResearch') }}
              </li>
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ t('services.onPageSEO') }}
              </li>
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                {{ t('services.linkBuilding') }}
              </li>
            </ul>
            <button class="btn-primary">{{ t('common.learnMore') }}</button>
          </div>

          <!-- Social Media Marketing -->
          <div class="card p-8">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 20h13L17 4M9 9v6M15 9v6"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">Social Media Marketing</h3>
            </div>
            <p class="text-gray-600 mb-6">Build meaningful connections with your audience across all major social platforms through engaging content and strategic campaigns.</p>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Content Strategy & Creation
              </li>
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Community Management
              </li>
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Paid Social Advertising
              </li>
            </ul>
            <button class="btn-primary">{{ t('common.learnMore') }}</button>
          </div>

          <!-- Web Development -->
          <div class="card p-8">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">Web Development</h3>
            </div>
            <p class="text-gray-600 mb-6">Create stunning, responsive websites that not only look amazing but also convert visitors into loyal customers.</p>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Custom Website Design
              </li>
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                E-commerce Solutions
              </li>
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Mobile-First Design
              </li>
            </ul>
            <button class="btn-primary">{{ t('common.learnMore') }}</button>
          </div>

          <!-- PPC Advertising -->
          <div class="card p-8">
            <div class="flex items-center mb-6">
              <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h9a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-gray-900">PPC Advertising</h3>
            </div>
            <p class="text-gray-600 mb-6">Maximize your ROI with targeted pay-per-click campaigns that deliver immediate results and qualified leads.</p>
            <ul class="space-y-3 mb-6">
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Google Ads Management
              </li>
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Social Media Ads
              </li>
              <li class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Landing Page Optimization
              </li>
            </ul>
            <button class="btn-primary">{{ t('common.learnMore') }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Our Process</h2>
          <p class="text-xl text-gray-600">A proven methodology that delivers consistent results</p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Discovery</h3>
            <p class="text-gray-600">We analyze your business, audience, and competition to create a tailored strategy.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Strategy</h3>
            <p class="text-gray-600">Develop comprehensive digital marketing strategies aligned with your goals.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Execute</h3>
            <p class="text-gray-600">Implement campaigns with precision using cutting-edge tools and techniques.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Optimize</h3>
            <p class="text-gray-600">Continuously monitor and refine strategies for maximum performance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">{{ t('services.readyToTransform') }}</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {{ t('services.discussServices') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn-primary bg-white text-blue-600 hover:bg-gray-100">{{ t('common.getFreeConsultation') }}</NuxtLink>
          <button class="btn-secondary border-white text-white hover:bg-white hover:text-blue-600">{{ t('common.viewCaseStudies') }}</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="text-2xl font-bold mb-4">{{ siteSettings.siteName }}</div>
            <p class="text-gray-400 mb-4">{{ t('footer.elevatingBrands') }}</p>
            <div class="grid grid-cols-3 gap-3 max-w-[156px]">
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <img src="/social_icons/icons8-facebook-50.png" alt="Facebook" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                <img src="/social_icons/icons8-instagram-50.png" alt="Instagram" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <img src="/social_icons/icons8-line-50.png" alt="Line" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors">
                <img src="/social_icons/icons8-tiktok-50.png" alt="TikTok" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <img src="/social_icons/icons8-youtube-50.png" alt="YouTube" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <img src="/social_icons/icons8-linkedin-circled-50.png" alt="LinkedIn" class="w-7 h-7 object-contain">
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.services') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.seoOptimization') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.socialMediaMarketing') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.webDevelopment') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.ppcAdvertising') }}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.company') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/about" class="hover:text-white transition-colors">{{ t('footer.aboutUs') }}</NuxtLink></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.ourPeople') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.careers') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.blog') }}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.contact') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li>+1 (555) 123-4567</li>
              <li>hello@digitalflow.com</li>
              <li>123 Innovation Drive<br>Tech Valley, CA 94105</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 {{ siteSettings.siteName }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Load site settings and services content from CMS
const { getSiteSettings, getServicesContent } = useCMS()
const { t, initLanguage } = useI18n()
const siteSettings = await getSiteSettings()
const servicesContent = await getServicesContent()

// Initialize language system
onMounted(() => {
  initLanguage()
})

useSeoMeta({
  title: `Digital Marketing Services | ${siteSettings.siteName}`,
  description: 'Comprehensive digital marketing services including SEO, social media marketing, web development, and PPC advertising to grow your business.',
})
</script>