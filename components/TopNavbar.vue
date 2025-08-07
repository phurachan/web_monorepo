<template>
  <div class="top-navbar" style="background-color: #2e364e; height: 40px;">
    <div class="container mx-auto px-4 h-full flex items-center justify-end">
      <div class="flex items-center space-x-6 text-sm">
        <!-- Contact Phone -->
        <div class="flex items-center space-x-2 text-gray-300">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <a :href="`tel:${contactPhone}`" class="hover:text-white transition-colors">
            {{ contactPhone }}
          </a>
        </div>

        <!-- Language Switcher -->
        <div class="flex items-center space-x-1">
          <button 
            @click="switchLanguage('en')"
            :class="currentLanguage === 'en' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'"
            class="px-2 py-1 text-xs uppercase transition-colors"
          >
            EN
          </button>
          <span class="text-gray-400">|</span>
          <button 
            @click="switchLanguage('th')"
            :class="currentLanguage === 'th' ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'"
            class="px-2 py-1 text-xs uppercase transition-colors"
          >
            ไทย
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { currentLanguage, switchLanguage } = useI18n()

// Get contact phone from site settings
const { getSiteSettings } = useCMS()
const siteSettings = await getSiteSettings()
const contactPhone = computed(() => siteSettings.contactPhone || '+1 (555) 123-4567')
</script>

<style scoped>
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
}
</style>