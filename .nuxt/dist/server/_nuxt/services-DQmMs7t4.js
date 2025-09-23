import { _ as __nuxt_component_0 } from "./nuxt-link-CKoRUFr1.js";
import { _ as _sfc_main$1 } from "./ImageUpload-Cqitc2kZ.js";
import { withAsyncContext, ref, reactive, watch, mergeProps, withCtx, createBlock, openBlock, createVNode, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
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
  __name: "services",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useAuth();
    const { getSiteSettings } = useCMS();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const services = ref([]);
    const loading = ref(true);
    const saving = ref(false);
    const showModal = ref(false);
    const editingService = ref(null);
    const successMessage = ref("");
    const errorMessage = ref("");
    const currentLanguage = ref("en");
    const serviceFormData = reactive({
      // Text fields as JSON {en: "English", th: "Thai"}
      title: { en: "", th: "" },
      description: { en: "", th: "" },
      // Features array with multi-language support
      features: [{ en: "", th: "" }],
      // Language-neutral fields
      icon: "",
      image: "",
      color: "#6495ed",
      order: 0,
      isActive: true
    });
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString();
    };
    watch([successMessage, errorMessage], () => {
      if (successMessage.value || errorMessage.value) {
        setTimeout(() => {
          successMessage.value = "";
          errorMessage.value = "";
        }, 5e3);
      }
    });
    useSeoMeta({
      title: `Manage Services | ${siteSettings.siteName} CMS`,
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
      _push(`<h1 class="text-xl font-semibold text-gray-900">Manage Services</h1></div><div class="flex items-center space-x-4"><button class="btn-primary">Add Service</button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
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
      _push(`<button class="btn-secondary">Logout</button></div></div></div></nav><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center h-64"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>`);
      } else {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(services), (service) => {
          _push(`<div class="card p-6"><div class="flex items-start justify-between"><div class="flex-1"><div class="flex items-center space-x-3 mb-3"><div class="w-4 h-4 rounded-full border-2 border-white shadow" style="${ssrRenderStyle({ backgroundColor: service.color || "#6495ed" })}"></div><h3 class="text-xl font-bold text-gray-900">${ssrInterpolate(service.title)}</h3>`);
          if (!service.isActive) {
            _push(`<span class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Inactive</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-gray-600 mb-4">${ssrInterpolate(service.description)}</p>`);
          if (service.features?.length) {
            _push(`<div class="mb-4"><p class="text-sm font-medium text-gray-700 mb-2">Features:</p><div class="flex flex-wrap gap-2"><!--[-->`);
            ssrRenderList(service.features, (feature) => {
              _push(`<span class="px-3 py-1 text-sm rounded-full text-white" style="${ssrRenderStyle({ backgroundColor: service.color || "#6495ed", opacity: 0.9 })}">${ssrInterpolate(feature)}</span>`);
            });
            _push(`<!--]--></div></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center space-x-4 text-sm text-gray-500"><span>Order: ${ssrInterpolate(service.order)}</span><span>•</span><span>Updated: ${ssrInterpolate(formatDate(service.updatedAt))}</span></div></div><div class="flex items-center space-x-2 ml-4"><button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button><button class="${ssrRenderClass([service.isActive ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50", "p-2 rounded-lg"])}">`);
          if (service.isActive) {
            _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"></path></svg>`);
          } else {
            _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
          }
          _push(`</button><button class="p-2 text-red-600 hover:bg-red-50 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(services).length === 0) {
          _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900">No services</h3><p class="mt-1 text-sm text-gray-500">Get started by creating your first service.</p><button class="btn-primary mt-4">Add Service</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"><div class="p-6"><div class="flex justify-between items-center mb-6"><h2 class="text-xl font-bold text-gray-900">${ssrInterpolate(unref(editingService) ? "Edit Service" : "Add New Service")}</h2><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="bg-gray-50 p-4 rounded-lg mb-6"><div class="flex items-center justify-between"><h3 class="text-sm font-medium text-gray-900">Content Language</h3><div class="flex items-center bg-white rounded-lg p-1 border"><button type="button" class="${ssrRenderClass([unref(currentLanguage) === "en" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:text-gray-900", "px-3 py-1 rounded-md text-xs font-medium transition-colors"])}"> 🇺🇸 EN </button><button type="button" class="${ssrRenderClass([unref(currentLanguage) === "th" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:text-gray-900", "px-3 py-1 rounded-md text-xs font-medium transition-colors"])}"> 🇹🇭 TH </button></div></div></div><form class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(serviceFormData).title[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Service Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="3" class="form-input resize-none peer" required>${ssrInterpolate(unref(serviceFormData).description[unref(currentLanguage)])}</textarea><label class="floating-label">Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><input${ssrRenderAttr("value", unref(serviceFormData).icon)} type="text" placeholder=" " class="form-input peer"><label class="floating-label">Icon Name (e.g., search, social, code)</label></div><div><label class="form-label">Service Image</label>`);
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: unref(serviceFormData).image,
          "onUpdate:modelValue": ($event) => unref(serviceFormData).image = $event,
          label: "Service Image (optional)",
          "help-text": "Optional image for the service. Will be displayed in service cards and details."
        }, null, _parent));
        _push(`</div><div><label class="block text-sm font-medium text-gray-700 mb-2">Card Color</label><div class="flex items-center space-x-4"><div class="relative"><input${ssrRenderAttr("value", unref(serviceFormData).color)} type="color" class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"></div><div class="flex-1"><input${ssrRenderAttr("value", unref(serviceFormData).color)} type="text" placeholder="#6495ed" class="form-input" pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"><p class="text-xs text-gray-500 mt-1">This color will be used for the service card&#39;s accent color</p></div></div></div><div><label class="block text-sm font-medium text-gray-700 mb-2">Features (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label><div class="space-y-2"><!--[-->`);
        ssrRenderList(unref(serviceFormData).features, (feature, index) => {
          _push(`<div class="flex space-x-2"><input${ssrRenderAttr("value", unref(serviceFormData).features[index][unref(currentLanguage)])} type="text" class="form-input flex-1"${ssrRenderAttr("placeholder", `Feature ${index + 1} (${unref(currentLanguage).toUpperCase()})`)}><button type="button" class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"> + Add Feature </button></div></div><div class="grid grid-cols-2 gap-4"><div class="relative"><input${ssrRenderAttr("value", unref(serviceFormData).order)} type="number" placeholder=" " class="form-input peer" min="0"><label class="floating-label">Display Order</label></div><div class="flex items-center space-x-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(serviceFormData).isActive) ? ssrLooseContain(unref(serviceFormData).isActive, null) : unref(serviceFormData).isActive) ? " checked" : ""} type="checkbox" id="isActive" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"><label for="isActive" class="text-sm font-medium text-gray-700">Active</label></div></div><div class="flex justify-end space-x-4 pt-4 border-t"><button type="button" class="btn-secondary">Cancel</button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Service")}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/manage/services.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=services-DQmMs7t4.js.map
