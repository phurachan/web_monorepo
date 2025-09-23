import { _ as __nuxt_component_0 } from './nuxt-link-CKoRUFr1.mjs';
import { withAsyncContext, reactive, ref, watch, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useAuth } from './useAuth-D-aEAjNt.mjs';
import { u as useCMS } from './useCMS-CZhsl-4Y.mjs';
import { u as useI18n } from './useI18n-WQKH08H3.mjs';
import { n as navigateTo } from './server.mjs';
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
import './api-ChRidk0C.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { isAuthenticated } = useAuth();
    const { getSiteSettings } = useCMS();
    useI18n();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const loginForm = reactive({
      email: "",
      password: ""
    });
    const setupForm = reactive({
      name: "",
      email: "",
      password: ""
    });
    const showSetup = ref(false);
    const loginLoading = ref(false);
    const setupLoading = ref(false);
    const loginError = ref("");
    const setupError = ref("");
    const successMessage = ref("");
    watch(isAuthenticated, async (authenticated) => {
      if (authenticated) {
        await navigateTo("/agency-cms/manage");
      }
    }, { immediate: true });
    useSeoMeta({
      title: `Admin Login | ${siteSettings.siteName} CMS`,
      description: `Login to access the ${siteSettings.siteName} CMS dashboard`,
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "min-h-screen bg-gradient-to-br from-primary-very-light to-primary-light flex items-center justify-center p-4",
        style: { "display": "flex !important", "align-items": "center !important", "justify-content": "center !important", "min-height": "100vh !important" }
      }, _attrs))}><div class="max-w-md w-full space-y-8"><div class="text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms",
        class: "text-3xl font-bold gradient-text"
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
      _push(`<h2 class="mt-6 text-3xl font-extrabold text-gray-900">Admin Login</h2><p class="mt-2 text-sm text-gray-600">Sign in to access the CMS dashboard</p></div>`);
      if (unref(showSetup)) {
        _push(`<form class="mt-8 space-y-6"><div class="card p-8"><div class="mb-6"><h3 class="text-xl font-bold text-gray-900 mb-2">Setup Admin Account</h3><p class="text-gray-600">Create the first admin account to access the CMS.</p></div><div class="space-y-4"><div class="relative"><input${ssrRenderAttr("value", unref(setupForm).name)} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Full Name</label></div><div class="relative"><input${ssrRenderAttr("value", unref(setupForm).email)} type="email" placeholder=" " class="form-input peer" required><label class="floating-label">Email Address</label></div><div class="relative"><input${ssrRenderAttr("value", unref(setupForm).password)} type="password" placeholder=" " class="form-input peer" minlength="6" required><label class="floating-label">Password (min 6 characters)</label></div></div><button type="submit"${ssrIncludeBooleanAttr(unref(setupLoading)) ? " disabled" : ""} class="btn-primary w-full mt-6">${ssrInterpolate(unref(setupLoading) ? "Creating..." : "Create Admin Account")}</button>`);
        if (unref(setupError)) {
          _push(`<div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"><p class="text-red-700 text-sm">${ssrInterpolate(unref(setupError))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form>`);
      } else {
        _push(`<form class="mt-8 space-y-6"><div class="card p-8"><div class="space-y-4"><div class="relative"><input${ssrRenderAttr("value", unref(loginForm).email)} type="email" placeholder=" " class="form-input peer" required><label class="floating-label">Email Address</label></div><div class="relative"><input${ssrRenderAttr("value", unref(loginForm).password)} type="password" placeholder=" " class="form-input peer" required><label class="floating-label">Password</label></div></div><button type="submit"${ssrIncludeBooleanAttr(unref(loginLoading)) ? " disabled" : ""} class="btn-primary w-full mt-6">${ssrInterpolate(unref(loginLoading) ? "Signing in..." : "Sign In")}</button>`);
        if (unref(loginError)) {
          _push(`<div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg"><p class="text-red-700 text-sm">${ssrInterpolate(unref(loginError))}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="mt-4 text-center"><button type="button" class="text-sm text-blue-600 hover:text-blue-500"> Need to setup admin account? </button></div></div></form>`);
      }
      if (unref(successMessage)) {
        _push(`<div class="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"><p class="text-green-700 font-medium">${ssrInterpolate(unref(successMessage))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms",
        class: "text-blue-600 hover:text-blue-500 text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u2190 Back to Website `);
          } else {
            return [
              createTextVNode(" \u2190 Back to Website ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-OfJ5YlWx.mjs.map
