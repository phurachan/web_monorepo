import { _ as __nuxt_component_0 } from "./nuxt-link-CKoRUFr1.js";
import { _ as _sfc_main$1 } from "./ImageUpload-Cqitc2kZ.js";
import { withAsyncContext, reactive, ref, watch, mergeProps, withCtx, createBlock, openBlock, createVNode, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/hookable/dist/index.mjs";
import { u as useAuth } from "./useAuth-D-aEAjNt.js";
import { u as useCMS } from "./useCMS-CZhsl-4Y.js";
import { a as useSeoMeta } from "./v3-CNpujq97.js";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/unctx/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/radix3/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/defu/dist/defu.mjs";
import "./api-ChRidk0C.js";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "settings",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useAuth();
    const { getSiteSettings } = useCMS();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const form = reactive({
      siteName: "",
      siteTagline: "",
      logo: "",
      favicon: "",
      primaryColor: "#6495ed",
      secondaryColor: "#9333ea",
      metaDescription: "",
      keywords: "",
      contactEmail: "",
      contactPhone: ""
    });
    const socialLinks = reactive({
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: ""
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
      title: `Site Settings | ${siteSettings.siteName} CMS`,
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
      _push(`<h1 class="text-xl font-semibold text-gray-900">Site Settings</h1></div><div class="flex items-center space-x-4"><button class="btn-secondary">Logout</button></div></div></div></nav><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center h-64"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>`);
      } else {
        _push(`<form class="space-y-8"><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Site Identity</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(form).siteName)} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Site Name</label></div><div class="relative"><input${ssrRenderAttr("value", unref(form).siteTagline)} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Site Tagline</label></div>`);
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: unref(form).logo,
          "onUpdate:modelValue": ($event) => unref(form).logo = $event,
          label: "Site Logo (optional)"
        }, null, _parent));
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: unref(form).favicon,
          "onUpdate:modelValue": ($event) => unref(form).favicon = $event,
          label: "Site Favicon (optional)"
        }, null, _parent));
        _push(`</div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Brand Colors</h2><div class="space-y-4"><div class="flex items-center space-x-4"><div class="relative"><input${ssrRenderAttr("value", unref(form).primaryColor)} type="color" class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"></div><div class="flex-1"><label class="block text-sm font-medium text-gray-700 mb-2">Primary Color</label><input${ssrRenderAttr("value", unref(form).primaryColor)} type="text" placeholder="#6495ed" class="form-input" pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"></div></div><div class="flex items-center space-x-4"><div class="relative"><input${ssrRenderAttr("value", unref(form).secondaryColor)} type="color" class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"></div><div class="flex-1"><label class="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label><input${ssrRenderAttr("value", unref(form).secondaryColor)} type="text" placeholder="#9333ea" class="form-input" pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"></div></div><p class="text-sm text-gray-600"><strong>Primary:</strong> Used for buttons, links, and main brand elements.<br><strong>Secondary:</strong> Used for gradients and accent elements to create visual variety. </p></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Social Media Links</h2><div class="space-y-4"><!--[-->`);
        ssrRenderList(unref(socialLinks), (value, platform) => {
          _push(`<div class="relative"><input${ssrRenderAttr("value", unref(socialLinks)[platform])} type="url" placeholder=" " class="form-input peer"><label class="floating-label capitalize">${ssrInterpolate(platform)} URL</label><p class="text-xs text-gray-500 mt-1">e.g., https://${ssrInterpolate(platform)}.com/yourcompany</p></div>`);
        });
        _push(`<!--]--></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">SEO Settings</h2><div class="space-y-6"><div class="relative"><textarea placeholder=" " rows="3" class="form-input resize-none peer" maxlength="160">${ssrInterpolate(unref(form).metaDescription)}</textarea><label class="floating-label">Meta Description (160 chars max)</label><p class="text-sm text-gray-500 mt-1">${ssrInterpolate(unref(form).metaDescription.length)}/160 characters</p></div><div class="relative"><input${ssrRenderAttr("value", unref(form).keywords)} type="text" placeholder=" " class="form-input peer"><label class="floating-label">Keywords (comma separated)</label></div></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Global Contact Settings</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(form).contactEmail)} type="email" placeholder=" " class="form-input peer"><label class="floating-label">Main Contact Email</label></div><div class="relative"><input${ssrRenderAttr("value", unref(form).contactPhone)} type="tel" placeholder=" " class="form-input peer"><label class="floating-label">Main Contact Phone</label></div></div></div><div class="flex justify-end space-x-4">`);
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
        _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Settings")}</button></div></form>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/manage/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=settings-Dzt1P4nK.js.map
