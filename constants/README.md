# API Constants Documentation

## Overview

ไฟล์ `api.ts` ในโฟลเดอร์นี้เก็บ constants ทั้งหมดที่เกี่ยวข้องกับ API endpoints เพื่อให้ง่ายต่อการจัดการและปรับแต่งในอนาคต

## Structure

### API_CONFIG
การตั้งค่าพื้นฐานสำหรับ API

```typescript
const API_CONFIG = {
  BASE_URL: '/api',           // Base URL สำหรับ API endpoints
  VERSION: 'v1',             // Version ของ API (สำหรับอนาคต)
  TIMEOUT: {
    DEFAULT: 10000,           // 10 วินาที
    UPLOAD: 30000,            // 30 วินาที สำหรับ file uploads
    AUTH: 5000                // 5 วินาที สำหรับ authentication
  }
}
```

### API_ENDPOINTS
กำหนด endpoints ทั้งหมดที่ใช้ในระบบ

#### Authentication
```typescript
AUTH: {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  SETUP: '/auth/setup',
  ME: '/auth/me',
  REFRESH: '/auth/refresh'
}
```

#### CMS Content Management
```typescript
CMS: {
  HOME_CONTENT: {
    GET: '/cms/home-content',
    POST: '/cms/home-content'
  },
  SERVICES: {
    GET: '/cms/services',
    POST: '/cms/services',
    PUT: (id) => `/cms/services/${id}`,
    DELETE: (id) => `/cms/services/${id}`
  }
  // ... และ endpoints อื่นๆ
}
```

## Usage

### ใน Composables
```typescript
import { API_ENDPOINTS, buildApiUrl } from '~/constants/api'

// ใช้งาน
const data = await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SERVICES.GET))
```

### ใน Components/Pages
```typescript
import { API_ENDPOINTS, buildApiUrl } from '~/constants/api'

// สำหรับ GET request
const response = await $fetch(buildApiUrl(API_ENDPOINTS.AUTH.ME))

// สำหรับ POST request
await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SERVICES.POST), {
  method: 'POST',
  body: data
})

// สำหรับ Dynamic endpoints
await $fetch(buildApiUrl(API_ENDPOINTS.CMS.SERVICES.PUT(serviceId)), {
  method: 'PUT',
  body: updateData
})
```

## Helper Functions

### buildApiUrl(endpoint, baseUrl?)
สร้าง complete URL จาก endpoint

```typescript
// ใช้ base URL default
const url = buildApiUrl('/cms/services')  // Result: '/api/cms/services'

// ใช้ custom base URL
const url = buildApiUrl('/cms/services', 'https://api.example.com')
// Result: 'https://api.example.com/cms/services'
```

### buildCmsUrl(endpoint)
สร้าง CMS endpoint URL (alias สำหรับ buildApiUrl)

```typescript
const url = buildCmsUrl('/services')  // Result: '/api/cms/services'
```

## Environment Variables

สามารถ override base URL ผ่าน environment variables:

```bash
# .env
NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/v1
```

## Benefits

1. **Centralized Management**: จัดการ API endpoints ได้ในที่เดียว
2. **Type Safety**: TypeScript support เต็มรูปแบบ
3. **Easy Refactoring**: เปลี่ยน URL ได้ง่ายเมื่อต้องการ
4. **Environment Flexibility**: รองรับการปรับ base URL ตาม environment
5. **Consistency**: ใช้ naming convention เดียวกันทั่วทั้งโปรเจกต์

## Future Enhancements

- รองรับ API versioning
- เพิ่ม rate limiting configuration
- เพิ่ม retry logic configuration
- รองรับ GraphQL endpoints