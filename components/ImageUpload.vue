<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <button
        v-if="modelValue"
        @click="removeImage"
        type="button"
        class="text-sm text-red-600 hover:text-red-500"
      >
        Remove
      </button>
    </div>

    <!-- Upload Area -->
    <div
      v-if="!modelValue"
      @click="triggerUpload"
      @dragover.prevent
      @drop.prevent="handleDrop"
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer transition-colors"
      :class="{ 'border-blue-400 bg-blue-50': isDragging }"
    >
      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="mt-2">
        <p class="text-sm text-gray-600">
          <span class="font-medium text-blue-600">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
      </div>
    </div>

    <!-- Image Preview -->
    <div v-else class="relative">
      <img
        :src="modelValue"
        :alt="label"
        class="w-full h-48 object-cover rounded-lg border"
        @error="handleImageError"
      >
      <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <button
          @click="triggerUpload"
          class="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Change Image
        </button>
      </div>
    </div>

    <!-- URL Input Alternative -->
    <div class="relative">
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        type="text"
        placeholder="Or enter image URL"
        class="form-input"
      >
    </div>

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileSelect"
      class="hidden"
    >

    <!-- Upload Progress -->
    <div v-if="uploading" class="flex items-center space-x-2">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      <span class="text-sm text-gray-600">Uploading...</span>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-700 text-sm">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { API_ENDPOINTS, buildApiUrl } from '~/constants/api'

interface Props {
  modelValue?: string
  label?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Image'
})

const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const uploading = ref(false)
const error = ref('')
const isDragging = ref(false)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadFile(target.files[0])
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    uploadFile(event.dataTransfer.files[0])
  }
}

const uploadFile = async (file: File) => {
  error.value = ''
  uploading.value = true

  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select an image file')
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File too large. Maximum size is 5MB')
    }

    // Create form data
    const formData = new FormData()
    formData.append('file', file)

    // Upload file
    // const { $fetch } = useNuxtApp()
    const response = await $fetch(buildApiUrl(API_ENDPOINTS.UPLOAD.IMAGE), {
      method: 'POST',
      body: formData
    })

    if (response.success) {
      // Emit the new URL
      emit('update:modelValue', response.url)
    } else {
      throw new Error('Upload failed')
    }
  } catch (err: any) {
    error.value = err.message || 'Upload failed'
  } finally {
    uploading.value = false
  }
}

const removeImage = () => {
  emit('update:modelValue', '')
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x200/f3f4f6/9ca3af?text=Invalid+Image'
}

// Drag and drop handlers
const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}
</script>