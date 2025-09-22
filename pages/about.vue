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
    <section 
      class="section-padding text-white relative overflow-hidden" 
      style="padding-top: 140px;"
      :class="aboutContent.heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
      :style="aboutContent.heroImage ? { backgroundImage: `url(${aboutContent.heroImage})` } : {}"
    >
      <!-- Overlay for better text readability when using background image -->
      <div v-if="aboutContent.heroImage" class="absolute inset-0 bg-black/40"></div>
      
      <div class="container text-center relative z-10">
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
            <h2 class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">{{ aboutContent.missionTitle }}</h2>
            <p class="text-lg text-gray-600 mb-6">
              {{ aboutContent.missionText }}
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-3xl font-bold text-blue-600 mb-2">{{ aboutContent.happyClientsCount }}</div>
                <div class="text-gray-700">{{ aboutContent.happyClientsLabel }}</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-3xl font-bold text-green-600 mb-2">{{ aboutContent.experienceCount }}</div>
                <div class="text-gray-700">{{ aboutContent.experienceLabel }}</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div 
              class="rounded-2xl p-8 text-white relative overflow-hidden"
              :class="aboutContent.missionImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
              :style="aboutContent.missionImage ? { backgroundImage: `url(${aboutContent.missionImage})` } : {}"
            >
              <!-- Overlay for better text readability when using background image -->
              <div v-if="aboutContent.missionImage" class="absolute inset-0 bg-black/60"></div>
              
              <div class="relative z-10">
                <h3 class="text-2xl font-bold mb-4">{{ aboutContent.visionTitle }}</h3>
                <p class="text-gray-100 mb-6">{{ aboutContent.visionText }}</p>
                <ul class="space-y-4">
                  <li 
                    v-for="item in parsedVisionItems" 
                    :key="item"
                    class="flex items-center"
                  >
                    <svg class="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Values Section -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{{ aboutContent.valuesTitle }}</h2>
          <p class="text-xl text-gray-600">{{ aboutContent.valuesText }}</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="(value, index) in parsedValuesItems" 
            :key="value.title"
            class="text-center"
          >
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" :class="getValueIconClass(index)">
              <div v-html="getValueIcon(value.icon || 'default')"></div>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- History Timeline -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">{{ aboutContent.historyTitle }}</h2>
          <p class="text-xl text-gray-600">{{ aboutContent.historyText }}</p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="space-y-12">
            <div 
              v-for="(journey, index) in parsedJourneyItems" 
              :key="journey.year"
              class="flex items-center space-x-6"
            >
              <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" :class="getJourneyColor(index)">{{ journey.year }}</div>
              <div class="card p-6 flex-grow">
                <h3 class="text-xl font-bold mb-2 text-gray-900">{{ journey.title }}</h3>
                <p class="text-gray-600">{{ journey.description }}</p>
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
const { getSiteSettings, getAboutContent } = useCMS()
const { t, initLanguage, currentLanguage } = useI18n()
const siteSettings = await getSiteSettings()
const aboutContentRaw = await getAboutContent()

// Helper function to get language-specific content
const getLocalizedContent = (field, fallback = '') => {
  try {
    if (typeof field === 'string') {
      const parsed = JSON.parse(field)
      return parsed[currentLanguage.value] || parsed.en || fallback
    }
    return field || fallback
  } catch {
    return field || fallback
  }
}

// Create reactive localized content
const aboutContent = computed(() => ({
  // Basic fields
  heroImage: aboutContentRaw.heroImage,
  missionImage: aboutContentRaw.missionImage,
  
  // Multi-language text fields
  missionTitle: getLocalizedContent(aboutContentRaw.missionTitle, 'Our Mission'),
  missionText: getLocalizedContent(aboutContentRaw.missionText, 'We believe every business deserves to succeed online.'),
  visionTitle: getLocalizedContent(aboutContentRaw.visionTitle, 'Our Vision'),
  visionText: getLocalizedContent(aboutContentRaw.visionText, 'To become the leading digital marketing agency.'),
  valuesTitle: getLocalizedContent(aboutContentRaw.valuesTitle, 'Our Values'),
  valuesText: getLocalizedContent(aboutContentRaw.valuesText, 'Excellence, Transparency, Innovation - these core values guide everything we do.'),
  historyTitle: getLocalizedContent(aboutContentRaw.historyTitle, 'Our Journey'),
  historyText: getLocalizedContent(aboutContentRaw.historyText, 'From startup to industry leader.'),
  
  // Statistics
  happyClientsCount: getLocalizedContent(aboutContentRaw.happyClientsCount, '500+'),
  happyClientsLabel: getLocalizedContent(aboutContentRaw.happyClientsLabel, 'Happy Clients'),
  experienceCount: getLocalizedContent(aboutContentRaw.experienceCount, '10+'),
  experienceLabel: getLocalizedContent(aboutContentRaw.experienceLabel, 'Years Experience'),
}))

// Parse dynamic arrays with multi-language support
const parsedVisionItems = computed(() => {
  try {
    const items = JSON.parse(aboutContentRaw.visionItems || '[]')
    if (items.length > 0) {
      return items.map(item => 
        typeof item === 'object' && item[currentLanguage.value] 
          ? item[currentLanguage.value] 
          : item.en || item || 'Vision Item'
      )
    }
    // Fallback items
    const fallbackItems = [
      { en: 'Proven Track Record', th: 'ประวัติที่พิสูจน์แล้ว' },
      { en: 'Dedicated Management', th: 'การจัดการที่ทุ่มเท' },
      { en: 'Transparent Reporting', th: 'รายงานที่โปร่งใส' },
      { en: '24/7 Support Available', th: 'บริการสนับสนุน 24/7' }
    ]
    return fallbackItems.map(item => item[currentLanguage.value] || item.en)
  } catch {
    const fallbackItems = [
      { en: 'Proven Track Record', th: 'ประวัติที่พิสูจน์แล้ว' },
      { en: 'Dedicated Management', th: 'การจัดการที่ทุ่มเท' },
      { en: 'Transparent Reporting', th: 'รายงานที่โปร่งใส' },
      { en: '24/7 Support Available', th: 'บริการสนับสนุน 24/7' }
    ]
    return fallbackItems.map(item => item[currentLanguage.value] || item.en)
  }
})

const parsedValuesItems = computed(() => {
  try {
    const items = JSON.parse(aboutContentRaw.valuesItems || '[]')
    if (items.length > 0) {
      return items.map(item => ({
        title: typeof item.title === 'object' 
          ? item.title[currentLanguage.value] || item.title.en || 'Value'
          : item.title || 'Value',
        description: typeof item.description === 'object'
          ? item.description[currentLanguage.value] || item.description.en || 'Description'
          : item.description || 'Description',
        icon: item.icon || 'default'
      }))
    }
    // Fallback items with multi-language support
    const fallbackItems = [
      {
        title: { en: 'Excellence', th: 'ความเป็นเลิศ' },
        description: { en: 'We strive for excellence in every project, delivering results that exceed expectations.', th: 'เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง' },
        icon: 'excellence'
      },
      {
        title: { en: 'Transparency', th: 'ความโปร่งใส' },
        description: { en: 'Open communication and honest reporting build trust in all our client relationships.', th: 'การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจ' },
        icon: 'transparency'
      },
      {
        title: { en: 'Innovation', th: 'นวัตกรรม' },
        description: { en: 'We stay ahead of trends and continuously innovate to give clients a competitive edge.', th: 'เราก้าวนำเทรนด์และสร้างนวัตกรรมเพื่อให้ลูกค้ามีความได้เปรียบ' },
        icon: 'innovation'
      }
    ]
    return fallbackItems.map(item => ({
      title: item.title[currentLanguage.value] || item.title.en,
      description: item.description[currentLanguage.value] || item.description.en,
      icon: item.icon
    }))
  } catch {
    const fallbackItems = [
      {
        title: { en: 'Excellence', th: 'ความเป็นเลิศ' },
        description: { en: 'We strive for excellence in every project, delivering results that exceed expectations.', th: 'เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง' },
        icon: 'excellence'
      },
      {
        title: { en: 'Transparency', th: 'ความโปร่งใส' },
        description: { en: 'Open communication and honest reporting build trust in all our client relationships.', th: 'การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจ' },
        icon: 'transparency'
      },
      {
        title: { en: 'Innovation', th: 'นวัตกรรม' },
        description: { en: 'We stay ahead of trends and continuously innovate to give clients a competitive edge.', th: 'เราก้าวนำเทรนด์และสร้างนวัตกรรมเพื่อให้ลูกค้ามีความได้เปรียบ' },
        icon: 'innovation'
      }
    ]
    return fallbackItems.map(item => ({
      title: item.title[currentLanguage.value] || item.title.en,
      description: item.description[currentLanguage.value] || item.description.en,
      icon: item.icon
    }))
  }
})

const parsedJourneyItems = computed(() => {
  try {
    const items = JSON.parse(aboutContentRaw.journeyItems || '[]')
    if (items.length > 0) {
      return items.map(item => ({
        year: item.year || '2024',
        title: typeof item.title === 'object'
          ? item.title[currentLanguage.value] || item.title.en || 'Journey Item'
          : item.title || 'Journey Item',
        description: typeof item.description === 'object'
          ? item.description[currentLanguage.value] || item.description.en || 'Description'
          : item.description || 'Description'
      }))
    }
    // Fallback items with multi-language support
    const fallbackItems = [
      {
        year: '2015',
        title: { en: 'The Beginning', th: 'จุดเริ่มต้น' },
        description: { en: `Founded ${siteSettings.siteName} with a mission to help businesses succeed through digital marketing.`, th: `ก่อตั้ง ${siteSettings.siteName} ด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล` }
      },
      {
        year: '2018',
        title: { en: 'Rapid Growth', th: 'การเติบโตอย่างรวดเร็ว' },
        description: { en: 'Expanded to 25 specialists and served over 200 clients across industries.', th: 'ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม' }
      },
      {
        year: '2021',
        title: { en: 'Innovation Leader', th: 'ผู้นำด้านนวัตกรรม' },
        description: { en: 'Launched proprietary analytics platform and AI-driven tools.', th: 'เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI' }
      },
      {
        year: '2025',
        title: { en: 'Industry Recognition', th: 'การยอมรับในอุตสาหกรรม' },
        description: { en: 'Recognized as top agency with over 500 successful partnerships.', th: 'ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ' }
      }
    ]
    return fallbackItems.map(item => ({
      year: item.year,
      title: item.title[currentLanguage.value] || item.title.en,
      description: item.description[currentLanguage.value] || item.description.en
    }))
  } catch {
    const fallbackItems = [
      {
        year: '2015',
        title: { en: 'The Beginning', th: 'จุดเริ่มต้น' },
        description: { en: `Founded ${siteSettings.siteName} with a mission to help businesses succeed through digital marketing.`, th: `ก่อตั้ง ${siteSettings.siteName} ด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล` }
      },
      {
        year: '2018',
        title: { en: 'Rapid Growth', th: 'การเติบโตอย่างรวดเร็ว' },
        description: { en: 'Expanded to 25 specialists and served over 200 clients across industries.', th: 'ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม' }
      },
      {
        year: '2021',
        title: { en: 'Innovation Leader', th: 'ผู้นำด้านนวัตกรรม' },
        description: { en: 'Launched proprietary analytics platform and AI-driven tools.', th: 'เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI' }
      },
      {
        year: '2025',
        title: { en: 'Industry Recognition', th: 'การยอมรับในอุตสาหกรรม' },
        description: { en: 'Recognized as top agency with over 500 successful partnerships.', th: 'ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ' }
      }
    ]
    return fallbackItems.map(item => ({
      year: item.year,
      title: item.title[currentLanguage.value] || item.title.en,
      description: item.description[currentLanguage.value] || item.description.en
    }))
  }
})

// Helper functions
const getValueIconClass = (index) => {
  const classes = ['bg-blue-100', 'bg-green-100', 'bg-purple-100']
  return classes[index % classes.length]
}

const getValueIcon = (iconType) => {
  const icons = {
    excellence: '<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>',
    transparency: '<svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',
    innovation: '<svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
    default: '<svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
  }
  return icons[iconType] || icons.default
}

const getJourneyColor = (index) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500']
  return colors[index % colors.length]
}

// Initialize language system
onMounted(() => {
  initLanguage()
})

useSeoMeta({
  title: `About Us | ${siteSettings.siteName} - Digital Marketing Agency`,
  description: `Learn about ${siteSettings.siteName}'s mission, values, and expert team. Discover why we're the trusted digital marketing partner for businesses.`,
})
</script>