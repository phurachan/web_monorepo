// API Base URL Configuration
export const API_CONFIG = {
  // Base URL for API endpoints - will be dynamically set from runtime config
  get BASE_URL() {
    // For server-side or when nuxtApp is not available, use default
    if (import.meta.server) {
      return '/api'
    }

    // For client-side, try to get from runtime config
    try {
      const { $config } = useNuxtApp()
      return $config.public.apiBase || '/api'
    } catch {
      return '/api'
    }
  },

  // API version (for future use)
  VERSION: 'v1',

  // Timeout configurations
  TIMEOUT: {
    DEFAULT: 10000, // 10 seconds
    UPLOAD: 30000,  // 30 seconds for file uploads
    AUTH: 5000      // 5 seconds for auth operations
  }
} as const

// API Endpoints Constants
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    SETUP: '/auth/setup',
    ME: '/auth/me',
    REFRESH: '/auth/refresh'
  },

  // CMS Content Management endpoints
  CMS: {
    // Home page content
    HOME_CONTENT: {
      GET: '/cms/home-content',
      POST: '/cms/home-content'
    },

    // Services management
    SERVICES: {
      GET: '/cms/services',
      POST: '/cms/services',
      PUT: (id: string) => `/cms/services/${id}`,
      DELETE: (id: string) => `/cms/services/${id}`
    },

    // Services page content
    SERVICES_CONTENT: {
      GET: '/cms/services-content',
      POST: '/cms/services-content'
    },

    // About page content
    ABOUT_CONTENT: {
      GET: '/cms/about-content',
      POST: '/cms/about-content'
    },

    // Team management
    TEAM: {
      GET: '/cms/team',
      POST: '/cms/team',
      PUT: (id: string) => `/cms/team/${id}`,
      DELETE: (id: string) => `/cms/team/${id}`
    },

    // Team page content
    TEAM_CONTENT: {
      GET: '/cms/team-content',
      POST: '/cms/team-content'
    },

    // Contact page content
    CONTACT_CONTENT: {
      GET: '/cms/contact-content',
      POST: '/cms/contact-content'
    },

    // FAQ management
    FAQS: {
      GET: '/cms/faqs',
      POST: '/cms/faqs',
      PUT: (id: string) => `/cms/faqs/${id}`,
      DELETE: (id: string) => `/cms/faqs/${id}`
    },

    // Site settings
    SITE_SETTINGS: {
      GET: '/cms/site-settings',
      POST: '/cms/site-settings'
    }
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
    AVATAR: '/upload/avatar'
  },

  // Analytics endpoints (for future use)
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    TRAFFIC: '/analytics/traffic',
    CONVERSIONS: '/analytics/conversions'
  }
} as const

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string, baseUrl?: string): string => {
  const base = baseUrl || API_CONFIG.BASE_URL
  return `${base}${endpoint}`
}

// Helper function to build CMS endpoint URLs
export const buildCmsUrl = (endpoint: string): string => {
  return buildApiUrl(endpoint)
}

// Type definitions for better TypeScript support
export type ApiEndpoint = typeof API_ENDPOINTS
export type AuthEndpoint = typeof API_ENDPOINTS.AUTH
export type CmsEndpoint = typeof API_ENDPOINTS.CMS
export type UploadEndpoint = typeof API_ENDPOINTS.UPLOAD

// HTTP Methods constants
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
} as const

// Request headers
export const REQUEST_HEADERS = {
  CONTENT_TYPE: {
    JSON: 'application/json',
    FORM_DATA: 'multipart/form-data',
    URL_ENCODED: 'application/x-www-form-urlencoded'
  },
  AUTHORIZATION: 'Authorization',
  X_REQUESTED_WITH: 'X-Requested-With'
} as const