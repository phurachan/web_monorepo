import { _ as __nuxt_component_0 } from './nuxt-link-CKoRUFr1.mjs';
import { withAsyncContext, ref, reactive, watch, mergeProps, withCtx, createBlock, openBlock, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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
  __name: "team",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useAuth();
    const { getSiteSettings } = useCMS();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const teamMembers = ref([]);
    const loading = ref(true);
    const saving = ref(false);
    const showModal = ref(false);
    const editingMember = ref(null);
    const successMessage = ref("");
    const errorMessage = ref("");
    const memberForm = reactive({
      name: "",
      position: "",
      description: "",
      image: "",
      email: "",
      linkedin: "",
      twitter: "",
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
      title: `Manage People | ${siteSettings.siteName} CMS`,
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
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
      _push(`<h1 class="text-xl font-semibold text-gray-900">Manage People</h1></div><div class="flex items-center space-x-4"><button class="btn-primary">Add Person</button><button class="btn-secondary">Logout</button></div></div></div></nav><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">`);
      if (unref(loading)) {
        _push(`<div class="flex justify-center items-center h-64"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>`);
      } else {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(teamMembers), (member) => {
          _push(`<div class="card p-6"><div class="flex items-start justify-between"><div class="flex items-start space-x-4 flex-1"><div class="flex-shrink-0">`);
          if (member.image) {
            _push(`<div class="w-16 h-16 rounded-full overflow-hidden"><img${ssrRenderAttr("src", member.image)}${ssrRenderAttr("alt", member.name)} class="w-full h-full object-cover"></div>`);
          } else {
            _push(`<div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center"><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>`);
          }
          _push(`</div><div class="flex-1"><div class="flex items-center space-x-3 mb-2"><h3 class="text-xl font-bold text-gray-900">${ssrInterpolate(member.name)}</h3>`);
          if (!member.isActive) {
            _push(`<span class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Inactive</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-blue-600 font-medium mb-2">${ssrInterpolate(member.position)}</p><p class="text-gray-600 mb-4">${ssrInterpolate(member.description)}</p><div class="flex items-center space-x-4 mb-4">`);
          if (member.email) {
            _push(`<a${ssrRenderAttr("href", `mailto:${member.email}`)} class="text-gray-500 hover:text-blue-600"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (member.linkedin) {
            _push(`<a${ssrRenderAttr("href", member.linkedin)} target="_blank" class="text-gray-500 hover:text-blue-600"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          if (member.twitter) {
            _push(`<a${ssrRenderAttr("href", member.twitter)} target="_blank" class="text-gray-500 hover:text-blue-600"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg></a>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="flex items-center space-x-4 text-sm text-gray-500"><span>Order: ${ssrInterpolate(member.order)}</span><span>\u2022</span><span>Updated: ${ssrInterpolate(formatDate(member.updatedAt))}</span></div></div></div><div class="flex items-center space-x-2 ml-4"><button class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button><button class="${ssrRenderClass([member.isActive ? "text-yellow-600 hover:bg-yellow-50" : "text-green-600 hover:bg-green-50", "p-2 rounded-lg"])}">`);
          if (member.isActive) {
            _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"></path></svg>`);
          } else {
            _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
          }
          _push(`</button><button class="p-2 text-red-600 hover:bg-red-50 rounded-lg"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div></div>`);
        });
        _push(`<!--]-->`);
        if (unref(teamMembers).length === 0) {
          _push(`<div class="text-center py-12"><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900">No people added</h3><p class="mt-1 text-sm text-gray-500">Get started by adding your first person.</p><button class="btn-primary mt-4">Add Person</button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
      if (unref(showModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"><div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"><div class="p-6"><div class="flex justify-between items-center mb-6"><h2 class="text-xl font-bold text-gray-900">${ssrInterpolate(unref(editingMember) ? "Edit Person" : "Add New Person")}</h2><button class="text-gray-400 hover:text-gray-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><form class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(memberForm).name)} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Full Name</label></div><div class="relative"><input${ssrRenderAttr("value", unref(memberForm).position)} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Position/Title</label></div><div class="relative"><textarea placeholder=" " rows="3" class="form-input resize-none peer" required>${ssrInterpolate(unref(memberForm).description)}</textarea><label class="floating-label">Bio/Description</label></div><div class="relative"><input${ssrRenderAttr("value", unref(memberForm).image)} type="url" placeholder=" " class="form-input peer"><label class="floating-label">Profile Image URL</label></div><div class="relative"><input${ssrRenderAttr("value", unref(memberForm).email)} type="email" placeholder=" " class="form-input peer"><label class="floating-label">Email Address</label></div><div class="relative"><input${ssrRenderAttr("value", unref(memberForm).linkedin)} type="url" placeholder=" " class="form-input peer"><label class="floating-label">LinkedIn URL</label></div><div class="relative"><input${ssrRenderAttr("value", unref(memberForm).twitter)} type="url" placeholder=" " class="form-input peer"><label class="floating-label">Twitter URL</label></div><div class="grid grid-cols-2 gap-4"><div class="relative"><input${ssrRenderAttr("value", unref(memberForm).order)} type="number" placeholder=" " class="form-input peer" min="0"><label class="floating-label">Display Order</label></div><div class="flex items-center space-x-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(memberForm).isActive) ? ssrLooseContain(unref(memberForm).isActive, null) : unref(memberForm).isActive) ? " checked" : ""} type="checkbox" id="isActive" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"><label for="isActive" class="text-sm font-medium text-gray-700">Active</label></div></div><div class="flex justify-end space-x-4 pt-4 border-t"><button type="button" class="btn-secondary">Cancel</button><button type="submit"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""} class="btn-primary">${ssrInterpolate(unref(saving) ? "Saving..." : "Save Person")}</button></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/manage/team.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=team-DMtCE6XP.mjs.map
