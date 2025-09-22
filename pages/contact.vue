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
            <NuxtLink to="/about" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.about') }}</NuxtLink>
            <NuxtLink to="/team" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.team') }}</NuxtLink>
            <NuxtLink to="/contact" class="text-blue-500 font-medium">{{ t('nav.contact') }}</NuxtLink>
          </div>
          <button class="btn-primary hidden md:block">{{ t('common.getStarted') }}</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section 
      class="section-padding text-white relative overflow-hidden" 
      style="padding-top: 140px;"
      :class="contactContent.heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
      :style="contactContent.heroImage ? { backgroundImage: `url(${contactContent.heroImage})` } : {}"
    >
      <!-- Overlay for better text readability when using background image -->
      <div v-if="contactContent.heroImage" class="absolute inset-0 bg-black/40"></div>
      
      <div class="container text-center relative z-10">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">{{ contactContent.title }}</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          {{ contactContent.subtitle }}
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="section-padding">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-bold mb-8 text-gray-900">Let's Start a Conversation</h2>
            <p class="text-lg text-gray-600 mb-8">
              Whether you're looking to boost your online presence, increase conversions, or dominate search results, 
              our team is here to help. Reach out today for a free consultation.
            </p>
            
            <!-- Contact Info Cards -->
            <div class="space-y-6 mb-8">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">Phone</h4>
                  <p class="text-gray-600">+1 (555) 123-4567</p>
                  <p class="text-sm text-gray-500">Available Mon-Fri 9AM-6PM PST</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">Email</h4>
                  <p class="text-gray-600">hello@digitalflow.com</p>
                  <p class="text-sm text-gray-500">We respond within 24 hours</p>
                </div>
              </div>
              
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1">Office</h4>
                  <p class="text-gray-600">123 Innovation Drive<br>Tech Valley, CA 94105</p>
                  <p class="text-sm text-gray-500">Visit us for in-person consultations</p>
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="card p-6">
              <h3 class="text-xl font-bold mb-4 text-gray-900">Business Hours</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">Monday - Friday</span>
                  <span class="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Saturday</span>
                  <span class="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Sunday</span>
                  <span class="font-medium">Closed</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="card p-8">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="relative">
                  <input 
                    v-model="form.firstName" 
                    type="text" 
                    placeholder=" " 
                    class="form-input peer"
                    required
                  >
                  <label class="floating-label">First Name</label>
                </div>
                
                <div class="relative">
                  <input 
                    v-model="form.lastName" 
                    type="text" 
                    placeholder=" " 
                    class="form-input peer"
                    required
                  >
                  <label class="floating-label">Last Name</label>
                </div>
              </div>
              
              <div class="relative">
                <input 
                  v-model="form.email" 
                  type="email" 
                  placeholder=" " 
                  class="form-input peer"
                  required
                >
                <label class="floating-label">Email Address</label>
              </div>
              
              <div class="relative">
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  placeholder=" " 
                  class="form-input peer"
                >
                <label class="floating-label">Phone Number (Optional)</label>
              </div>
              
              <div class="relative">
                <input 
                  v-model="form.company" 
                  type="text" 
                  placeholder=" " 
                  class="form-input peer"
                >
                <label class="floating-label">Company Name</label>
              </div>
              
              <div class="relative">
                <select v-model="form.service" class="form-input peer" required>
                  <option value="">Select a service</option>
                  <option value="seo">SEO Optimization</option>
                  <option value="social-media">Social Media Marketing</option>
                  <option value="web-development">Web Development</option>
                  <option value="ppc">PPC Advertising</option>
                  <option value="email-marketing">Email Marketing</option>
                  <option value="analytics">Analytics & Reporting</option>
                  <option value="consultation">Free Consultation</option>
                  <option value="other">Other</option>
                </select>
                <label class="floating-label">Service Interest</label>
              </div>
              
              <div class="relative">
                <select v-model="form.budget" class="form-input peer">
                  <option value="">Select your budget range</option>
                  <option value="under-5k">Under $5,000/month</option>
                  <option value="5k-10k">$5,000 - $10,000/month</option>
                  <option value="10k-25k">$10,000 - $25,000/month</option>
                  <option value="25k-50k">$25,000 - $50,000/month</option>
                  <option value="50k-plus">$50,000+/month</option>
                </select>
                <label class="floating-label">Budget Range</label>
              </div>
              
              <div class="relative">
                <textarea 
                  v-model="form.message" 
                  placeholder=" " 
                  rows="4" 
                  class="form-input resize-none peer"
                  required
                ></textarea>
                <label class="floating-label">Tell us about your project</label>
              </div>
              
              <!-- Checkbox -->
              <div class="flex items-start space-x-3">
                <input 
                  v-model="form.newsletter" 
                  type="checkbox" 
                  id="newsletter" 
                  class="mt-1 w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                >
                <label for="newsletter" class="text-sm text-gray-600">
                  I'd like to receive updates about digital marketing tips and {{ siteSettings.siteName }} news
                </label>
              </div>
              
              <button 
                type="submit" 
                class="btn-primary w-full"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
              
              <p class="text-sm text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
            
            <!-- Success Message -->
            <div v-if="showSuccessMessage" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-green-700 font-medium">Thank you! We'll be in touch within 24 hours.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-gray-50">
      <div class="container max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2>
          <p class="text-xl text-gray-600">Get quick answers to common questions</p>
        </div>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="faq.id" class="card">
            <button 
              @click="toggleFaq(index)" 
              class="w-full p-6 text-left flex justify-between items-center"
            >
              <h3 class="text-lg font-bold text-gray-900">{{ faq.question }}</h3>
              <svg class="w-5 h-5 text-gray-500 transform transition-transform" :class="{ 'rotate-180': openFaq === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="openFaq === index" class="px-6 pb-6">
              <p class="text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">{{ t('home.readyToGetStarted') }}</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join hundreds of businesses that have transformed their digital presence with {{ siteSettings.siteName }}
        </p>
        <button class="btn-primary bg-white text-blue-600 hover:bg-gray-100">{{ t('common.scheduleConsultation') }}</button>
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
// Load site settings, contact content and FAQs
const { getContactContent, getFAQs, getSiteSettings } = useCMS()
const { t, initLanguage, currentLanguage } = useI18n()
const contactContentRaw = await getContactContent()
const faqs = await getFAQs()
const siteSettings = await getSiteSettings()

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
const contactContent = computed(() => ({
  // Basic fields
  heroImage: contactContentRaw.heroImage,
  
  // Multi-language text fields
  title: getLocalizedContent(contactContentRaw.title, 'Contact Us'),
  subtitle: getLocalizedContent(contactContentRaw.subtitle, 'Ready to transform your digital presence? Let\'s discuss how we can help accelerate your business growth.'),
}))

// Initialize language system
onMounted(() => {
  initLanguage()
})

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
  newsletter: false
})

// Form state
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

// FAQ state
const openFaq = ref(-1)

// FAQs already loaded above via CMS composable

// Methods
const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    showSuccessMessage.value = true
    // Reset form
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'boolean') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? -1 : index
}

useSeoMeta({
  title: `Contact Us | ${siteSettings.siteName} - Get Your Free Consultation`,
  description: `Ready to transform your digital presence? Contact ${siteSettings.siteName} today for a free consultation. Our digital marketing experts are ready to help grow your business.`,
})
</script>