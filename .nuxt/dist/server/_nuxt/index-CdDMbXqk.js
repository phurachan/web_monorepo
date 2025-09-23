import { _ as __nuxt_component_0, a as _imports_0, b as _imports_1, c as _imports_2, d as _imports_3, e as _imports_4, f as _imports_5 } from "./virtual_public-WLkNAOig.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-CKoRUFr1.js";
import { withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { u as useCMS } from "./useCMS-CZhsl-4Y.js";
import { u as useI18n } from "./useI18n-WQKH08H3.js";
import { a as useSeoMeta } from "./v3-CNpujq97.js";
import { _ as _export_sfc } from "../server.mjs";
import "#internal/nuxt/paths";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/ufo/dist/index.mjs";
import "./api-ChRidk0C.js";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/hookable/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/unctx/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/radix3/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getHomeContent, getServices, getSiteSettings, getTeamMembers } = useCMS();
    const { t, currentLanguage } = useI18n();
    const homeContentRaw = ([__temp, __restore] = withAsyncContext(() => getHomeContent()), __temp = await __temp, __restore(), __temp);
    const services = ([__temp, __restore] = withAsyncContext(() => getServices()), __temp = await __temp, __restore(), __temp);
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const teamMembers = ([__temp, __restore] = withAsyncContext(() => getTeamMembers()), __temp = await __temp, __restore(), __temp);
    const getLocalizedContent = (field, fallback = "") => {
      try {
        if (typeof field === "string") {
          const parsed = JSON.parse(field);
          return parsed[currentLanguage.value] || parsed.en || fallback;
        }
        return field || fallback;
      } catch {
        return field || fallback;
      }
    };
    const homeContent = computed(() => ({
      // Basic fields that are not multilingual
      heroImage: homeContentRaw.heroImage,
      featureImage: homeContentRaw.featureImage,
      // Multi-language text fields
      heroTitle: getLocalizedContent(homeContentRaw.heroTitle, "Elevate Your Digital Presence"),
      heroSubtitle: getLocalizedContent(homeContentRaw.heroSubtitle, "Transform your business with our comprehensive digital marketing solutions"),
      ctaButtonText: getLocalizedContent(homeContentRaw.ctaButtonText, "Get Started"),
      featureTitle: getLocalizedContent(homeContentRaw.featureTitle, "Lightning Fast Results"),
      featureDescription: getLocalizedContent(homeContentRaw.featureDescription, "Accelerate your digital transformation"),
      aboutTitle: getLocalizedContent(homeContentRaw.aboutTitle, "About Us"),
      aboutDescription: getLocalizedContent(homeContentRaw.aboutDescription, "We are passionate about helping businesses thrive in the digital landscape"),
      peopleTitle: getLocalizedContent(homeContentRaw.peopleTitle, "Meet Our People"),
      peopleDescription: getLocalizedContent(homeContentRaw.peopleDescription, "Get to know the talented individuals who drive our success"),
      // Statistics
      projectsCount: getLocalizedContent(homeContentRaw.projectsCount, "100+"),
      projectsLabel: getLocalizedContent(homeContentRaw.projectsLabel, "Projects Completed"),
      satisfactionCount: getLocalizedContent(homeContentRaw.satisfactionCount, "98%"),
      satisfactionLabel: getLocalizedContent(homeContentRaw.satisfactionLabel, "Client Satisfaction"),
      experienceCount: getLocalizedContent(homeContentRaw.experienceCount, "10+"),
      experienceLabel: getLocalizedContent(homeContentRaw.experienceLabel, "Years Experience"),
      supportCount: getLocalizedContent(homeContentRaw.supportCount, "24/7"),
      supportLabel: getLocalizedContent(homeContentRaw.supportLabel, "Support Available")
    }));
    const pageTitle = computed(() => `${siteSettings.siteName} - ${siteSettings.siteTagline}`);
    useSeoMeta({
      title: pageTitle,
      ogTitle: pageTitle,
      description: () => homeContent.value.heroSubtitle,
      ogDescription: () => homeContent.value.heroSubtitle,
      ogImage: () => homeContent.value.heroImage || "/og-image.jpg",
      twitterCard: "summary_large_image"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TopNavbar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))} data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_TopNavbar, null, null, _parent));
      _push(`<nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100" style="${ssrRenderStyle({ "top": "40px" })}" data-v-9f86c6e9><div class="container" data-v-9f86c6e9><div class="flex justify-between items-center py-4" data-v-9f86c6e9><div class="text-2xl font-bold gradient-text" data-v-9f86c6e9>${ssrInterpolate(unref(siteSettings).siteName)}</div><div class="hidden md:flex space-x-8" data-v-9f86c6e9><a href="#home" class="text-gray-700 hover:text-blue-500 transition-colors" data-v-9f86c6e9>${ssrInterpolate(unref(t)("nav.home"))}</a><a href="#services" class="text-gray-700 hover:text-blue-500 transition-colors" data-v-9f86c6e9>${ssrInterpolate(unref(t)("nav.services"))}</a><a href="#about" class="text-gray-700 hover:text-blue-500 transition-colors" data-v-9f86c6e9>${ssrInterpolate(unref(t)("nav.about"))}</a><a href="#team" class="text-gray-700 hover:text-blue-500 transition-colors" data-v-9f86c6e9>${ssrInterpolate(unref(t)("nav.team"))}</a><a href="#contact" class="text-gray-700 hover:text-blue-500 transition-colors" data-v-9f86c6e9>${ssrInterpolate(unref(t)("nav.contact"))}</a></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "btn-primary hidden md:block"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(homeContent).ctaButtonText)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(homeContent).ctaButtonText), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="md:hidden p-2" data-v-9f86c6e9><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-9f86c6e9></path></svg></button></div></div></nav><section id="home" class="${ssrRenderClass([unref(homeContent).heroImage ? "hero-with-image" : "gradient-bg", "section-padding text-white relative"])}" style="${ssrRenderStyle(unref(homeContent).heroImage ? {
        backgroundImage: `url(${unref(homeContent).heroImage})`,
        paddingTop: "140px"
      } : { paddingTop: "140px" })}" data-v-9f86c6e9>`);
      if (unref(homeContent).heroImage) {
        _push(`<div class="absolute inset-0 bg-black/50 z-0" data-v-9f86c6e9></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container relative z-10" data-v-9f86c6e9><div class="grid lg:grid-cols-2 gap-12 items-center" data-v-9f86c6e9><div class="fade-in-up" data-v-9f86c6e9><h1 class="text-4xl lg:text-6xl font-bold mb-6 leading-tight" data-v-9f86c6e9>${ssrInterpolate(unref(homeContent).heroTitle)}</h1><p class="text-xl mb-8 text-blue-100" data-v-9f86c6e9>${ssrInterpolate(unref(homeContent).heroSubtitle)}</p><div class="flex flex-col sm:flex-row gap-4" data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "btn-primary text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(homeContent).ctaButtonText)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(homeContent).ctaButtonText), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
        class: "btn-secondary border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 text-center transform transition-all duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.viewServices"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.viewServices")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="relative max-w-md mx-auto" data-v-9f86c6e9><div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 md:p-8 transform hover:scale-105 transition-transform duration-300 max-h-96 overflow-hidden" data-v-9f86c6e9><div class="text-center max-w-xs mx-auto" data-v-9f86c6e9>`);
      if (unref(homeContent).featureImage) {
        _push(`<div class="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden" data-v-9f86c6e9><img${ssrRenderAttr("src", unref(homeContent).featureImage)}${ssrRenderAttr("alt", unref(homeContent).featureTitle || unref(t)("home.lightningFast"))} class="w-full h-full object-cover" data-v-9f86c6e9></div>`);
      } else {
        _push(`<div class="w-32 h-32 bg-gradient-primary-to-secondary rounded-full mx-auto mb-6 flex items-center justify-center" data-v-9f86c6e9><svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-9f86c6e9></path></svg></div>`);
      }
      _push(`<h3 class="text-xl md:text-2xl font-bold mb-2 line-clamp-2" data-v-9f86c6e9>${ssrInterpolate(unref(homeContent).featureTitle || unref(t)("home.lightningFast"))}</h3><p class="text-blue-100 text-sm md:text-base line-clamp-3" data-v-9f86c6e9>${ssrInterpolate(unref(homeContent).featureDescription || unref(t)("home.accelerateTransformation"))}</p></div></div></div></div></div></section><section id="services" class="section-padding bg-gray-50" data-v-9f86c6e9><div class="container" data-v-9f86c6e9><div class="text-center mb-16" data-v-9f86c6e9><h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.digitalMarketingServices"))}</h2><p class="text-xl text-gray-600 max-w-3xl mx-auto" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.comprehensiveSolutions"))}</p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-9f86c6e9><!--[-->`);
      ssrRenderList(unref(services), (service) => {
        _push(`<div class="card p-8 text-center relative overflow-hidden" data-v-9f86c6e9><div class="absolute top-0 left-0 w-full h-1" style="${ssrRenderStyle({ backgroundColor: service.color || "#6495ed" })}" data-v-9f86c6e9></div><div class="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-white" style="${ssrRenderStyle({ backgroundColor: service.color || "#6495ed" })}" data-v-9f86c6e9><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9>`);
        if (service.icon === "search") {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-9f86c6e9></path>`);
        } else if (service.icon === "social") {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 20h13L17 4M9 9v6M15 9v6" data-v-9f86c6e9></path>`);
        } else if (service.icon === "code") {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-9f86c6e9></path>`);
        } else if (service.icon === "ads") {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h9a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-9f86c6e9></path>`);
        } else if (service.icon === "email") {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-9f86c6e9></path>`);
        } else if (service.icon === "analytics") {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-9f86c6e9></path>`);
        } else {
          _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-9f86c6e9></path>`);
        }
        _push(`</svg></div><h3 class="text-xl font-bold mb-4" data-v-9f86c6e9>${ssrInterpolate(service.title)}</h3><p class="text-gray-600" data-v-9f86c6e9>${ssrInterpolate(service.description)}</p>`);
        if (service.features?.length) {
          _push(`<div class="mt-4" data-v-9f86c6e9><div class="flex flex-wrap gap-2 justify-center" data-v-9f86c6e9><!--[-->`);
          ssrRenderList(service.features.slice(0, 3), (feature) => {
            _push(`<span class="px-2 py-1 text-xs rounded-full text-white" style="${ssrRenderStyle({ backgroundColor: service.color || "#6495ed", opacity: 0.8 })}" data-v-9f86c6e9>${ssrInterpolate(feature)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]-->`);
      if (unref(services).length === 0) {
        _push(`<div class="col-span-full text-center py-12" data-v-9f86c6e9><p class="text-gray-500" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.servicesWillAppear"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="text-center mt-12" data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
        class: "btn-primary inline-flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.viewAllServices"))} <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-9f86c6e9${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.viewAllServices")) + " ", 1),
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 ml-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section id="about" class="section-padding" data-v-9f86c6e9><div class="container" data-v-9f86c6e9><div class="grid lg:grid-cols-2 gap-16 items-center" data-v-9f86c6e9><div data-v-9f86c6e9><h2 class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900" data-v-9f86c6e9>${ssrInterpolate(unref(homeContent).aboutTitle)}</h2><p class="text-lg text-gray-600 mb-8" data-v-9f86c6e9>${ssrInterpolate(unref(homeContent).aboutDescription)}</p><div class="space-y-6" data-v-9f86c6e9><div class="flex items-start space-x-4" data-v-9f86c6e9><div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-v-9f86c6e9><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-9f86c6e9></path></svg></div><div data-v-9f86c6e9><h4 class="font-bold text-gray-900 mb-2" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.provenResults"))}</h4><p class="text-gray-600" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.trackRecord"))}</p></div></div><div class="flex items-start space-x-4" data-v-9f86c6e9><div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-v-9f86c6e9><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-9f86c6e9></path></svg></div><div data-v-9f86c6e9><h4 class="font-bold text-gray-900 mb-2" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.expertTeam"))}</h4><p class="text-gray-600" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.dedicatedProfessionals"))}</p></div></div><div class="flex items-start space-x-4" data-v-9f86c6e9><div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1" data-v-9f86c6e9><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-9f86c6e9></path></svg></div><div data-v-9f86c6e9><h4 class="font-bold text-gray-900 mb-2" data-v-9f86c6e9>24/7 Support</h4><p class="text-gray-600" data-v-9f86c6e9>Dedicated account management and round-the-clock support</p></div></div></div></div><div class="relative" data-v-9f86c6e9><div class="bg-gradient-primary-to-secondary rounded-2xl p-8 text-white" data-v-9f86c6e9><div class="grid grid-cols-2 gap-6 text-center" data-v-9f86c6e9><div data-v-9f86c6e9><div class="text-3xl font-bold mb-2" data-v-9f86c6e9>500+</div><div class="text-blue-100" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.projectsCompleted"))}</div></div><div data-v-9f86c6e9><div class="text-3xl font-bold mb-2" data-v-9f86c6e9>98%</div><div class="text-blue-100" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.clientSatisfaction"))}</div></div><div data-v-9f86c6e9><div class="text-3xl font-bold mb-2" data-v-9f86c6e9>10+</div><div class="text-blue-100" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.yearsExperience"))}</div></div><div data-v-9f86c6e9><div class="text-3xl font-bold mb-2" data-v-9f86c6e9>24/7</div><div class="text-blue-100" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.supportAvailable"))}</div></div></div></div></div></div><div class="text-center mt-12" data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/about",
        class: "btn-primary inline-flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.learnMore"))} <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-9f86c6e9${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.learnMore")) + " ", 1),
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 ml-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><section id="team" class="section-padding bg-gray-50" data-v-9f86c6e9><div class="container" data-v-9f86c6e9><div class="text-center mb-16" data-v-9f86c6e9><h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900" data-v-9f86c6e9>${ssrInterpolate(unref(homeContent).peopleTitle)}</h2><p class="text-xl text-gray-600 max-w-3xl mx-auto" data-v-9f86c6e9>${ssrInterpolate(unref(homeContent).peopleDescription)}</p></div>`);
      if (unref(teamMembers).length > 0) {
        _push(`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-9f86c6e9><!--[-->`);
        ssrRenderList(unref(teamMembers).slice(0, 6), (member) => {
          _push(`<div class="card group hover:shadow-xl transition-all duration-300" data-v-9f86c6e9><div class="relative overflow-hidden rounded-t-xl" data-v-9f86c6e9>`);
          if (member.image) {
            _push(`<div class="aspect-square" data-v-9f86c6e9><img${ssrRenderAttr("src", member.image)}${ssrRenderAttr("alt", member.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-v-9f86c6e9></div>`);
          } else {
            _push(`<div class="aspect-square bg-gradient-to-br from-primary-very-light to-primary-light flex items-center justify-center" data-v-9f86c6e9><svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-9f86c6e9></path></svg></div>`);
          }
          _push(`</div><div class="p-6" data-v-9f86c6e9><h3 class="text-xl font-bold text-gray-900 mb-1" data-v-9f86c6e9>${ssrInterpolate(member.name)}</h3><p class="text-blue-600 font-medium mb-3" data-v-9f86c6e9>${ssrInterpolate(member.position)}</p><p class="text-gray-600 text-sm line-clamp-3" data-v-9f86c6e9>${ssrInterpolate(member.description)}</p><div class="flex space-x-3 mt-4" data-v-9f86c6e9>`);
          if (member.email) {
            _push(`<a${ssrRenderAttr("href", `mailto:${member.email}`)} class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors" data-v-9f86c6e9><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-9f86c6e9></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (member.linkedin) {
            _push(`<a${ssrRenderAttr("href", member.linkedin)} target="_blank" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors" data-v-9f86c6e9><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-v-9f86c6e9></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (member.twitter) {
            _push(`<a${ssrRenderAttr("href", member.twitter)} target="_blank" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors" data-v-9f86c6e9><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" data-v-9f86c6e9></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-12" data-v-9f86c6e9><svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-9f86c6e9></path></svg><h3 class="text-xl font-bold text-gray-900 mb-2" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.buildingOurShowcase"))}</h3><p class="text-gray-600" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.assembleTalented"))}</p></div>`);
      }
      if (unref(teamMembers).length > 0) {
        _push(`<div class="text-center mt-12" data-v-9f86c6e9>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/agency-cms/team",
          class: "btn-primary inline-flex items-center"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(t)("common.meetAllOurPeople"))} <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-9f86c6e9${_scopeId}></path></svg>`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(t)("common.meetAllOurPeople")) + " ", 1),
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5 ml-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 8l4 4m0 0l-4 4m4-4H3"
                  })
                ]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section><section id="contact" class="section-padding" data-v-9f86c6e9><div class="container" data-v-9f86c6e9><div class="text-center mb-16" data-v-9f86c6e9><h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.readyToGetStarted"))}</h2><p class="text-xl text-gray-600" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.letsDiscuss"))}</p></div><div class="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto" data-v-9f86c6e9><div data-v-9f86c6e9><h3 class="text-2xl font-bold mb-6 text-gray-900" data-v-9f86c6e9>${ssrInterpolate(unref(t)("titles.getInTouch"))}</h3><div class="space-y-6" data-v-9f86c6e9><div class="flex items-start space-x-4" data-v-9f86c6e9><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0" data-v-9f86c6e9><svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-9f86c6e9></path></svg></div><div data-v-9f86c6e9><h4 class="font-bold text-gray-900" data-v-9f86c6e9>${ssrInterpolate(unref(t)("footer.phone"))}</h4><p class="text-gray-600" data-v-9f86c6e9>+1 (555) 123-4567</p></div></div><div class="flex items-start space-x-4" data-v-9f86c6e9><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0" data-v-9f86c6e9><svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-9f86c6e9></path></svg></div><div data-v-9f86c6e9><h4 class="font-bold text-gray-900" data-v-9f86c6e9>${ssrInterpolate(unref(t)("footer.email"))}</h4><p class="text-gray-600" data-v-9f86c6e9>hello@digitalflow.com</p></div></div><div class="flex items-start space-x-4" data-v-9f86c6e9><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0" data-v-9f86c6e9><svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-9f86c6e9></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-9f86c6e9></path></svg></div><div data-v-9f86c6e9><h4 class="font-bold text-gray-900" data-v-9f86c6e9>${ssrInterpolate(unref(t)("footer.office"))}</h4><p class="text-gray-600" data-v-9f86c6e9>123 Innovation Drive<br data-v-9f86c6e9>Tech Valley, CA 94105</p></div></div></div></div><div class="card p-8" data-v-9f86c6e9><form class="space-y-6" data-v-9f86c6e9><div class="relative" data-v-9f86c6e9><input type="text" placeholder=" " class="form-input" data-v-9f86c6e9><label class="floating-label" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.fullName"))}</label></div><div class="relative" data-v-9f86c6e9><input type="email" placeholder=" " class="form-input" data-v-9f86c6e9><label class="floating-label" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.emailAddress"))}</label></div><div class="relative" data-v-9f86c6e9><input type="text" placeholder=" " class="form-input" data-v-9f86c6e9><label class="floating-label" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.company"))}</label></div><div class="relative" data-v-9f86c6e9><textarea placeholder=" " rows="4" class="form-input resize-none" data-v-9f86c6e9></textarea><label class="floating-label" data-v-9f86c6e9>${ssrInterpolate(unref(t)("home.message"))}</label></div><button type="submit" class="btn-primary w-full" data-v-9f86c6e9>${ssrInterpolate(unref(t)("common.sendMessage"))}</button></form></div></div><div class="text-center mt-12" data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "btn-primary inline-flex items-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.getInTouch"))} <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9f86c6e9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-9f86c6e9${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.getInTouch")) + " ", 1),
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 ml-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M17 8l4 4m0 0l-4 4m4-4H3"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></section><footer class="bg-gray-900 text-white py-12" data-v-9f86c6e9><div class="container" data-v-9f86c6e9><div class="grid md:grid-cols-4 gap-8" data-v-9f86c6e9><div data-v-9f86c6e9><div class="text-2xl font-bold mb-4" data-v-9f86c6e9>${ssrInterpolate(unref(siteSettings).siteName)}</div><p class="text-gray-400 mb-4" data-v-9f86c6e9>${ssrInterpolate(unref(t)("footer.elevatingBrands"))}</p><div class="grid grid-cols-3 gap-3 max-w-[156px]" data-v-9f86c6e9><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors" data-v-9f86c6e9><img${ssrRenderAttr("src", _imports_0)} alt="Facebook" class="w-7 h-7 object-contain" data-v-9f86c6e9></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors" data-v-9f86c6e9><img${ssrRenderAttr("src", _imports_1)} alt="Instagram" class="w-7 h-7 object-contain" data-v-9f86c6e9></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors" data-v-9f86c6e9><img${ssrRenderAttr("src", _imports_2)} alt="Line" class="w-7 h-7 object-contain" data-v-9f86c6e9></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors" data-v-9f86c6e9><img${ssrRenderAttr("src", _imports_3)} alt="TikTok" class="w-7 h-7 object-contain" data-v-9f86c6e9></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors" data-v-9f86c6e9><img${ssrRenderAttr("src", _imports_4)} alt="YouTube" class="w-7 h-7 object-contain" data-v-9f86c6e9></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors" data-v-9f86c6e9><img${ssrRenderAttr("src", _imports_5)} alt="LinkedIn" class="w-7 h-7 object-contain" data-v-9f86c6e9></a></div></div><div data-v-9f86c6e9><h4 class="text-lg font-bold mb-4" data-v-9f86c6e9>${ssrInterpolate(unref(t)("footer.services"))}</h4><ul class="space-y-2 text-gray-400" data-v-9f86c6e9><li data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.seoOptimization"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.seoOptimization")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.socialMediaMarketing"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.socialMediaMarketing")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.webDevelopment"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.webDevelopment")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.ppcAdvertising"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.ppcAdvertising")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div data-v-9f86c6e9><h4 class="text-lg font-bold mb-4" data-v-9f86c6e9>${ssrInterpolate(unref(t)("footer.company"))}</h4><ul class="space-y-2 text-gray-400" data-v-9f86c6e9><li data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/about",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.aboutUs"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.aboutUs")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/team",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.ourPeople"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.ourPeople")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.careers"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.careers")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.blog"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.blog")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div><div data-v-9f86c6e9><h4 class="text-lg font-bold mb-4" data-v-9f86c6e9>${ssrInterpolate(unref(t)("footer.contact"))}</h4><ul class="space-y-2 text-gray-400" data-v-9f86c6e9><li data-v-9f86c6e9>+1 (555) 123-4567</li><li data-v-9f86c6e9>hello@digitalflow.com</li><li data-v-9f86c6e9>123 Innovation Drive<br data-v-9f86c6e9>Tech Valley, CA 94105</li><li class="pt-2" data-v-9f86c6e9>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "btn-primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.getInTouch"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.getInTouch")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></div></div><div class="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400" data-v-9f86c6e9><p data-v-9f86c6e9>© 2025 ${ssrInterpolate(unref(siteSettings).siteName)}. All rights reserved.</p></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9f86c6e9"]]);
export {
  index as default
};
//# sourceMappingURL=index-CdDMbXqk.js.map
