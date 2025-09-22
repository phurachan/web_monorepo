<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-4">
            <NuxtLink to="/manage" class="text-blue-600 hover:text-blue-500">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            </NuxtLink>
            <h1 class="text-xl font-semibold text-gray-900">Edit About Page</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <NuxtLink to="/about" target="_blank" class="btn-secondary">View Live</NuxtLink>
            <button @click="handleLogout" class="btn-secondary">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Language Switcher -->
      <div v-else class="card p-4 mb-8">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Content Language</h3>
          <div class="flex items-center bg-gray-100 rounded-lg p-1">
            <button 
              @click="currentLanguage = 'en'"
              type="button"
              :class="currentLanguage === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🇺🇸 English
            </button>
            <button 
              @click="currentLanguage = 'th'"
              type="button"
              :class="currentLanguage === 'th' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🇹🇭 ไทย
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">
          Switch between languages to edit content. {{ currentLanguage === 'en' ? 'Editing English content' : 'กำลังแก้ไขเนื้อหาภาษาไทย' }}
        </p>
      </div>

      <!-- Form -->
      <form v-if="!loading" @submit.prevent="handleSubmit" class="space-y-8">

        <!-- Hero Background Image -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Hero Background Image</h2>
          <ImageUpload 
            v-model="formData.heroImage" 
            label="Hero Section Background (optional)"
            help-text="Recommended: High-quality image, 1920x1080px or larger. Will be used as background for the hero section."
          />
        </div>

        <!-- Mission Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Mission Section</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="formData.missionTitle[currentLanguage]" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Mission Title ({{ currentLanguage.toUpperCase() }})</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="formData.missionText[currentLanguage]" 
                placeholder=" " 
                rows="4" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Mission Description ({{ currentLanguage.toUpperCase() }})</label>
            </div>
          </div>
        </div>

        <!-- Vision Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Vision Section</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="formData.visionTitle[currentLanguage]" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Vision Title ({{ currentLanguage.toUpperCase() }})</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="formData.visionText[currentLanguage]" 
                placeholder=" " 
                rows="4" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Vision Description ({{ currentLanguage.toUpperCase() }})</label>
            </div>
            
            <!-- Vision Background Image -->
            <div>
              <label class="form-label">Vision Box Background Image</label>
              <ImageUpload 
                v-model="formData.missionImage" 
                label="Vision Section Background (optional)"
                help-text="Background image for the vision box only. Will overlay with dark background for text readability."
              />
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Values Section</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="formData.valuesTitle[currentLanguage]" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">Values Title ({{ currentLanguage.toUpperCase() }})</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="formData.valuesText[currentLanguage]" 
                placeholder=" " 
                rows="4" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">Values Description ({{ currentLanguage.toUpperCase() }})</label>
            </div>
          </div>
        </div>

        <!-- History Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">History Section</h2>
          
          <div class="space-y-6">
            <div class="relative">
              <input 
                v-model="formData.historyTitle[currentLanguage]" 
                type="text" 
                placeholder=" " 
                class="form-input peer"
                required
              >
              <label class="floating-label">History Title ({{ currentLanguage.toUpperCase() }})</label>
            </div>

            <div class="relative">
              <textarea 
                v-model="formData.historyText[currentLanguage]" 
                placeholder=" " 
                rows="4" 
                class="form-input resize-none peer"
                required
              ></textarea>
              <label class="floating-label">History Description ({{ currentLanguage.toUpperCase() }})</label>
            </div>
          </div>
        </div>

        <!-- Statistics Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Statistics</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="font-medium text-gray-700">Happy Clients</h3>
              <div class="relative">
                <input 
                  v-model="formData.happyClientsCount[currentLanguage]" 
                  type="text" 
                  placeholder=" " 
                  class="form-input peer"
                  required
                >
                <label class="floating-label">Count ({{ currentLanguage.toUpperCase() }})</label>
              </div>
              <div class="relative">
                <input 
                  v-model="formData.happyClientsLabel[currentLanguage]" 
                  type="text" 
                  placeholder=" " 
                  class="form-input peer"
                  required
                >
                <label class="floating-label">Label ({{ currentLanguage.toUpperCase() }})</label>
              </div>
            </div>
            
            <div class="space-y-4">
              <h3 class="font-medium text-gray-700">Experience</h3>
              <div class="relative">
                <input 
                  v-model="formData.experienceCount[currentLanguage]" 
                  type="text" 
                  placeholder=" " 
                  class="form-input peer"
                  required
                >
                <label class="floating-label">Count ({{ currentLanguage.toUpperCase() }})</label>
              </div>
              <div class="relative">
                <input 
                  v-model="formData.experienceLabel[currentLanguage]" 
                  type="text" 
                  placeholder=" " 
                  class="form-input peer"
                  required
                >
                <label class="floating-label">Label ({{ currentLanguage.toUpperCase() }})</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Vision Items Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Vision Items</h2>
          <p class="text-sm text-gray-600 mb-4">Bullet points displayed in the vision box</p>
          
          <div class="space-y-3">
            <div v-for="(item, index) in formData.visionItems" :key="index" class="flex gap-3">
              <input 
                v-model="formData.visionItems[index][currentLanguage]" 
                type="text" 
                class="form-input flex-1"
                :placeholder="`Vision item ${index + 1} (${currentLanguage.toUpperCase()})`"
              >
              <button 
                @click="removeVisionItem(index)"
                type="button"
                class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                :disabled="formData.visionItems.length <= 1"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
            <button 
              @click="addVisionItem"
              type="button"
              class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + Add Vision Item
            </button>
          </div>
        </div>

        <!-- Values Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Values Items</h2>
          <p class="text-sm text-gray-600 mb-4">Value cards with title, description, and icon</p>
          
          <div class="space-y-6">
            <div v-for="(value, index) in formData.valuesItems" :key="index" class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-gray-700">Value {{ index + 1 }} ({{ currentLanguage.toUpperCase() }})</h3>
                <button 
                  @click="removeValueItem(index)"
                  type="button"
                  class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  :disabled="formData.valuesItems.length <= 1"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-4">
                <div class="relative">
                  <input 
                    v-model="formData.valuesItems[index].title[currentLanguage]" 
                    type="text" 
                    placeholder=" " 
                    class="form-input peer"
                    required
                  >
                  <label class="floating-label">Value Title ({{ currentLanguage.toUpperCase() }})</label>
                </div>
                
                <div class="relative">
                  <textarea 
                    v-model="formData.valuesItems[index].description[currentLanguage]" 
                    placeholder=" " 
                    rows="3" 
                    class="form-input resize-none peer"
                    required
                  ></textarea>
                  <label class="floating-label">Description ({{ currentLanguage.toUpperCase() }})</label>
                </div>
                
                <div>
                  <label class="form-label">Icon Type</label>
                  <select v-model="formData.valuesItems[index].icon" class="form-input">
                    <option value="excellence">Excellence (checkmark)</option>
                    <option value="transparency">Transparency (eye)</option>
                    <option value="innovation">Innovation (lightning)</option>
                    <option value="default">Default (checkmark)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button 
              @click="addValueItem"
              type="button"
              class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + Add Value Item
            </button>
          </div>
        </div>

        <!-- Journey Timeline Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Journey Timeline</h2>
          <p class="text-sm text-gray-600 mb-4">Timeline items showing company history</p>
          
          <div class="space-y-6">
            <div v-for="(journey, index) in formData.journeyItems" :key="index" class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-gray-700">Timeline Item {{ index + 1 }} ({{ currentLanguage.toUpperCase() }})</h3>
                <button 
                  @click="removeJourneyItem(index)"
                  type="button"
                  class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  :disabled="formData.journeyItems.length <= 1"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
              
              <div class="grid md:grid-cols-3 gap-4">
                <div class="relative">
                  <input 
                    v-model="formData.journeyItems[index].year" 
                    type="text" 
                    placeholder=" " 
                    class="form-input peer"
                    required
                  >
                  <label class="floating-label">Year</label>
                </div>
                
                <div class="md:col-span-2 relative">
                  <input 
                    v-model="formData.journeyItems[index].title[currentLanguage]" 
                    type="text" 
                    placeholder=" " 
                    class="form-input peer"
                    required
                  >
                  <label class="floating-label">Title ({{ currentLanguage.toUpperCase() }})</label>
                </div>
              </div>
              
              <div class="mt-4 relative">
                <textarea 
                  v-model="formData.journeyItems[index].description[currentLanguage]" 
                  placeholder=" " 
                  rows="3" 
                  class="form-input resize-none peer"
                  required
                ></textarea>
                <label class="floating-label">Description ({{ currentLanguage.toUpperCase() }})</label>
              </div>
            </div>
            
            <button 
              @click="addJourneyItem"
              type="button"
              class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + Add Timeline Item
            </button>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/manage" class="btn-secondary">Cancel</NuxtLink>
          <button 
            type="submit" 
            :disabled="saving"
            class="btn-primary"
          >
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="fixed top-20 right-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-green-700 font-medium">{{ successMessage }}</p>
      </div>
    </div>

    <div v-if="errorMessage" class="fixed top-20 right-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-700 font-medium">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: false
})

const { logout } = useAuth()
const { getSiteSettings } = useCMS()
const siteSettings = await getSiteSettings()

// Language state
const currentLanguage = ref('en')

// Multi-language form data structure
const formData = reactive({
  // Text fields as JSON {en: "English", th: "Thai"}
  missionTitle: { en: '', th: '' },
  missionText: { en: '', th: '' },
  visionTitle: { en: '', th: '' },
  visionText: { en: '', th: '' },
  valuesTitle: { en: '', th: '' },
  valuesText: { en: '', th: '' },
  historyTitle: { en: '', th: '' },
  historyText: { en: '', th: '' },
  // Images (language-neutral)
  missionImage: '',
  heroImage: '',
  // Statistics as JSON
  happyClientsCount: { en: '500+', th: '500+' },
  happyClientsLabel: { en: 'Happy Clients', th: 'ลูกค้าที่พอใจ' },
  experienceCount: { en: '10+', th: '10+' },
  experienceLabel: { en: 'Years Experience', th: 'ปีประสบการณ์' },
  // Dynamic arrays with multi-language support
  visionItems: [
    { en: 'Proven Track Record', th: 'ประวัติที่พิสูจน์แล้ว' },
    { en: 'Dedicated Management', th: 'การจัดการที่ทุ่มเท' },
    { en: 'Transparent Reporting', th: 'รายงานที่โปร่งใส' },
    { en: '24/7 Support Available', th: 'บริการสนับสนุน 24/7' }
  ],
  valuesItems: [
    { 
      title: { en: 'Excellence', th: 'ความเป็นเลิศ' }, 
      description: { en: 'We strive for excellence in every project, delivering results that exceed expectations.', th: 'เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง' }, 
      icon: 'excellence' 
    },
    { 
      title: { en: 'Transparency', th: 'ความโปร่งใส' }, 
      description: { en: 'Open communication and honest reporting build trust in all our client relationships.', th: 'การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจในความสัมพันธ์กับลูกค้า' }, 
      icon: 'transparency' 
    },
    { 
      title: { en: 'Innovation', th: 'นวัตกรรม' }, 
      description: { en: 'We stay ahead of trends and continuously innovate to give clients a competitive edge.', th: 'เราก้าวนำเทรนด์และสร้างนวัตกรรมอย่างต่อเนื่องเพื่อให้ลูกค้ามีความได้เปรียบทางการแข่งขัน' }, 
      icon: 'innovation' 
    }
  ],
  journeyItems: [
    { year: '2015', title: { en: 'The Beginning', th: 'จุดเริ่มต้น' }, description: { en: 'Founded with a mission to help businesses succeed through digital marketing.', th: 'ก่อตั้งด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล' } },
    { year: '2018', title: { en: 'Rapid Growth', th: 'การเติบโตอย่างรวดเร็ว' }, description: { en: 'Expanded to 25 specialists and served over 200 clients across industries.', th: 'ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม' } },
    { year: '2021', title: { en: 'Innovation Leader', th: 'ผู้นำด้านนวัตกรรม' }, description: { en: 'Launched proprietary analytics platform and AI-driven tools.', th: 'เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI' } },
    { year: '2025', title: { en: 'Industry Recognition', th: 'การยอมรับในอุตสาหกรรม' }, description: { en: 'Recognized as top agency with 500+ successful partnerships.', th: 'ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ' } }
  ]
})

// Computed reactive form that switches based on current language
const form = computed(() => {
  return {
    missionTitle: formData.missionTitle[currentLanguage.value],
    missionText: formData.missionText[currentLanguage.value],
    visionTitle: formData.visionTitle[currentLanguage.value],
    visionText: formData.visionText[currentLanguage.value],
    valuesTitle: formData.valuesTitle[currentLanguage.value],
    valuesText: formData.valuesText[currentLanguage.value],
    historyTitle: formData.historyTitle[currentLanguage.value],
    historyText: formData.historyText[currentLanguage.value],
    missionImage: formData.missionImage,
    heroImage: formData.heroImage,
    happyClientsCount: formData.happyClientsCount[currentLanguage.value],
    happyClientsLabel: formData.happyClientsLabel[currentLanguage.value],
    experienceCount: formData.experienceCount[currentLanguage.value],
    experienceLabel: formData.experienceLabel[currentLanguage.value],
    visionItems: formData.visionItems.map(item => item[currentLanguage.value]),
    valuesItems: formData.valuesItems.map(item => ({
      title: item.title[currentLanguage.value],
      description: item.description[currentLanguage.value],
      icon: item.icon
    })),
    journeyItems: formData.journeyItems.map(item => ({
      year: item.year,
      title: item.title[currentLanguage.value],
      description: item.description[currentLanguage.value]
    }))
  }
})

// Component state
const loading = ref(true)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Load existing content
onMounted(async () => {
  await loadContent()
})

// Helper function to parse JSON with fallback
const parseJsonField = (jsonString, fallback) => {
  try {
    const parsed = JSON.parse(jsonString || '{}')
    return typeof parsed === 'object' && parsed !== null ? parsed : fallback
  } catch {
    return fallback
  }
}

const loadContent = async () => {
  try {
    const response = await $fetch('/api/cms/about-content')
    
    if (response) {
      // Parse multi-language text fields
      formData.missionTitle = parseJsonField(response.missionTitle, { en: '', th: '' })
      formData.missionText = parseJsonField(response.missionText, { en: '', th: '' })
      formData.visionTitle = parseJsonField(response.visionTitle, { en: '', th: '' })
      formData.visionText = parseJsonField(response.visionText, { en: '', th: '' })
      formData.valuesTitle = parseJsonField(response.valuesTitle, { en: '', th: '' })
      formData.valuesText = parseJsonField(response.valuesText, { en: '', th: '' })
      formData.historyTitle = parseJsonField(response.historyTitle, { en: '', th: '' })
      formData.historyText = parseJsonField(response.historyText, { en: '', th: '' })
      
      // Images (language-neutral)
      formData.missionImage = response.missionImage || ''
      formData.heroImage = response.heroImage || ''
      
      // Parse statistics
      formData.happyClientsCount = parseJsonField(response.happyClientsCount, { en: '500+', th: '500+' })
      formData.happyClientsLabel = parseJsonField(response.happyClientsLabel, { en: 'Happy Clients', th: 'ลูกค้าที่พอใจ' })
      formData.experienceCount = parseJsonField(response.experienceCount, { en: '10+', th: '10+' })
      formData.experienceLabel = parseJsonField(response.experienceLabel, { en: 'Years Experience', th: 'ปีประสบการณ์' })
      
      // Parse dynamic arrays
      const visionItems = JSON.parse(response.visionItems || '[]')
      formData.visionItems = visionItems.length > 0 ? visionItems : [
        { en: 'Proven Track Record', th: 'ประวัติที่พิสูจน์แล้ว' },
        { en: 'Dedicated Management', th: 'การจัดการที่ทุ่มเท' },
        { en: 'Transparent Reporting', th: 'รายงานที่โปร่งใส' },
        { en: '24/7 Support Available', th: 'บริการสนับสนุน 24/7' }
      ]
      
      const valuesItems = JSON.parse(response.valuesItems || '[]')
      formData.valuesItems = valuesItems.length > 0 ? valuesItems : [
        { 
          title: { en: 'Excellence', th: 'ความเป็นเลิศ' }, 
          description: { en: 'We strive for excellence in every project, delivering results that exceed expectations.', th: 'เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง' }, 
          icon: 'excellence' 
        },
        { 
          title: { en: 'Transparency', th: 'ความโปร่งใส' }, 
          description: { en: 'Open communication and honest reporting build trust in all our client relationships.', th: 'การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจในความสัมพันธ์กับลูกค้า' }, 
          icon: 'transparency' 
        },
        { 
          title: { en: 'Innovation', th: 'นวัตกรรม' }, 
          description: { en: 'We stay ahead of trends and continuously innovate to give clients a competitive edge.', th: 'เราก้าวนำเทรนด์และสร้างนวัตกรรมอย่างต่อเนื่องเพื่อให้ลูกค้ามีความได้เปรียบทางการแข่งขัน' }, 
          icon: 'innovation' 
        }
      ]
      
      const journeyItems = JSON.parse(response.journeyItems || '[]')
      formData.journeyItems = journeyItems.length > 0 ? journeyItems : [
        { year: '2015', title: { en: 'The Beginning', th: 'จุดเริ่มต้น' }, description: { en: 'Founded with a mission to help businesses succeed through digital marketing.', th: 'ก่อตั้งด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล' } },
        { year: '2018', title: { en: 'Rapid Growth', th: 'การเติบโตอย่างรวดเร็ว' }, description: { en: 'Expanded to 25 specialists and served over 200 clients across industries.', th: 'ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม' } },
        { year: '2021', title: { en: 'Innovation Leader', th: 'ผู้นำด้านนวัตกรรม' }, description: { en: 'Launched proprietary analytics platform and AI-driven tools.', th: 'เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI' } },
        { year: '2025', title: { en: 'Industry Recognition', th: 'การยอมรับในอุตสาหกรรม' }, description: { en: 'Recognized as top agency with 500+ successful partnerships.', th: 'ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ' } }
      ]
    }
  } catch (error) {
    errorMessage.value = 'Failed to load content'
    console.error('Failed to load content:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Prepare form data with JSON stringified multi-language fields
    const submitData = {
      // Text fields as JSON strings
      missionTitle: JSON.stringify(formData.missionTitle),
      missionText: JSON.stringify(formData.missionText),
      visionTitle: JSON.stringify(formData.visionTitle),
      visionText: JSON.stringify(formData.visionText),
      valuesTitle: JSON.stringify(formData.valuesTitle),
      valuesText: JSON.stringify(formData.valuesText),
      historyTitle: JSON.stringify(formData.historyTitle),
      historyText: JSON.stringify(formData.historyText),
      // Images (language-neutral)
      missionImage: formData.missionImage,
      heroImage: formData.heroImage,
      // Statistics as JSON strings
      happyClientsCount: JSON.stringify(formData.happyClientsCount),
      happyClientsLabel: JSON.stringify(formData.happyClientsLabel),
      experienceCount: JSON.stringify(formData.experienceCount),
      experienceLabel: JSON.stringify(formData.experienceLabel),
      // Dynamic arrays as JSON strings
      visionItems: JSON.stringify(formData.visionItems),
      valuesItems: JSON.stringify(formData.valuesItems),
      journeyItems: JSON.stringify(formData.journeyItems)
    }

    await $fetch('/api/cms/about-content', {
      method: 'POST',
      body: submitData
    })

    successMessage.value = 'About page content updated successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to update content. Please try again.'
    console.error('Failed to update content:', error)
  } finally {
    saving.value = false
  }
}

const handleLogout = async () => {
  await logout()
}

// Array management methods
const addVisionItem = () => {
  formData.visionItems.push({ en: '', th: '' })
}

const removeVisionItem = (index) => {
  if (formData.visionItems.length > 1) {
    formData.visionItems.splice(index, 1)
  }
}

const addValueItem = () => {
  formData.valuesItems.push({
    title: { en: '', th: '' },
    description: { en: '', th: '' },
    icon: 'default'
  })
}

const removeValueItem = (index) => {
  if (formData.valuesItems.length > 1) {
    formData.valuesItems.splice(index, 1)
  }
}

const addJourneyItem = () => {
  formData.journeyItems.push({
    year: '',
    title: { en: '', th: '' },
    description: { en: '', th: '' }
  })
}

const removeJourneyItem = (index) => {
  if (formData.journeyItems.length > 1) {
    formData.journeyItems.splice(index, 1)
  }
}

// Clear messages after 5 seconds
watch([successMessage, errorMessage], () => {
  if (successMessage.value || errorMessage.value) {
    setTimeout(() => {
      successMessage.value = ''
      errorMessage.value = ''
    }, 5000)
  }
})

// SEO
useSeoMeta({
  title: `Edit About Page | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>