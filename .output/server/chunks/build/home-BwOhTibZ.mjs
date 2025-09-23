import { _ as __nuxt_component_0 } from './nuxt-link-CKoRUFr1.mjs';
import { _ as _sfc_main$1 } from './ImageUpload-Cqitc2kZ.mjs';
import { withAsyncContext, ref, reactive, watch, mergeProps, withCtx, createBlock, openBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-D-aEAjNt.mjs';
import { u as useCMS } from './useCMS-CZhsl-4Y.mjs';
import { a as useSeoMeta } from './v3-CNpujq97.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import './api-ChRidk0C.mjs';

const _sfc_main = {
  __name: "home",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useAuth();
    const { getSiteSettings } = useCMS();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const currentLanguage = ref("en");
    const formData = reactive({
      // Text fields as JSON {en: "English", th: "Thai"}
      heroTitle: { en: "", th: "" },
      heroSubtitle: { en: "", th: "" },
      featureTitle: { en: "Expert Management Solutions", th: "\u0E42\u0E0B\u0E25\u0E39\u0E0A\u0E31\u0E48\u0E19\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E08\u0E32\u0E01\u0E1C\u0E39\u0E49\u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D" },
      featureDescription: { en: "Streamline your business operations and enhance productivity", th: "\u0E1B\u0E23\u0E31\u0E1A\u0E1B\u0E23\u0E38\u0E07\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E41\u0E25\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1C\u0E25\u0E34\u0E15\u0E20\u0E32\u0E1E" },
      ctaText: { en: "", th: "" },
      ctaButtonText: { en: "", th: "" },
      aboutTitle: { en: "", th: "" },
      aboutDescription: { en: "", th: "" },
      peopleTitle: { en: "Meet Our People", th: "\u0E1E\u0E1A\u0E01\u0E31\u0E1A\u0E17\u0E35\u0E21\u0E07\u0E32\u0E19\u0E02\u0E2D\u0E07\u0E40\u0E23\u0E32" },
      peopleDescription: { en: "Get to know the talented individuals who drive our success", th: "\u0E17\u0E33\u0E04\u0E27\u0E32\u0E21\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01\u0E01\u0E31\u0E1A\u0E1A\u0E38\u0E04\u0E04\u0E25\u0E17\u0E35\u0E48\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E1C\u0E25\u0E31\u0E01\u0E14\u0E31\u0E19\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08" },
      // Images (language-neutral)
      heroImage: "",
      featureImage: "",
      aboutImage: ""
    });
    const loading = ref(true);
    const saving = ref(false);
    const successMessage = ref("");
    const errorMessage = ref("");
    watch([successMessage, errorMessage], () => {
      if (successMessage.value || errorMessage.value) {
        setTimeout(() => {
          successMessage.value = "";
          errorMessage.value = "";
        }, 5e3);
      }
    });
    useSeoMeta({
      title: `Edit Home Page | ${siteSettings.siteName} CMS`,
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_ImageUpload = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><nav class="bg-white shadow-sm border-b"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center py-4"><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/manage",
        class: "text-blue-600 hover:text-blue-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<h1 class="text-xl font-semibold text-gray-900">Edit Home Page</h1></div><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms",
        target: "_blank",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`View Live`);
          } else {
            return [
              createTextVNode("View Live")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button class="btn-secondary">Logout</button></div></div></div></nav><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center h-64"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>`);
      } else {
        _push(`<div class="card p-4 mb-8"><div class="flex items-center justify-between"><h3 class="text-lg font-medium text-gray-900">Content Language</h3><div class="flex items-center bg-gray-100 rounded-lg p-1"><button type="button" class="${ssrRenderClass([unref(currentLanguage) === "en" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900", "px-4 py-2 rounded-md text-sm font-medium transition-colors"])}"> \u{1F1FA}\u{1F1F8} English </button><button type="button" class="${ssrRenderClass([unref(currentLanguage) === "th" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900", "px-4 py-2 rounded-md text-sm font-medium transition-colors"])}"> \u{1F1F9}\u{1F1ED} \u0E44\u0E17\u0E22 </button></div></div><p class="text-sm text-gray-500 mt-2"> Switch between languages to edit content. ${ssrInterpolate(unref(currentLanguage) === "en" ? "Editing English content" : "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E41\u0E01\u0E49\u0E44\u0E02\u0E40\u0E19\u0E37\u0E49\u0E2D\u0E2B\u0E32\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22")}</p></div>`);
      }
      if (!unref(loading)) {
        _push(`<form class="space-y-8"><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Hero Section</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).heroTitle[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Hero Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="3" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).heroSubtitle[unref(currentLanguage)])}</textarea><label class="floating-label">Hero Subtitle (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div>`);
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: unref(formData).heroImage,
          "onUpdate:modelValue": ($event) => unref(formData).heroImage = $event,
          label: "Hero Background Image (optional)"
        }, null, _parent));
        _push(`<p class="text-sm text-gray-500 mt-2"><strong>\u{1F4D0} Recommended:</strong> 1920\xD71080px (16:9 ratio) or larger<br><strong>\u{1F4CF} Min size:</strong> 1200\xD7800px for best quality<br><strong>\u{1F4BE} Max file size:</strong> 5MB | <strong>\u{1F4C1} Formats:</strong> JPG, PNG, WebP<br><strong>\u{1F4A1} Tip:</strong> Use landscape images for best results. A dark overlay will be applied for text readability. </p></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Feature Highlight</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).featureTitle[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Feature Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="3" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).featureDescription[unref(currentLanguage)])}</textarea><label class="floating-label">Feature Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div>`);
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: unref(formData).featureImage,
          "onUpdate:modelValue": ($event) => unref(formData).featureImage = $event,
          label: "Feature Image (optional)"
        }, null, _parent));
        _push(`<p class="text-sm text-gray-500 mt-2"><strong>\u{1F4D0} Recommended:</strong> 512\xD7512px (1:1 square ratio)<br><strong>\u{1F4CF} Min size:</strong> 256\xD7256px | <strong>\u{1F4BE} Max:</strong> 5MB<br><strong>\u{1F4A1} Tip:</strong> Square images work best for the feature highlight box. </p></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Call to Action</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).ctaText[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">CTA Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><input${ssrRenderAttr("value", unref(formData).ctaButtonText[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">CTA Button Text (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">About Preview</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).aboutTitle[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">About Section Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="4" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).aboutDescription[unref(currentLanguage)])}</textarea><label class="floating-label">About Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div>`);
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: unref(formData).aboutImage,
          "onUpdate:modelValue": ($event) => unref(formData).aboutImage = $event,
          label: "About Section Image (optional)"
        }, null, _parent));
        _push(`<p class="text-sm text-gray-500 mt-2"><strong>\u{1F4D0} Recommended:</strong> 800\xD7600px (4:3 ratio)<br><strong>\u{1F4CF} Min size:</strong> 400\xD7300px | <strong>\u{1F4BE} Max:</strong> 5MB<br><strong>\u{1F4A1} Note:</strong> Currently not displayed on site - available for future use. </p></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">People Section</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).peopleTitle[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">People Section Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="3" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).peopleDescription[unref(currentLanguage)])}</textarea><label class="floating-label">People Section Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div></div><div class="flex justify-end space-x-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/agency-cms/manage",
          class: "btn-secondary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Cancel`);
            } else {
              return [
                createTextVNode("Cancel")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Changes")}</button></div></form>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(successMessage)) {
        _push(`<div class="fixed top-20 right-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-xl z-50"><div class="flex items-center"><svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-green-700 font-medium">${ssrInterpolate(unref(successMessage))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(errorMessage)) {
        _push(`<div class="fixed top-20 right-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-xl z-50"><div class="flex items-center"><svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p class="text-red-700 font-medium">${ssrInterpolate(unref(errorMessage))}</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/manage/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=home-BwOhTibZ.mjs.map
