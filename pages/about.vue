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
            <NuxtLink to="/services" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.services') }}</NuxtLink>
            <NuxtLink to="/about" class="text-blue-500 font-medium">{{ t('nav.about') }}</NuxtLink>
            <NuxtLink to="/team" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.team') }}</NuxtLink>
            <NuxtLink to="/contact" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.contact') }}</NuxtLink>
          </div>
          <button class="btn-primary hidden md:block">{{ t('common.getStarted') }}</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="section-padding gradient-bg text-white" style="padding-top: 140px;">
      <div class="container text-center">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">{{ t('about.aboutCompany', { siteName: siteSettings.siteName }) }}</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          {{ t('about.passionateHelping') }}
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section-padding">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">{{ t('titles.ourMission') }}</h2>
            <p class="text-lg text-gray-600 mb-6">
              {{ t('about.missionDescription') }}
            </p>
            <p class="text-lg text-gray-600 mb-8">
              {{ t('about.combineInsights') }}
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div class="text-gray-700">{{ t('about.happyClients') }}</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-3xl font-bold text-green-600 mb-2">10+</div>
                <div class="text-gray-700">{{ t('about.yearsExperience') }}</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 class="text-2xl font-bold mb-4">{{ t('about.whyChooseUs') }}</h3>
              <ul class="space-y-4">
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ t('about.provenTrackRecord') }}
                </li>
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ t('about.dedicatedManagement') }}
                </li>
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ t('about.transparentReporting') }}
                </li>
                <li class="flex items-center">
                  <svg class="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ t('about.support247Available') }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{{ t('about.meetOurTeam') }}</h2>
          <p class="text-xl text-gray-600">{{ t('about.passionateExperts') }}</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="card p-6 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              JS
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Jane Smith</h3>
            <p class="text-blue-600 font-medium mb-3">{{ t('about.ceoFounder') }}</p>
            <p class="text-gray-600 text-sm">{{ t('about.janeDescription') }}</p>
          </div>
          
          <div class="card p-6 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              MJ
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Mike Johnson</h3>
            <p class="text-green-600 font-medium mb-3">Head of SEO</p>
            <p class="text-gray-600 text-sm">SEO expert who has helped clients achieve 400% increases in organic traffic.</p>
          </div>
          
          <div class="card p-6 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              SC
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Sarah Chen</h3>
            <p class="text-purple-600 font-medium mb-3">Creative Director</p>
            <p class="text-gray-600 text-sm">Award-winning designer specializing in conversion-optimized web experiences.</p>
          </div>
          
          <div class="card p-6 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              DW
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">David Wilson</h3>
            <p class="text-red-600 font-medium mb-3">PPC Specialist</p>
            <p class="text-gray-600 text-sm">Google Ads certified professional with expertise in maximizing ROAS.</p>
          </div>
          
          <div class="card p-6 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              EM
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Emily Martinez</h3>
            <p class="text-orange-600 font-medium mb-3">Social Media Manager</p>
            <p class="text-gray-600 text-sm">Social media strategist who builds engaged communities that convert.</p>
          </div>
          
          <div class="card p-6 text-center">
            <div class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              AT
            </div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Alex Thompson</h3>
            <p class="text-indigo-600 font-medium mb-3">Analytics Manager</p>
            <p class="text-gray-600 text-sm">Data scientist who transforms complex metrics into actionable insights.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Our Core Values</h2>
          <p class="text-xl text-gray-600">The principles that guide everything we do</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900">Excellence</h3>
            <p class="text-gray-600">We strive for excellence in every project, delivering results that exceed expectations and drive real business impact.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900">Transparency</h3>
            <p class="text-gray-600">Open communication and honest reporting build trust. We believe in complete transparency in all our client relationships.</p>
          </div>
          
          <div class="text-center">
            <div class="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900">Innovation</h3>
            <p class="text-gray-600">The digital landscape evolves rapidly. We stay ahead of trends and continuously innovate to give our clients a competitive edge.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- History Timeline -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Our Journey</h2>
          <p class="text-xl text-gray-600">From startup to industry leader</p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="space-y-12">
            <div class="flex items-center space-x-6">
              <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2015</div>
              <div class="card p-6 flex-grow">
                <h3 class="text-xl font-bold mb-2 text-gray-900">{{ t('about.theBeginning') }}</h3>
                <p class="text-gray-600">{{ t('about.foundedMission', { siteName: siteSettings.siteName }) }}</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-6">
              <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2018</div>
              <div class="card p-6 flex-grow">
                <h3 class="text-xl font-bold mb-2 text-gray-900">Rapid Growth</h3>
                <p class="text-gray-600">Expanded our team to 25 specialists and served over 200 clients across various industries.</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-6">
              <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2021</div>
              <div class="card p-6 flex-grow">
                <h3 class="text-xl font-bold mb-2 text-gray-900">Innovation Leader</h3>
                <p class="text-gray-600">Launched our proprietary analytics platform and AI-driven optimization tools.</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-6">
              <div class="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">2025</div>
              <div class="card p-6 flex-grow">
                <h3 class="text-xl font-bold mb-2 text-gray-900">Industry Recognition</h3>
                <p class="text-gray-600">Recognized as a top digital marketing agency with over 500 successful client partnerships.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">{{ t('common.workTogether') }}</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {{ t('about.joinBusinesses', { siteName: siteSettings.siteName }) }}
        </p>
        <NuxtLink to="/contact" class="btn-primary bg-white text-blue-600 hover:bg-gray-100">{{ t('common.startJourney') }}</NuxtLink>
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
const { getSiteSettings } = useCMS()
const { t, initLanguage } = useI18n()
const siteSettings = await getSiteSettings()

// Initialize language system
onMounted(() => {
  initLanguage()
})

useSeoMeta({
  title: `About Us | ${siteSettings.siteName} - Digital Marketing Agency`,
  description: `Learn about ${siteSettings.siteName}'s mission, values, and expert team. Discover why we're the trusted digital marketing partner for businesses.`,
})
</script>