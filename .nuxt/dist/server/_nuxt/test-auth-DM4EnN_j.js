import { _ as __nuxt_component_0 } from "./nuxt-link-CKoRUFr1.js";
import { ref, defineComponent, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/hookable/dist/index.mjs";
import { u as useAuth } from "./useAuth-D-aEAjNt.js";
import { parse } from "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/cookie-es/dist/index.mjs";
import { getRequestHeader, setCookie, getCookie, deleteCookie } from "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/h3/dist/index.mjs";
import destr from "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/destr/dist/index.mjs";
import { isEqual } from "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/ohash/dist/index.mjs";
import { klona } from "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/klona/dist/index.mjs";
import { u as useNuxtApp } from "../server.mjs";
import { a as useSeoMeta } from "./v3-CNpujq97.js";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/ufo/dist/index.mjs";
import "./api-ChRidk0C.js";
import "ofetch";
import "#internal/nuxt/paths";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/unctx/dist/index.mjs";
import "vue-router";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/radix3/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/defu/dist/defu.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/@unhead/vue/dist/index.mjs";
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "test-auth",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const authToken = useCookie("auth-token");
    const authStatus = useCookie("auth-status");
    const apiResult = ref(null);
    const apiError = ref(null);
    useSeoMeta({
      title: "Auth Test | DigitalFlow",
      robots: "noindex, nofollow"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-100 p-8" }, _attrs))}><div class="max-w-2xl mx-auto"><h1 class="text-3xl font-bold mb-8">Authentication Test Page</h1><div class="space-y-6"><div class="card p-6"><h2 class="text-xl font-bold mb-4">Cookie Status</h2><p><strong>Auth Token (httpOnly):</strong> ${ssrInterpolate(!!unref(authToken))}</p><p><strong>Auth Status (accessible):</strong> ${ssrInterpolate(unref(authStatus) || "None")}</p><p><strong>Token Length:</strong> ${ssrInterpolate(unref(authToken)?.length || 0)}</p><p><strong>Token Preview:</strong> ${ssrInterpolate(unref(authToken)?.substring(0, 20) || "None")}</p></div><div class="card p-6"><h2 class="text-xl font-bold mb-4">Auth State</h2><p><strong>Is Authenticated:</strong> ${ssrInterpolate(unref(isAuthenticated))}</p><p><strong>User Email:</strong> ${ssrInterpolate(unref(user)?.email || "None")}</p><p><strong>Loading:</strong> ${ssrInterpolate(unref(isLoading))}</p></div><div class="card p-6"><h2 class="text-xl font-bold mb-4">API Test</h2><button class="btn-primary mr-4">Test /api/auth/me</button><button class="btn-secondary">Clear Cookie</button>`);
      if (unref(apiResult)) {
        _push(`<div class="mt-4 p-4 bg-gray-50 rounded"><p><strong>API Result:</strong></p><pre>${ssrInterpolate(JSON.stringify(unref(apiResult), null, 2))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(apiError)) {
        _push(`<div class="mt-4 p-4 bg-red-50 text-red-700 rounded"><p><strong>API Error:</strong></p><pre>${ssrInterpolate(unref(apiError))}</pre></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="card p-6"><h2 class="text-xl font-bold mb-4">Navigation Test</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/manage",
        class: "btn-primary mr-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go to /manage`);
          } else {
            return [
              createTextVNode("Go to /manage")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/login",
        class: "btn-secondary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Go to /login`);
          } else {
            return [
              createTextVNode("Go to /login")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/test-auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=test-auth-DM4EnN_j.js.map
