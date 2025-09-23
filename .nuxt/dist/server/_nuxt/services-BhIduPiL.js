import { _ as __nuxt_component_0, a as _imports_0, b as _imports_1, c as _imports_2, d as _imports_3, e as _imports_4, f as _imports_5 } from "./virtual_public-WLkNAOig.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-CKoRUFr1.js";
import { withAsyncContext, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { u as useCMS } from "./useCMS-CZhsl-4Y.js";
import { u as useI18n } from "./useI18n-WQKH08H3.js";
import { a as useSeoMeta } from "./v3-CNpujq97.js";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/hookable/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/unctx/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/radix3/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/defu/dist/defu.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/ufo/dist/index.mjs";
import "./api-ChRidk0C.js";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "services",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getSiteSettings, getServicesContent } = useCMS();
    const { t, currentLanguage } = useI18n();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const servicesContentRaw = ([__temp, __restore] = withAsyncContext(() => getServicesContent()), __temp = await __temp, __restore(), __temp);
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
    const servicesContent = computed(() => ({
      // Basic fields
      heroImage: servicesContentRaw.heroImage,
      // Multi-language text fields
      heroTitle: getLocalizedContent(servicesContentRaw.heroTitle, "Digital Marketing Services"),
      heroSubtitle: getLocalizedContent(servicesContentRaw.heroSubtitle, "Transform Your Business with Data-Driven Digital Marketing Solutions")
    }));
    useSeoMeta({
      title: `Digital Marketing Services | ${siteSettings.siteName}`,
      description: () => servicesContent.value.heroSubtitle || "Comprehensive digital marketing services including SEO, social media marketing, web development, and PPC advertising to grow your business."
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TopNavbar = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_TopNavbar, null, null, _parent));
      _push(`<nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100" style="${ssrRenderStyle({ "top": "40px" })}"><div class="container"><div class="flex justify-between items-center py-4">`);
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
      _push(`<div class="hidden md:flex space-x-8">`);
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
        class: "text-blue-500 font-medium"
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
        class: "text-gray-700 hover:text-blue-500 transition-colors"
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
      _push(`</div><button class="btn-primary hidden md:block">${ssrInterpolate(unref(t)("common.getStarted"))}</button></div></div></nav><section style="${ssrRenderStyle([{ "padding-top": "140px" }, unref(servicesContent).heroImage ? { backgroundImage: `url(${unref(servicesContent).heroImage})` } : {}])}" class="${ssrRenderClass([unref(servicesContent).heroImage ? "bg-cover bg-center bg-no-repeat" : "bg-gradient-primary-to-secondary", "section-padding text-white relative overflow-hidden"])}">`);
      if (unref(servicesContent).heroImage) {
        _push(`<div class="absolute inset-0 bg-black/40"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container text-center relative z-10"><h1 class="text-4xl lg:text-5xl font-bold mb-6">${ssrInterpolate(unref(servicesContent).heroTitle)}</h1><p class="text-xl text-blue-100 max-w-3xl mx-auto">${ssrInterpolate(unref(servicesContent).heroSubtitle)}</p></div></section><section class="section-padding"><div class="container"><div class="grid lg:grid-cols-2 gap-12"><div class="card p-8"><div class="flex items-center mb-6"><div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4"><svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><h3 class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(t)("footer.seoOptimization"))}</h3></div><p class="text-gray-600 mb-6">${ssrInterpolate(unref(t)("services.seoDescription"))}</p><ul class="space-y-3 mb-6"><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${ssrInterpolate(unref(t)("services.keywordResearch"))}</li><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${ssrInterpolate(unref(t)("services.onPageSEO"))}</li><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${ssrInterpolate(unref(t)("services.linkBuilding"))}</li></ul><button class="btn-primary">${ssrInterpolate(unref(t)("common.learnMore"))}</button></div><div class="card p-8"><div class="flex items-center mb-6"><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4"><svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 20h13L17 4M9 9v6M15 9v6"></path></svg></div><h3 class="text-2xl font-bold text-gray-900">Social Media Marketing</h3></div><p class="text-gray-600 mb-6">Build meaningful connections with your audience across all major social platforms through engaging content and strategic campaigns.</p><ul class="space-y-3 mb-6"><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Content Strategy &amp; Creation </li><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Community Management </li><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Paid Social Advertising </li></ul><button class="btn-primary">${ssrInterpolate(unref(t)("common.learnMore"))}</button></div><div class="card p-8"><div class="flex items-center mb-6"><div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4"><svg class="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><h3 class="text-2xl font-bold text-gray-900">Web Development</h3></div><p class="text-gray-600 mb-6">Create stunning, responsive websites that not only look amazing but also convert visitors into loyal customers.</p><ul class="space-y-3 mb-6"><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Custom Website Design </li><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> E-commerce Solutions </li><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Mobile-First Design </li></ul><button class="btn-primary">${ssrInterpolate(unref(t)("common.learnMore"))}</button></div><div class="card p-8"><div class="flex items-center mb-6"><div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4"><svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h9a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><h3 class="text-2xl font-bold text-gray-900">PPC Advertising</h3></div><p class="text-gray-600 mb-6">Maximize your ROI with targeted pay-per-click campaigns that deliver immediate results and qualified leads.</p><ul class="space-y-3 mb-6"><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Google Ads Management </li><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Social Media Ads </li><li class="flex items-center text-gray-700"><svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Landing Page Optimization </li></ul><button class="btn-primary">${ssrInterpolate(unref(t)("common.learnMore"))}</button></div></div></div></section><section class="section-padding bg-gray-50"><div class="container"><div class="text-center mb-16"><h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Our Process</h2><p class="text-xl text-gray-600">A proven methodology that delivers consistent results</p></div><div class="grid md:grid-cols-4 gap-8"><div class="text-center"><div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div><h3 class="text-xl font-bold mb-2 text-gray-900">Discovery</h3><p class="text-gray-600">We analyze your business, audience, and competition to create a tailored strategy.</p></div><div class="text-center"><div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div><h3 class="text-xl font-bold mb-2 text-gray-900">Strategy</h3><p class="text-gray-600">Develop comprehensive digital marketing strategies aligned with your goals.</p></div><div class="text-center"><div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div><h3 class="text-xl font-bold mb-2 text-gray-900">Execute</h3><p class="text-gray-600">Implement campaigns with precision using cutting-edge tools and techniques.</p></div><div class="text-center"><div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div><h3 class="text-xl font-bold mb-2 text-gray-900">Optimize</h3><p class="text-gray-600">Continuously monitor and refine strategies for maximum performance.</p></div></div></div></section><section class="section-padding gradient-bg text-white"><div class="container text-center"><h2 class="text-3xl lg:text-4xl font-bold mb-6">${ssrInterpolate(unref(t)("services.readyToTransform"))}</h2><p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">${ssrInterpolate(unref(t)("services.discussServices"))}</p><div class="flex flex-col sm:flex-row gap-4 justify-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "btn-primary bg-white text-blue-600 hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.getFreeConsultation"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.getFreeConsultation")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="btn-secondary border-white text-white hover:bg-white hover:text-blue-600">${ssrInterpolate(unref(t)("common.viewCaseStudies"))}</button></div></div></section><footer class="bg-gray-900 text-white py-12"><div class="container"><div class="grid md:grid-cols-4 gap-8"><div><div class="text-2xl font-bold mb-4">${ssrInterpolate(unref(siteSettings).siteName)}</div><p class="text-gray-400 mb-4">${ssrInterpolate(unref(t)("footer.elevatingBrands"))}</p><div class="grid grid-cols-3 gap-3 max-w-[156px]"><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><img${ssrRenderAttr("src", _imports_0)} alt="Facebook" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"><img${ssrRenderAttr("src", _imports_1)} alt="Instagram" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"><img${ssrRenderAttr("src", _imports_2)} alt="Line" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors"><img${ssrRenderAttr("src", _imports_3)} alt="TikTok" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><img${ssrRenderAttr("src", _imports_4)} alt="YouTube" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"><img${ssrRenderAttr("src", _imports_5)} alt="LinkedIn" class="w-7 h-7 object-contain"></a></div></div><div><h4 class="text-lg font-bold mb-4">${ssrInterpolate(unref(t)("footer.services"))}</h4><ul class="space-y-2 text-gray-400"><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.seoOptimization"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.socialMediaMarketing"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.webDevelopment"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.ppcAdvertising"))}</a></li></ul></div><div><h4 class="text-lg font-bold mb-4">${ssrInterpolate(unref(t)("footer.company"))}</h4><ul class="space-y-2 text-gray-400"><li>`);
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
      _push(`</li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.ourPeople"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.careers"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.blog"))}</a></li></ul></div><div><h4 class="text-lg font-bold mb-4">${ssrInterpolate(unref(t)("footer.contact"))}</h4><ul class="space-y-2 text-gray-400"><li>+1 (555) 123-4567</li><li>hello@digitalflow.com</li><li>123 Innovation Drive<br>Tech Valley, CA 94105</li></ul></div></div><div class="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400"><p>© 2025 ${ssrInterpolate(unref(siteSettings).siteName)}. All rights reserved.</p></div></div></footer></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=services-BhIduPiL.js.map
