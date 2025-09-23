import { _ as __nuxt_component_0, a as _imports_0, b as _imports_1, c as _imports_2, d as _imports_3, e as _imports_4, f as _imports_5 } from "./virtual_public-WLkNAOig.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-CKoRUFr1.js";
import { withAsyncContext, ref, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { b as buildApiUrl, A as API_ENDPOINTS } from "./api-ChRidk0C.js";
import { u as useCMS } from "./useCMS-CZhsl-4Y.js";
import { u as useI18n } from "./useI18n-WQKH08H3.js";
import { a as useSeoMeta } from "./v3-CNpujq97.js";
import { _ as _export_sfc } from "../server.mjs";
import "#internal/nuxt/paths";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/ufo/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/hookable/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/@unhead/vue/dist/index.mjs";
import "ofetch";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/unctx/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/radix3/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/defu/dist/defu.mjs";
const _sfc_main = {
  __name: "team",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const teamMembers = ([__temp, __restore] = withAsyncContext(() => $fetch(buildApiUrl(API_ENDPOINTS.CMS.TEAM.GET))), __temp = await __temp, __restore(), __temp);
    const { getSiteSettings, getTeamContent } = useCMS();
    const { t, currentLanguage } = useI18n();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const teamContentRaw = ([__temp, __restore] = withAsyncContext(() => getTeamContent()), __temp = await __temp, __restore(), __temp);
    const loading = ref(false);
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
    const teamContent = computed(() => ({
      // Basic fields
      heroImage: teamContentRaw.heroImage,
      // Multi-language text fields
      heroTitle: getLocalizedContent(teamContentRaw.heroTitle, "Meet Our People"),
      heroSubtitle: getLocalizedContent(teamContentRaw.heroSubtitle, "Get to know the talented individuals who drive our success and make exceptional results possible.")
    }));
    useSeoMeta({
      title: `Our People | ${siteSettings.siteName} - Meet Our Talented Team`,
      description: `Meet the talented people at ${siteSettings.siteName}. Our experienced professionals are dedicated to helping you achieve success and drive exceptional results.`
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TopNavbar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))} data-v-b13a8c0d>`);
      _push(ssrRenderComponent(_component_TopNavbar, null, null, _parent));
      _push(`<nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100" style="${ssrRenderStyle({ "top": "40px" })}" data-v-b13a8c0d><div class="container" data-v-b13a8c0d><div class="flex justify-between items-center py-4" data-v-b13a8c0d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms",
        class: "text-2xl font-bold gradient-text"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(siteSettings).siteName)}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(siteSettings).siteName), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="hidden md:flex space-x-8" data-v-b13a8c0d>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms",
        class: "text-gray-700 hover:text-blue-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.home"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
        class: "text-gray-700 hover:text-blue-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.services"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.services")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/about",
        class: "text-gray-700 hover:text-blue-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.about"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.about")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/team",
        class: "text-blue-500 font-medium"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.team"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.team")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "text-gray-700 hover:text-blue-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("nav.contact"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("nav.contact")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="btn-primary hidden md:block" data-v-b13a8c0d>${ssrInterpolate(unref(t)("common.getStarted"))}</button></div></div></nav><section style="${ssrRenderStyle([{ "padding-top": "140px" }, unref(teamContent).heroImage ? { backgroundImage: `url(${unref(teamContent).heroImage})` } : {}])}" class="${ssrRenderClass([unref(teamContent).heroImage ? "bg-cover bg-center bg-no-repeat" : "bg-gradient-primary-to-secondary", "section-padding text-white relative overflow-hidden"])}" data-v-b13a8c0d>`);
      if (unref(teamContent).heroImage) {
        _push(`<div class="absolute inset-0 bg-black/40" data-v-b13a8c0d></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container text-center relative z-10" data-v-b13a8c0d><h1 class="text-4xl lg:text-5xl font-bold mb-6" data-v-b13a8c0d>${ssrInterpolate(unref(teamContent).heroTitle)}</h1><p class="text-xl text-blue-100 max-w-3xl mx-auto" data-v-b13a8c0d>${ssrInterpolate(unref(teamContent).heroSubtitle)}</p></div></section><section class="section-padding" data-v-b13a8c0d><div class="container" data-v-b13a8c0d>`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center h-64" data-v-b13a8c0d><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" data-v-b13a8c0d></div></div>`);
      } else if (unref(teamMembers).length > 0) {
        _push(`<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-v-b13a8c0d><!--[-->`);
        ssrRenderList(unref(teamMembers), (member) => {
          _push(`<div class="card group hover:shadow-xl transition-all duration-300" data-v-b13a8c0d><div class="relative overflow-hidden rounded-t-xl" data-v-b13a8c0d>`);
          if (member.image) {
            _push(`<div class="aspect-square" data-v-b13a8c0d><img${ssrRenderAttr("src", member.image)}${ssrRenderAttr("alt", member.name)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-v-b13a8c0d></div>`);
          } else {
            _push(`<div class="aspect-square bg-gradient-to-br from-primary-very-light to-primary-light flex items-center justify-center" data-v-b13a8c0d><svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b13a8c0d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-b13a8c0d></path></svg></div>`);
          }
          _push(`</div><div class="p-6" data-v-b13a8c0d><h3 class="text-xl font-bold text-gray-900 mb-1" data-v-b13a8c0d>${ssrInterpolate(member.name)}</h3><p class="text-blue-600 font-medium mb-3" data-v-b13a8c0d>${ssrInterpolate(member.position)}</p><p class="text-gray-600 mb-4 line-clamp-3" data-v-b13a8c0d>${ssrInterpolate(member.description)}</p><div class="flex space-x-3" data-v-b13a8c0d>`);
          if (member.email) {
            _push(`<a${ssrRenderAttr("href", `mailto:${member.email}`)} class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors" data-v-b13a8c0d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b13a8c0d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-b13a8c0d></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (member.linkedin) {
            _push(`<a${ssrRenderAttr("href", member.linkedin)} target="_blank" class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors" data-v-b13a8c0d><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-b13a8c0d><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" data-v-b13a8c0d></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (member.twitter) {
            _push(`<a${ssrRenderAttr("href", member.twitter)} target="_blank" class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors" data-v-b13a8c0d><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" data-v-b13a8c0d><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" data-v-b13a8c0d></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-16" data-v-b13a8c0d><svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b13a8c0d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-b13a8c0d></path></svg><h3 class="text-2xl font-bold text-gray-900 mb-2" data-v-b13a8c0d>Coming Soon</h3><p class="text-gray-600" data-v-b13a8c0d>We&#39;re building our showcase. Check back soon to meet the people behind our success!</p></div>`);
      }
      _push(`</div></section><section class="section-padding bg-gray-50" data-v-b13a8c0d><div class="container" data-v-b13a8c0d><div class="text-center mb-16" data-v-b13a8c0d><h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900" data-v-b13a8c0d>Our Values</h2><p class="text-xl text-gray-600 max-w-2xl mx-auto" data-v-b13a8c0d> The principles that guide our people and shape our approach to excellence </p></div><div class="grid md:grid-cols-3 gap-8" data-v-b13a8c0d><div class="text-center" data-v-b13a8c0d><div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4" data-v-b13a8c0d><svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b13a8c0d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" data-v-b13a8c0d></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-3" data-v-b13a8c0d>Innovation</h3><p class="text-gray-600" data-v-b13a8c0d>We stay ahead of digital trends and constantly explore new strategies to keep your business competitive.</p></div><div class="text-center" data-v-b13a8c0d><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4" data-v-b13a8c0d><svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b13a8c0d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" data-v-b13a8c0d></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-3" data-v-b13a8c0d>Excellence</h3><p class="text-gray-600" data-v-b13a8c0d>We deliver high-quality work and measurable results, ensuring every campaign exceeds expectations.</p></div><div class="text-center" data-v-b13a8c0d><div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4" data-v-b13a8c0d><svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b13a8c0d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-b13a8c0d></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-3" data-v-b13a8c0d>Collaboration</h3><p class="text-gray-600" data-v-b13a8c0d>We work closely with our clients as partners, ensuring transparent communication and shared success.</p></div></div></div></section><section class="section-padding gradient-bg text-white" data-v-b13a8c0d><div class="container text-center" data-v-b13a8c0d><h2 class="text-3xl lg:text-4xl font-bold mb-6" data-v-b13a8c0d>${ssrInterpolate(unref(t)("team.readyToWork"))}</h2><p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto" data-v-b13a8c0d>${ssrInterpolate(unref(t)("team.letTalentedPeople"))}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "btn-primary bg-white text-blue-600 hover:bg-gray-100"
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
      _push(`</div></section><footer class="bg-gray-900 text-white py-12" data-v-b13a8c0d><div class="container" data-v-b13a8c0d><div class="grid md:grid-cols-4 gap-8" data-v-b13a8c0d><div data-v-b13a8c0d><div class="text-2xl font-bold mb-4" data-v-b13a8c0d>${ssrInterpolate(unref(siteSettings).siteName)}</div><p class="text-gray-400 mb-4" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.elevatingBrands"))}</p><div class="grid grid-cols-3 gap-3 max-w-[156px]" data-v-b13a8c0d><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors" data-v-b13a8c0d><img${ssrRenderAttr("src", _imports_0)} alt="Facebook" class="w-7 h-7 object-contain" data-v-b13a8c0d></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors" data-v-b13a8c0d><img${ssrRenderAttr("src", _imports_1)} alt="Instagram" class="w-7 h-7 object-contain" data-v-b13a8c0d></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors" data-v-b13a8c0d><img${ssrRenderAttr("src", _imports_2)} alt="Line" class="w-7 h-7 object-contain" data-v-b13a8c0d></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors" data-v-b13a8c0d><img${ssrRenderAttr("src", _imports_3)} alt="TikTok" class="w-7 h-7 object-contain" data-v-b13a8c0d></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors" data-v-b13a8c0d><img${ssrRenderAttr("src", _imports_4)} alt="YouTube" class="w-7 h-7 object-contain" data-v-b13a8c0d></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors" data-v-b13a8c0d><img${ssrRenderAttr("src", _imports_5)} alt="LinkedIn" class="w-7 h-7 object-contain" data-v-b13a8c0d></a></div></div><div data-v-b13a8c0d><h4 class="text-lg font-bold mb-4" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.services"))}</h4><ul class="space-y-2 text-gray-400" data-v-b13a8c0d><li data-v-b13a8c0d>`);
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
      _push(`</li><li data-v-b13a8c0d><a href="#" class="hover:text-white transition-colors" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.socialMediaMarketing"))}</a></li><li data-v-b13a8c0d><a href="#" class="hover:text-white transition-colors" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.webDevelopment"))}</a></li><li data-v-b13a8c0d><a href="#" class="hover:text-white transition-colors" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.ppcAdvertising"))}</a></li></ul></div><div data-v-b13a8c0d><h4 class="text-lg font-bold mb-4" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.company"))}</h4><ul class="space-y-2 text-gray-400" data-v-b13a8c0d><li data-v-b13a8c0d>`);
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
      _push(`</li><li data-v-b13a8c0d>`);
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
      _push(`</li><li data-v-b13a8c0d><a href="#" class="hover:text-white transition-colors" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.careers"))}</a></li><li data-v-b13a8c0d><a href="#" class="hover:text-white transition-colors" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.blog"))}</a></li></ul></div><div data-v-b13a8c0d><h4 class="text-lg font-bold mb-4" data-v-b13a8c0d>${ssrInterpolate(unref(t)("footer.contact"))}</h4><ul class="space-y-2 text-gray-400" data-v-b13a8c0d><li data-v-b13a8c0d>+1 (555) 123-4567</li><li data-v-b13a8c0d>hello@digitalflow.com</li><li data-v-b13a8c0d>123 Innovation Drive<br data-v-b13a8c0d>Tech Valley, CA 94105</li></ul></div></div><div class="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400" data-v-b13a8c0d><p data-v-b13a8c0d>© 2025 ${ssrInterpolate(unref(siteSettings).siteName)}. All rights reserved.</p></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/team.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const team = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b13a8c0d"]]);
export {
  team as default
};
//# sourceMappingURL=team-CgnsvvIX.js.map
