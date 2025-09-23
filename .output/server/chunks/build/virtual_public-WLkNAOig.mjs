import { withAsyncContext, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useI18n } from './useI18n-WQKH08H3.mjs';
import { u as useCMS } from './useCMS-CZhsl-4Y.mjs';
import { _ as _export_sfc } from './server.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';

const _sfc_main = {
  __name: "TopNavbar",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { currentLanguage } = useI18n();
    const { getSiteSettings } = useCMS();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const contactPhone = computed(() => siteSettings.contactPhone || "+1 (555) 123-4567");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "top-navbar",
        style: { "background-color": "#2e364e", "height": "40px" }
      }, _attrs))} data-v-e05f28ce><div class="container mx-auto px-4 h-full flex items-center justify-end" data-v-e05f28ce><div class="flex items-center space-x-6 text-sm" data-v-e05f28ce><div class="flex items-center space-x-2 text-gray-300" data-v-e05f28ce><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e05f28ce><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-e05f28ce></path></svg><a${ssrRenderAttr("href", `tel:${unref(contactPhone)}`)} class="hover:text-white transition-colors" data-v-e05f28ce>${ssrInterpolate(unref(contactPhone))}</a></div><div class="flex items-center space-x-1" data-v-e05f28ce><button class="${ssrRenderClass([unref(currentLanguage) === "en" ? "text-white font-semibold" : "text-gray-300 hover:text-white", "px-2 py-1 text-xs uppercase transition-colors"])}" data-v-e05f28ce> EN </button><span class="text-gray-400" data-v-e05f28ce>|</span><button class="${ssrRenderClass([unref(currentLanguage) === "th" ? "text-white font-semibold" : "text-gray-300 hover:text-white", "px-2 py-1 text-xs uppercase transition-colors"])}" data-v-e05f28ce> \u0E44\u0E17\u0E22 </button></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/components/TopNavbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e05f28ce"]]);
const _imports_0 = publicAssetsURL("/social_icons/icons8-facebook-50.png");
const _imports_1 = publicAssetsURL("/social_icons/icons8-instagram-50.png");
const _imports_2 = publicAssetsURL("/social_icons/icons8-line-50.png");
const _imports_3 = publicAssetsURL("/social_icons/icons8-tiktok-50.png");
const _imports_4 = publicAssetsURL("/social_icons/icons8-youtube-50.png");
const _imports_5 = publicAssetsURL("/social_icons/icons8-linkedin-circled-50.png");

export { __nuxt_component_0 as _, _imports_0 as a, _imports_1 as b, _imports_2 as c, _imports_3 as d, _imports_4 as e, _imports_5 as f };
//# sourceMappingURL=virtual_public-WLkNAOig.mjs.map
