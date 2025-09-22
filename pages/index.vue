<template>
  <div class="min-h-screen">
    <!-- Top Navbar -->
    <TopNavbar />
    
    <!-- Navigation -->
    <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100" style="top: 40px;">
      <div class="container">
        <div class="flex justify-between items-center py-4">
          <div class="text-2xl font-bold gradient-text">{{ siteSettings.siteName }}</div>
          <div class="hidden md:flex space-x-8">
            <a href="#home" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.home') }}</a>
            <a href="#services" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.services') }}</a>
            <a href="#about" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.about') }}</a>
            <a href="#team" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.team') }}</a>
            <a href="#contact" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.contact') }}</a>
          </div>
          <NuxtLink to="/contact" class="btn-primary hidden md:block">{{ homeContent.ctaButtonText }}</NuxtLink>
          <button class="md:hidden p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section 
      id="home" 
      class="section-padding text-white relative"
      :class="homeContent.heroImage ? 'hero-with-image' : 'gradient-bg'"
      :style="homeContent.heroImage ? {
        backgroundImage: `url(${homeContent.heroImage})`,
        paddingTop: '140px'
      } : { paddingTop: '140px' }"
    >
      <!-- Dark overlay for better text readability when using background image -->
      <div v-if="homeContent.heroImage" class="absolute inset-0 bg-black/50 z-0"></div>
      <div class="container relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="fade-in-up">
            <h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              {{ homeContent.heroTitle }}
            </h1>
            <p class="text-xl mb-8 text-blue-100">
              {{ homeContent.heroSubtitle }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink to="/contact" class="btn-primary text-center">
                {{ homeContent.ctaButtonText }}
              </NuxtLink>
              <NuxtLink to="/services" class="btn-secondary border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 text-center transform transition-all duration-300">
                {{ t('common.viewServices') }}
              </NuxtLink>
            </div>
          </div>
          <div class="relative max-w-md mx-auto">
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 transform hover:scale-105 transition-transform duration-300 max-h-96 overflow-hidden">
              <div class="text-center max-w-xs mx-auto">
                <!-- Feature Image or Icon -->
                <div v-if="homeContent.featureImage" class="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <img 
                    :src="homeContent.featureImage" 
                    :alt="homeContent.featureTitle || t('home.lightningFast')"
                    class="w-full h-full object-cover"
                  >
                </div>
                <div v-else class="w-32 h-32 bg-gradient-primary-to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                  </svg>
                </div>
                <h3 class="text-xl md:text-2xl font-bold mb-2 line-clamp-2">{{ homeContent.featureTitle || t('home.lightningFast') }}</h3>
                <p class="text-blue-100 text-sm md:text-base line-clamp-3">{{ homeContent.featureDescription || t('home.accelerateTransformation') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{{ t('home.digitalMarketingServices') }}</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ t('home.comprehensiveSolutions') }}
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.id" class="card p-8 text-center relative overflow-hidden">
            <!-- Color accent bar -->
            <div 
              class="absolute top-0 left-0 w-full h-1"
              :style="{ backgroundColor: service.color || '#6495ed' }"
            ></div>
            
            <div 
              class="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white"
              :style="{ backgroundColor: service.color || '#6495ed' }"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="service.icon === 'search'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                <path v-else-if="service.icon === 'social'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 20h13L17 4M9 9v6M15 9v6"></path>
                <path v-else-if="service.icon === 'code'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                <path v-else-if="service.icon === 'ads'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h9a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                <path v-else-if="service.icon === 'email'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                <path v-else-if="service.icon === 'analytics'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">{{ service.title }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
            
            <div v-if="service.features?.length" class="mt-4">
              <div class="flex flex-wrap gap-2 justify-center">
                <span 
                  v-for="feature in service.features.slice(0, 3)" 
                  :key="feature"
                  class="px-2 py-1 text-xs rounded-full text-white"
                  :style="{ backgroundColor: service.color || '#6495ed', opacity: 0.8 }"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>

          <!-- Show message if no services -->
          <div v-if="services.length === 0" class="col-span-full text-center py-12">
            <p class="text-gray-500">{{ t('home.servicesWillAppear') }}</p>
          </div>
        </div>
        
        <!-- View All Services Button -->
        <div class="text-center mt-12">
          <NuxtLink to="/services" class="btn-primary inline-flex items-center">
            {{ t('common.viewAllServices') }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section-padding">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">{{ homeContent.aboutTitle }}</h2>
            <p class="text-lg text-gray-600 mb-8">
              {{ homeContent.aboutDescription }}
            </p>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-2">{{ t('home.provenResults') }}</h4>
                  <p class="text-gray-600">{{ t('home.trackRecord') }}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-2">{{ t('home.expertTeam') }}</h4>
                  <p class="text-gray-600">{{ t('home.dedicatedProfessionals') }}</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-2">24/7 Support</h4>
                  <p class="text-gray-600">Dedicated account management and round-the-clock support</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <div class="bg-gradient-primary-to-secondary rounded-2xl p-8 text-white">
              <div class="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div class="text-3xl font-bold mb-2">500+</div>
                  <div class="text-blue-100">{{ t('home.projectsCompleted') }}</div>
                </div>
                <div>
                  <div class="text-3xl font-bold mb-2">98%</div>
                  <div class="text-blue-100">{{ t('home.clientSatisfaction') }}</div>
                </div>
                <div>
                  <div class="text-3xl font-bold mb-2">10+</div>
                  <div class="text-blue-100">{{ t('home.yearsExperience') }}</div>
                </div>
                <div>
                  <div class="text-3xl font-bold mb-2">24/7</div>
                  <div class="text-blue-100">{{ t('home.supportAvailable') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Learn More Button -->
        <div class="text-center mt-12">
          <NuxtLink to="/about" class="btn-primary inline-flex items-center">
            {{ t('common.learnMore') }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- People Section -->
    <section id="team" class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{{ homeContent.peopleTitle }}</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            {{ homeContent.peopleDescription }}
          </p>
        </div>

        <!-- People Grid -->
        <div v-if="teamMembers.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="member in teamMembers.slice(0, 6)" :key="member.id" class="card group hover:shadow-xl transition-all duration-300">
            <!-- Member Image -->
            <div class="relative overflow-hidden rounded-t-xl">
              <div v-if="member.image" class="aspect-square">
                <img 
                  :src="member.image" 
                  :alt="member.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                >
              </div>
              <div v-else class="aspect-square bg-gradient-to-br from-primary-very-light to-primary-light flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>

            <!-- Member Info -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-1">{{ member.name }}</h3>
              <p class="text-blue-600 font-medium mb-3">{{ member.position }}</p>
              <p class="text-gray-600 text-sm line-clamp-3">{{ member.description }}</p>

              <!-- Social Links -->
              <div class="flex space-x-3 mt-4">
                <a 
                  v-if="member.email" 
                  :href="`mailto:${member.email}`" 
                  class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
                <a 
                  v-if="member.linkedin" 
                  :href="member.linkedin" 
                  target="_blank"
                  class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  v-if="member.twitter" 
                  :href="member.twitter" 
                  target="_blank"
                  class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ t('home.buildingOurShowcase') }}</h3>
          <p class="text-gray-600">{{ t('home.assembleTalented') }}</p>
        </div>

        <!-- Meet All People Button -->
        <div v-if="teamMembers.length > 0" class="text-center mt-12">
          <NuxtLink to="/team" class="btn-primary inline-flex items-center">
            {{ t('common.meetAllOurPeople') }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="section-padding">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{{ t('home.readyToGetStarted') }}</h2>
          <p class="text-xl text-gray-600">{{ t('home.letsDiscuss') }}</p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div>
            <h3 class="text-2xl font-bold mb-6 text-gray-900">{{ t('titles.getInTouch') }}</h3>
            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">{{ t('footer.phone') }}</h4>
                  <p class="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">{{ t('footer.email') }}</h4>
                  <p class="text-gray-600">hello@digitalflow.com</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">{{ t('footer.office') }}</h4>
                  <p class="text-gray-600">123 Innovation Drive<br>Tech Valley, CA 94105</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card p-8">
            <form class="space-y-6">
              <div class="relative">
                <input type="text" placeholder=" " class="form-input">
                <label class="floating-label">{{ t('home.fullName') }}</label>
              </div>
              
              <div class="relative">
                <input type="email" placeholder=" " class="form-input">
                <label class="floating-label">{{ t('home.emailAddress') }}</label>
              </div>
              
              <div class="relative">
                <input type="text" placeholder=" " class="form-input">
                <label class="floating-label">{{ t('home.company') }}</label>
              </div>
              
              <div class="relative">
                <textarea placeholder=" " rows="4" class="form-input resize-none"></textarea>
                <label class="floating-label">{{ t('home.message') }}</label>
              </div>
              
              <button type="submit" class="btn-primary w-full">{{ t('common.sendMessage') }}</button>
            </form>
          </div>
        </div>
        
        <!-- Get In Touch Button -->
        <div class="text-center mt-12">
          <NuxtLink to="/contact" class="btn-primary inline-flex items-center">
            {{ t('common.getInTouch') }}
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </NuxtLink>
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
              <li><NuxtLink to="/services" class="hover:text-white transition-colors">{{ t('footer.seoOptimization') }}</NuxtLink></li>
              <li><NuxtLink to="/services" class="hover:text-white transition-colors">{{ t('footer.socialMediaMarketing') }}</NuxtLink></li>
              <li><NuxtLink to="/services" class="hover:text-white transition-colors">{{ t('footer.webDevelopment') }}</NuxtLink></li>
              <li><NuxtLink to="/services" class="hover:text-white transition-colors">{{ t('footer.ppcAdvertising') }}</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.company') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink to="/about" class="hover:text-white transition-colors">{{ t('footer.aboutUs') }}</NuxtLink></li>
              <li><NuxtLink to="/team" class="hover:text-white transition-colors">{{ t('footer.ourPeople') }}</NuxtLink></li>
              <li><NuxtLink to="/contact" class="hover:text-white transition-colors">{{ t('footer.careers') }}</NuxtLink></li>
              <li><NuxtLink to="/" class="hover:text-white transition-colors">{{ t('footer.blog') }}</NuxtLink></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.contact') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li>+1 (555) 123-4567</li>
              <li>hello@digitalflow.com</li>
              <li>123 Innovation Drive<br>Tech Valley, CA 94105</li>
              <li class="pt-2">
                <NuxtLink to="/contact" class="btn-primary">{{ t('common.getInTouch') }}</NuxtLink>
              </li>
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
const { getHomeContent, getServices, getSiteSettings, getTeamMembers } = useCMS()
const { t, initLanguage } = useI18n()

// Initialize language system
onMounted(() => {
  initLanguage()
})

// Load CMS content
const homeContent = await getHomeContent()
const services = await getServices()
const siteSettings = await getSiteSettings()
const teamMembers = await getTeamMembers()

// Helper functions for service icons
const getServiceIcon = (iconName) => {
  const iconMap = {
    'search': 'svg',
    'social': 'svg', 
    'code': 'svg',
    'ads': 'svg',
    'email': 'svg',
    'analytics': 'svg'
  }
  
  // Return a simple div with SVG if no specific component
  return 'svg'
}

const getIconColorClass = (iconName) => {
  const colorMap = {
    'search': 'bg-blue-100 text-blue-500',
    'social': 'bg-green-100 text-green-500',
    'code': 'bg-purple-100 text-purple-500',
    'ads': 'bg-red-100 text-red-500',
    'email': 'bg-yellow-100 text-yellow-500',
    'analytics': 'bg-indigo-100 text-indigo-500'
  }
  
  return colorMap[iconName] || 'bg-gray-100 text-gray-500'
}

// Update page title with CMS data
const pageTitle = `${siteSettings.siteName} - ${siteSettings.siteTagline}`

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: homeContent.heroSubtitle,
  ogDescription: homeContent.heroSubtitle,
  ogImage: homeContent.heroImage || '/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>