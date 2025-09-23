import { toRef, isRef } from 'vue';
import { u as useNuxtApp } from './server.mjs';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const API_CONFIG = {
  // Base URL for API endpoints - will be dynamically set from runtime config
  get BASE_URL() {
    {
      return "/api/agency-cms";
    }
  }
};
const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    SETUP: "/auth/setup",
    ME: "/auth/me",
    REFRESH: "/auth/refresh"
  },
  // CMS Content Management endpoints
  CMS: {
    // Home page content
    HOME_CONTENT: {
      GET: "/cms/home-content",
      POST: "/cms/home-content"
    },
    // Services management
    SERVICES: {
      GET: "/cms/services",
      POST: "/cms/services",
      PUT: (id) => `/cms/services/${id}`,
      DELETE: (id) => `/cms/services/${id}`
    },
    // Services page content
    SERVICES_CONTENT: {
      GET: "/cms/services-content",
      POST: "/cms/services-content"
    },
    // About page content
    ABOUT_CONTENT: {
      GET: "/cms/about-content",
      POST: "/cms/about-content"
    },
    // Team management
    TEAM: {
      GET: "/cms/team",
      POST: "/cms/team",
      PUT: (id) => `/cms/team/${id}`,
      DELETE: (id) => `/cms/team/${id}`
    },
    // Team page content
    TEAM_CONTENT: {
      GET: "/cms/team-content",
      POST: "/cms/team-content"
    },
    // Contact page content
    CONTACT_CONTENT: {
      GET: "/cms/contact-content",
      POST: "/cms/contact-content"
    },
    // FAQ management
    FAQS: {
      GET: "/cms/faqs",
      POST: "/cms/faqs",
      PUT: (id) => `/cms/faqs/${id}`,
      DELETE: (id) => `/cms/faqs/${id}`
    },
    // Site settings
    SITE_SETTINGS: {
      GET: "/cms/site-settings",
      POST: "/cms/site-settings"
    }
  },
  // File upload endpoints
  UPLOAD: {
    IMAGE: "/upload/image",
    FILE: "/upload/file",
    AVATAR: "/upload/avatar"
  },
  // Analytics endpoints (for future use)
  ANALYTICS: {
    DASHBOARD: "/analytics/dashboard",
    TRAFFIC: "/analytics/traffic",
    CONVERSIONS: "/analytics/conversions"
  }
};
const buildApiUrl = (endpoint, baseUrl) => {
  const base = API_CONFIG.BASE_URL;
  return `${base}${endpoint}`;
};

export { API_ENDPOINTS as A, buildApiUrl as b, useState as u };
//# sourceMappingURL=api-ChRidk0C.mjs.map
