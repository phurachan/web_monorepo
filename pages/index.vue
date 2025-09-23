<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Web Monorepo</h1>
        <p class="text-lg text-gray-600">เลือกโปรเจ็คที่ต้องการเข้าใช้งาน</p>
      </div>

      <!-- Project Cards -->
      <div class="grid md:grid-cols-2 gap-8">
        <!-- Digital Agency -->
        <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Digital Agency</h2>
          </div>
          <p class="text-gray-600 mb-6">
            เว็บไซต์สำหรับบริษัทดิจิทัลเอเจนซี่ พร้อม CMS และระบบจัดการเนื้อหา
          </p>
          <a
            href="/agency-cms"
            class="inline-block bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            เข้าใช้งาน
          </a>
        </div>

        <!-- Local Spot -->
        <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-800">Local Spot</h2>
          </div>
          <p class="text-gray-600 mb-6">
            แพลตฟอร์มสำหรับค้นหาและแบ่งปันสถานที่น่าสนใจในท้องถิ่นของคุณ
          </p>
          <a
            href="/local-spot"
            class="inline-block bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            เข้าใช้งาน
          </a>
        </div>

        <!-- Future Project 1 -->
        <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow opacity-75">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-500">E-Commerce</h2>
          </div>
          <p class="text-gray-500 mb-6">
            ระบบขายสินค้าออนไลน์ (กำลังพัฒนา)
          </p>
          <button
            disabled
            class="inline-block bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed"
          >
            เร็วๆ นี้
          </button>
        </div>

        <!-- Future Project 2 -->
        <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow opacity-75">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2 2v.01"></path>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-500">Analytics</h2>
          </div>
          <p class="text-gray-500 mb-6">
            ระบบวิเคราะห์ข้อมูลและรายงาน (กำลังพัฒนา)
          </p>
          <button
            disabled
            class="inline-block bg-gray-400 text-white px-6 py-2 rounded-lg cursor-not-allowed"
          >
            เร็วๆ นี้
          </button>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-12">
        <p class="text-gray-500">
          Powered by Nuxt 3 • Node.js 22
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Web Monorepo - เลือกโปรเจ็ค',
  meta: [
    { name: 'description', content: 'หน้าแรกของ Web Monorepo สำหรับเลือกโปรเจ็คที่ต้องการใช้งาน' }
  ]
})
</script>