import { _ as __nuxt_component_0 } from './nuxt-link-CKoRUFr1.mjs';
import { _ as _sfc_main$1 } from './ImageUpload-Cqitc2kZ.mjs';
import { withAsyncContext, ref, reactive, computed, watch, mergeProps, withCtx, createBlock, openBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
  __name: "about",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useAuth();
    const { getSiteSettings } = useCMS();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const currentLanguage = ref("en");
    const formData = reactive({
      // Text fields as JSON {en: "English", th: "Thai"}
      missionTitle: { en: "", th: "" },
      missionText: { en: "", th: "" },
      visionTitle: { en: "", th: "" },
      visionText: { en: "", th: "" },
      valuesTitle: { en: "", th: "" },
      valuesText: { en: "", th: "" },
      historyTitle: { en: "", th: "" },
      historyText: { en: "", th: "" },
      // Images (language-neutral)
      missionImage: "",
      heroImage: "",
      // Statistics as JSON
      happyClientsCount: { en: "500+", th: "500+" },
      happyClientsLabel: { en: "Happy Clients", th: "\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E17\u0E35\u0E48\u0E1E\u0E2D\u0E43\u0E08" },
      experienceCount: { en: "10+", th: "10+" },
      experienceLabel: { en: "Years Experience", th: "\u0E1B\u0E35\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E01\u0E32\u0E23\u0E13\u0E4C" },
      // Dynamic arrays with multi-language support
      visionItems: [
        { en: "Proven Track Record", th: "\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E17\u0E35\u0E48\u0E1E\u0E34\u0E2A\u0E39\u0E08\u0E19\u0E4C\u0E41\u0E25\u0E49\u0E27" },
        { en: "Dedicated Management", th: "\u0E01\u0E32\u0E23\u0E08\u0E31\u0E14\u0E01\u0E32\u0E23\u0E17\u0E35\u0E48\u0E17\u0E38\u0E48\u0E21\u0E40\u0E17" },
        { en: "Transparent Reporting", th: "\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E42\u0E1B\u0E23\u0E48\u0E07\u0E43\u0E2A" },
        { en: "24/7 Support Available", th: "\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E2A\u0E19\u0E31\u0E1A\u0E2A\u0E19\u0E38\u0E19 24/7" }
      ],
      valuesItems: [
        {
          title: { en: "Excellence", th: "\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E25\u0E34\u0E28" },
          description: { en: "We strive for excellence in every project, delivering results that exceed expectations.", th: "\u0E40\u0E23\u0E32\u0E21\u0E38\u0E48\u0E07\u0E21\u0E31\u0E48\u0E19\u0E2A\u0E39\u0E48\u0E04\u0E27\u0E32\u0E21\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E25\u0E34\u0E28\u0E43\u0E19\u0E17\u0E38\u0E01\u0E42\u0E04\u0E23\u0E07\u0E01\u0E32\u0E23 \u0E2A\u0E48\u0E07\u0E21\u0E2D\u0E1A\u0E1C\u0E25\u0E25\u0E31\u0E1E\u0E18\u0E4C\u0E17\u0E35\u0E48\u0E40\u0E01\u0E34\u0E19\u0E04\u0E27\u0E32\u0E21\u0E04\u0E32\u0E14\u0E2B\u0E27\u0E31\u0E07" },
          icon: "excellence"
        },
        {
          title: { en: "Transparency", th: "\u0E04\u0E27\u0E32\u0E21\u0E42\u0E1B\u0E23\u0E48\u0E07\u0E43\u0E2A" },
          description: { en: "Open communication and honest reporting build trust in all our client relationships.", th: "\u0E01\u0E32\u0E23\u0E2A\u0E37\u0E48\u0E2D\u0E2A\u0E32\u0E23\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E40\u0E1B\u0E34\u0E14\u0E40\u0E1C\u0E22\u0E41\u0E25\u0E30\u0E23\u0E32\u0E22\u0E07\u0E32\u0E19\u0E17\u0E35\u0E48\u0E0B\u0E37\u0E48\u0E2D\u0E2A\u0E31\u0E15\u0E22\u0E4C\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E04\u0E27\u0E32\u0E21\u0E44\u0E27\u0E49\u0E27\u0E32\u0E07\u0E43\u0E08\u0E43\u0E19\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E31\u0E21\u0E1E\u0E31\u0E19\u0E18\u0E4C\u0E01\u0E31\u0E1A\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32" },
          icon: "transparency"
        },
        {
          title: { en: "Innovation", th: "\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21" },
          description: { en: "We stay ahead of trends and continuously innovate to give clients a competitive edge.", th: "\u0E40\u0E23\u0E32\u0E01\u0E49\u0E32\u0E27\u0E19\u0E33\u0E40\u0E17\u0E23\u0E19\u0E14\u0E4C\u0E41\u0E25\u0E30\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E15\u0E48\u0E2D\u0E40\u0E19\u0E37\u0E48\u0E2D\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E43\u0E2B\u0E49\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E21\u0E35\u0E04\u0E27\u0E32\u0E21\u0E44\u0E14\u0E49\u0E40\u0E1B\u0E23\u0E35\u0E22\u0E1A\u0E17\u0E32\u0E07\u0E01\u0E32\u0E23\u0E41\u0E02\u0E48\u0E07\u0E02\u0E31\u0E19" },
          icon: "innovation"
        }
      ],
      journeyItems: [
        { year: "2015", title: { en: "The Beginning", th: "\u0E08\u0E38\u0E14\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19" }, description: { en: "Founded with a mission to help businesses succeed through digital marketing.", th: "\u0E01\u0E48\u0E2D\u0E15\u0E31\u0E49\u0E07\u0E14\u0E49\u0E27\u0E22\u0E1E\u0E31\u0E19\u0E18\u0E01\u0E34\u0E08\u0E0A\u0E48\u0E27\u0E22\u0E18\u0E38\u0E23\u0E01\u0E34\u0E08\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E1C\u0E48\u0E32\u0E19\u0E01\u0E32\u0E23\u0E15\u0E25\u0E32\u0E14\u0E14\u0E34\u0E08\u0E34\u0E17\u0E31\u0E25" } },
        { year: "2018", title: { en: "Rapid Growth", th: "\u0E01\u0E32\u0E23\u0E40\u0E15\u0E34\u0E1A\u0E42\u0E15\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E23\u0E27\u0E14\u0E40\u0E23\u0E47\u0E27" }, description: { en: "Expanded to 25 specialists and served over 200 clients across industries.", th: "\u0E02\u0E22\u0E32\u0E22\u0E40\u0E1B\u0E47\u0E19 25 \u0E1C\u0E39\u0E49\u0E40\u0E0A\u0E35\u0E48\u0E22\u0E27\u0E0A\u0E32\u0E0D\u0E41\u0E25\u0E30\u0E43\u0E2B\u0E49\u0E1A\u0E23\u0E34\u0E01\u0E32\u0E23\u0E25\u0E39\u0E01\u0E04\u0E49\u0E32\u0E01\u0E27\u0E48\u0E32 200 \u0E23\u0E32\u0E22\u0E43\u0E19\u0E2B\u0E25\u0E32\u0E01\u0E2B\u0E25\u0E32\u0E22\u0E2D\u0E38\u0E15\u0E2A\u0E32\u0E2B\u0E01\u0E23\u0E23\u0E21" } },
        { year: "2021", title: { en: "Innovation Leader", th: "\u0E1C\u0E39\u0E49\u0E19\u0E33\u0E14\u0E49\u0E32\u0E19\u0E19\u0E27\u0E31\u0E15\u0E01\u0E23\u0E23\u0E21" }, description: { en: "Launched proprietary analytics platform and AI-driven tools.", th: "\u0E40\u0E1B\u0E34\u0E14\u0E15\u0E31\u0E27\u0E41\u0E1E\u0E25\u0E15\u0E1F\u0E2D\u0E23\u0E4C\u0E21\u0E27\u0E34\u0E40\u0E04\u0E23\u0E32\u0E30\u0E2B\u0E4C\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E41\u0E25\u0E30\u0E40\u0E04\u0E23\u0E37\u0E48\u0E2D\u0E07\u0E21\u0E37\u0E2D\u0E17\u0E35\u0E48\u0E02\u0E31\u0E1A\u0E40\u0E04\u0E25\u0E37\u0E48\u0E2D\u0E19\u0E14\u0E49\u0E27\u0E22 AI" } },
        { year: "2025", title: { en: "Industry Recognition", th: "\u0E01\u0E32\u0E23\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E43\u0E19\u0E2D\u0E38\u0E15\u0E2A\u0E32\u0E2B\u0E01\u0E23\u0E23\u0E21" }, description: { en: "Recognized as top agency with 500+ successful partnerships.", th: "\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A\u0E01\u0E32\u0E23\u0E22\u0E2D\u0E21\u0E23\u0E31\u0E1A\u0E40\u0E1B\u0E47\u0E19\u0E40\u0E2D\u0E40\u0E08\u0E19\u0E0B\u0E35\u0E48\u0E0A\u0E31\u0E49\u0E19\u0E19\u0E33\u0E14\u0E49\u0E27\u0E22\u0E04\u0E27\u0E32\u0E21\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08\u0E01\u0E27\u0E48\u0E32 500 \u0E1E\u0E32\u0E23\u0E4C\u0E17\u0E40\u0E19\u0E2D\u0E23\u0E4C\u0E0A\u0E34\u0E1E" } }
      ]
    });
    computed(() => {
      return {
        missionTitle: formData.missionTitle[currentLanguage.value],
        missionText: formData.missionText[currentLanguage.value],
        visionTitle: formData.visionTitle[currentLanguage.value],
        visionText: formData.visionText[currentLanguage.value],
        valuesTitle: formData.valuesTitle[currentLanguage.value],
        valuesText: formData.valuesText[currentLanguage.value],
        historyTitle: formData.historyTitle[currentLanguage.value],
        historyText: formData.historyText[currentLanguage.value],
        missionImage: formData.missionImage,
        heroImage: formData.heroImage,
        happyClientsCount: formData.happyClientsCount[currentLanguage.value],
        happyClientsLabel: formData.happyClientsLabel[currentLanguage.value],
        experienceCount: formData.experienceCount[currentLanguage.value],
        experienceLabel: formData.experienceLabel[currentLanguage.value],
        visionItems: formData.visionItems.map((item) => item[currentLanguage.value]),
        valuesItems: formData.valuesItems.map((item) => ({
          title: item.title[currentLanguage.value],
          description: item.description[currentLanguage.value],
          icon: item.icon
        })),
        journeyItems: formData.journeyItems.map((item) => ({
          year: item.year,
          title: item.title[currentLanguage.value],
          description: item.description[currentLanguage.value]
        }))
      };
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
      title: `Edit About Page | ${siteSettings.siteName} CMS`,
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
      _push(`<h1 class="text-xl font-semibold text-gray-900">Edit About Page</h1></div><div class="flex items-center space-x-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/about",
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
        _push(`<form class="space-y-8"><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Hero Background Image</h2>`);
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: unref(formData).heroImage,
          "onUpdate:modelValue": ($event) => unref(formData).heroImage = $event,
          label: "Hero Section Background (optional)",
          "help-text": "Recommended: High-quality image, 1920x1080px or larger. Will be used as background for the hero section."
        }, null, _parent));
        _push(`</div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Mission Section</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).missionTitle[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Mission Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="4" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).missionText[unref(currentLanguage)])}</textarea><label class="floating-label">Mission Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Vision Section</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).visionTitle[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Vision Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="4" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).visionText[unref(currentLanguage)])}</textarea><label class="floating-label">Vision Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div><label class="form-label">Vision Box Background Image</label>`);
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: unref(formData).missionImage,
          "onUpdate:modelValue": ($event) => unref(formData).missionImage = $event,
          label: "Vision Section Background (optional)",
          "help-text": "Background image for the vision box only. Will overlay with dark background for text readability."
        }, null, _parent));
        _push(`</div></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Values Section</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).valuesTitle[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Values Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="4" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).valuesText[unref(currentLanguage)])}</textarea><label class="floating-label">Values Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">History Section</h2><div class="space-y-6"><div class="relative"><input${ssrRenderAttr("value", unref(formData).historyTitle[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">History Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="4" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).historyText[unref(currentLanguage)])}</textarea><label class="floating-label">History Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Statistics</h2><div class="grid md:grid-cols-2 gap-6"><div class="space-y-4"><h3 class="font-medium text-gray-700">Happy Clients</h3><div class="relative"><input${ssrRenderAttr("value", unref(formData).happyClientsCount[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Count (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><input${ssrRenderAttr("value", unref(formData).happyClientsLabel[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Label (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div><div class="space-y-4"><h3 class="font-medium text-gray-700">Experience</h3><div class="relative"><input${ssrRenderAttr("value", unref(formData).experienceCount[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Count (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><input${ssrRenderAttr("value", unref(formData).experienceLabel[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Label (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Vision Items</h2><p class="text-sm text-gray-600 mb-4">Bullet points displayed in the vision box</p><div class="space-y-3"><!--[-->`);
        ssrRenderList(unref(formData).visionItems, (item, index) => {
          _push(`<div class="flex gap-3"><input${ssrRenderAttr("value", unref(formData).visionItems[index][unref(currentLanguage)])} type="text" class="form-input flex-1"${ssrRenderAttr("placeholder", `Vision item ${index + 1} (${unref(currentLanguage).toUpperCase()})`)}><button type="button" class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"${ssrIncludeBooleanAttr(unref(formData).visionItems.length <= 1) ? " disabled" : ""}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"> + Add Vision Item </button></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Values Items</h2><p class="text-sm text-gray-600 mb-4">Value cards with title, description, and icon</p><div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(formData).valuesItems, (value, index) => {
          _push(`<div class="border border-gray-200 rounded-lg p-4"><div class="flex justify-between items-center mb-4"><h3 class="font-medium text-gray-700">Value ${ssrInterpolate(index + 1)} (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</h3><button type="button" class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"${ssrIncludeBooleanAttr(unref(formData).valuesItems.length <= 1) ? " disabled" : ""}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div><div class="space-y-4"><div class="relative"><input${ssrRenderAttr("value", unref(formData).valuesItems[index].title[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Value Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div class="relative"><textarea placeholder=" " rows="3" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).valuesItems[index].description[unref(currentLanguage)])}</textarea><label class="floating-label">Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div><div><label class="form-label">Icon Type</label><select class="form-input"><option value="excellence"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).valuesItems[index].icon) ? ssrLooseContain(unref(formData).valuesItems[index].icon, "excellence") : ssrLooseEqual(unref(formData).valuesItems[index].icon, "excellence")) ? " selected" : ""}>Excellence (checkmark)</option><option value="transparency"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).valuesItems[index].icon) ? ssrLooseContain(unref(formData).valuesItems[index].icon, "transparency") : ssrLooseEqual(unref(formData).valuesItems[index].icon, "transparency")) ? " selected" : ""}>Transparency (eye)</option><option value="innovation"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).valuesItems[index].icon) ? ssrLooseContain(unref(formData).valuesItems[index].icon, "innovation") : ssrLooseEqual(unref(formData).valuesItems[index].icon, "innovation")) ? " selected" : ""}>Innovation (lightning)</option><option value="default"${ssrIncludeBooleanAttr(Array.isArray(unref(formData).valuesItems[index].icon) ? ssrLooseContain(unref(formData).valuesItems[index].icon, "default") : ssrLooseEqual(unref(formData).valuesItems[index].icon, "default")) ? " selected" : ""}>Default (checkmark)</option></select></div></div></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"> + Add Value Item </button></div></div><div class="card p-6"><h2 class="text-xl font-bold text-gray-900 mb-6">Journey Timeline</h2><p class="text-sm text-gray-600 mb-4">Timeline items showing company history</p><div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(formData).journeyItems, (journey, index) => {
          _push(`<div class="border border-gray-200 rounded-lg p-4"><div class="flex justify-between items-center mb-4"><h3 class="font-medium text-gray-700">Timeline Item ${ssrInterpolate(index + 1)} (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</h3><button type="button" class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"${ssrIncludeBooleanAttr(unref(formData).journeyItems.length <= 1) ? " disabled" : ""}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div><div class="grid md:grid-cols-3 gap-4"><div class="relative"><input${ssrRenderAttr("value", unref(formData).journeyItems[index].year)} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Year</label></div><div class="md:col-span-2 relative"><input${ssrRenderAttr("value", unref(formData).journeyItems[index].title[unref(currentLanguage)])} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Title (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div><div class="mt-4 relative"><textarea placeholder=" " rows="3" class="form-input resize-none peer" required>${ssrInterpolate(unref(formData).journeyItems[index].description[unref(currentLanguage)])}</textarea><label class="floating-label">Description (${ssrInterpolate(unref(currentLanguage).toUpperCase())})</label></div></div>`);
        });
        _push(`<!--]--><button type="button" class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"> + Add Timeline Item </button></div></div><div class="flex justify-end space-x-4">`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/manage/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-DdFbYSW0.mjs.map
