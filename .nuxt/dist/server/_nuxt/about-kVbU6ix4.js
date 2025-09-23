import { _ as __nuxt_component_0, a as _imports_0, b as _imports_1, c as _imports_2, d as _imports_3, e as _imports_4, f as _imports_5 } from "./virtual_public-WLkNAOig.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-CKoRUFr1.js";
import { withAsyncContext, computed, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
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
  __name: "about",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getSiteSettings, getAboutContent } = useCMS();
    const { t, currentLanguage } = useI18n();
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
    const aboutContentRaw = ([__temp, __restore] = withAsyncContext(() => getAboutContent()), __temp = await __temp, __restore(), __temp);
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
    const aboutContent = computed(() => ({
      // Basic fields
      heroImage: aboutContentRaw.heroImage,
      missionImage: aboutContentRaw.missionImage,
      // Multi-language text fields
      missionTitle: getLocalizedContent(aboutContentRaw.missionTitle, "Our Mission"),
      missionText: getLocalizedContent(aboutContentRaw.missionText, "We believe every business deserves to succeed online."),
      visionTitle: getLocalizedContent(aboutContentRaw.visionTitle, "Our Vision"),
      visionText: getLocalizedContent(aboutContentRaw.visionText, "To become the leading digital marketing agency."),
      valuesTitle: getLocalizedContent(aboutContentRaw.valuesTitle, "Our Values"),
      valuesText: getLocalizedContent(aboutContentRaw.valuesText, "Excellence, Transparency, Innovation - these core values guide everything we do."),
      historyTitle: getLocalizedContent(aboutContentRaw.historyTitle, "Our Journey"),
      historyText: getLocalizedContent(aboutContentRaw.historyText, "From startup to industry leader."),
      // Statistics
      happyClientsCount: getLocalizedContent(aboutContentRaw.happyClientsCount, "500+"),
      happyClientsLabel: getLocalizedContent(aboutContentRaw.happyClientsLabel, "Happy Clients"),
      experienceCount: getLocalizedContent(aboutContentRaw.experienceCount, "10+"),
      experienceLabel: getLocalizedContent(aboutContentRaw.experienceLabel, "Years Experience")
    }));
    const parsedVisionItems = computed(() => {
      try {
        const items = JSON.parse(aboutContentRaw.visionItems || "[]");
        if (items.length > 0) {
          return items.map(
            (item) => typeof item === "object" && item[currentLanguage.value] ? item[currentLanguage.value] : item.en || item || "Vision Item"
          );
        }
        const fallbackItems = [
          { en: "Proven Track Record", th: "ประวัติที่พิสูจน์แล้ว" },
          { en: "Dedicated Management", th: "การจัดการที่ทุ่มเท" },
          { en: "Transparent Reporting", th: "รายงานที่โปร่งใส" },
          { en: "24/7 Support Available", th: "บริการสนับสนุน 24/7" }
        ];
        return fallbackItems.map((item) => item[currentLanguage.value] || item.en);
      } catch {
        const fallbackItems = [
          { en: "Proven Track Record", th: "ประวัติที่พิสูจน์แล้ว" },
          { en: "Dedicated Management", th: "การจัดการที่ทุ่มเท" },
          { en: "Transparent Reporting", th: "รายงานที่โปร่งใส" },
          { en: "24/7 Support Available", th: "บริการสนับสนุน 24/7" }
        ];
        return fallbackItems.map((item) => item[currentLanguage.value] || item.en);
      }
    });
    const parsedValuesItems = computed(() => {
      try {
        const items = JSON.parse(aboutContentRaw.valuesItems || "[]");
        if (items.length > 0) {
          return items.map((item) => ({
            title: typeof item.title === "object" ? item.title[currentLanguage.value] || item.title.en || "Value" : item.title || "Value",
            description: typeof item.description === "object" ? item.description[currentLanguage.value] || item.description.en || "Description" : item.description || "Description",
            icon: item.icon || "default"
          }));
        }
        const fallbackItems = [
          {
            title: { en: "Excellence", th: "ความเป็นเลิศ" },
            description: { en: "We strive for excellence in every project, delivering results that exceed expectations.", th: "เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง" },
            icon: "excellence"
          },
          {
            title: { en: "Transparency", th: "ความโปร่งใส" },
            description: { en: "Open communication and honest reporting build trust in all our client relationships.", th: "การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจ" },
            icon: "transparency"
          },
          {
            title: { en: "Innovation", th: "นวัตกรรม" },
            description: { en: "We stay ahead of trends and continuously innovate to give clients a competitive edge.", th: "เราก้าวนำเทรนด์และสร้างนวัตกรรมเพื่อให้ลูกค้ามีความได้เปรียบ" },
            icon: "innovation"
          }
        ];
        return fallbackItems.map((item) => ({
          title: item.title[currentLanguage.value] || item.title.en,
          description: item.description[currentLanguage.value] || item.description.en,
          icon: item.icon
        }));
      } catch {
        const fallbackItems = [
          {
            title: { en: "Excellence", th: "ความเป็นเลิศ" },
            description: { en: "We strive for excellence in every project, delivering results that exceed expectations.", th: "เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง" },
            icon: "excellence"
          },
          {
            title: { en: "Transparency", th: "ความโปร่งใส" },
            description: { en: "Open communication and honest reporting build trust in all our client relationships.", th: "การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจ" },
            icon: "transparency"
          },
          {
            title: { en: "Innovation", th: "นวัตกรรม" },
            description: { en: "We stay ahead of trends and continuously innovate to give clients a competitive edge.", th: "เราก้าวนำเทรนด์และสร้างนวัตกรรมเพื่อให้ลูกค้ามีความได้เปรียบ" },
            icon: "innovation"
          }
        ];
        return fallbackItems.map((item) => ({
          title: item.title[currentLanguage.value] || item.title.en,
          description: item.description[currentLanguage.value] || item.description.en,
          icon: item.icon
        }));
      }
    });
    const parsedJourneyItems = computed(() => {
      try {
        const items = JSON.parse(aboutContentRaw.journeyItems || "[]");
        if (items.length > 0) {
          return items.map((item) => ({
            year: item.year || "2024",
            title: typeof item.title === "object" ? item.title[currentLanguage.value] || item.title.en || "Journey Item" : item.title || "Journey Item",
            description: typeof item.description === "object" ? item.description[currentLanguage.value] || item.description.en || "Description" : item.description || "Description"
          }));
        }
        const fallbackItems = [
          {
            year: "2015",
            title: { en: "The Beginning", th: "จุดเริ่มต้น" },
            description: { en: `Founded ${siteSettings.siteName} with a mission to help businesses succeed through digital marketing.`, th: `ก่อตั้ง ${siteSettings.siteName} ด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล` }
          },
          {
            year: "2018",
            title: { en: "Rapid Growth", th: "การเติบโตอย่างรวดเร็ว" },
            description: { en: "Expanded to 25 specialists and served over 200 clients across industries.", th: "ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม" }
          },
          {
            year: "2021",
            title: { en: "Innovation Leader", th: "ผู้นำด้านนวัตกรรม" },
            description: { en: "Launched proprietary analytics platform and AI-driven tools.", th: "เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI" }
          },
          {
            year: "2025",
            title: { en: "Industry Recognition", th: "การยอมรับในอุตสาหกรรม" },
            description: { en: "Recognized as top agency with over 500 successful partnerships.", th: "ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ" }
          }
        ];
        return fallbackItems.map((item) => ({
          year: item.year,
          title: item.title[currentLanguage.value] || item.title.en,
          description: item.description[currentLanguage.value] || item.description.en
        }));
      } catch {
        const fallbackItems = [
          {
            year: "2015",
            title: { en: "The Beginning", th: "จุดเริ่มต้น" },
            description: { en: `Founded ${siteSettings.siteName} with a mission to help businesses succeed through digital marketing.`, th: `ก่อตั้ง ${siteSettings.siteName} ด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล` }
          },
          {
            year: "2018",
            title: { en: "Rapid Growth", th: "การเติบโตอย่างรวดเร็ว" },
            description: { en: "Expanded to 25 specialists and served over 200 clients across industries.", th: "ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม" }
          },
          {
            year: "2021",
            title: { en: "Innovation Leader", th: "ผู้นำด้านนวัตกรรม" },
            description: { en: "Launched proprietary analytics platform and AI-driven tools.", th: "เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI" }
          },
          {
            year: "2025",
            title: { en: "Industry Recognition", th: "การยอมรับในอุตสาหกรรม" },
            description: { en: "Recognized as top agency with over 500 successful partnerships.", th: "ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ" }
          }
        ];
        return fallbackItems.map((item) => ({
          year: item.year,
          title: item.title[currentLanguage.value] || item.title.en,
          description: item.description[currentLanguage.value] || item.description.en
        }));
      }
    });
    const getValueIconClass = (index) => {
      const classes = ["bg-blue-100", "bg-green-100", "bg-purple-100"];
      return classes[index % classes.length];
    };
    const getValueIcon = (iconType) => {
      const icons = {
        excellence: '<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>',
        transparency: '<svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',
        innovation: '<svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
        default: '<svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
      };
      return icons[iconType] || icons.default;
    };
    const getJourneyColor = (index) => {
      const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500"];
      return colors[index % colors.length];
    };
    useSeoMeta({
      title: `About Us | ${siteSettings.siteName} - Digital Marketing Agency`,
      description: `Learn about ${siteSettings.siteName}'s mission, values, and expert team. Discover why we're the trusted digital marketing partner for businesses.`
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
        class: "text-blue-500 font-medium"
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
      _push(`</div><button class="btn-primary hidden md:block">${ssrInterpolate(unref(t)("common.getStarted"))}</button></div></div></nav><section style="${ssrRenderStyle([{ "padding-top": "140px" }, unref(aboutContent).heroImage ? { backgroundImage: `url(${unref(aboutContent).heroImage})` } : {}])}" class="${ssrRenderClass([unref(aboutContent).heroImage ? "bg-cover bg-center bg-no-repeat" : "bg-gradient-primary-to-secondary", "section-padding text-white relative overflow-hidden"])}">`);
      if (unref(aboutContent).heroImage) {
        _push(`<div class="absolute inset-0 bg-black/40"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container text-center relative z-10"><h1 class="text-4xl lg:text-5xl font-bold mb-6">${ssrInterpolate(unref(t)("about.aboutCompany", { siteName: unref(siteSettings).siteName }))}</h1><p class="text-xl text-blue-100 max-w-3xl mx-auto">${ssrInterpolate(unref(t)("about.passionateHelping"))}</p></div></section><section class="section-padding"><div class="container"><div class="grid lg:grid-cols-2 gap-16 items-center"><div><h2 class="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">${ssrInterpolate(unref(aboutContent).missionTitle)}</h2><p class="text-lg text-gray-600 mb-6">${ssrInterpolate(unref(aboutContent).missionText)}</p><div class="grid grid-cols-2 gap-6"><div class="text-center p-4 bg-blue-50 rounded-lg"><div class="text-3xl font-bold text-blue-600 mb-2">${ssrInterpolate(unref(aboutContent).happyClientsCount)}</div><div class="text-gray-700">${ssrInterpolate(unref(aboutContent).happyClientsLabel)}</div></div><div class="text-center p-4 bg-green-50 rounded-lg"><div class="text-3xl font-bold text-green-600 mb-2">${ssrInterpolate(unref(aboutContent).experienceCount)}</div><div class="text-gray-700">${ssrInterpolate(unref(aboutContent).experienceLabel)}</div></div></div></div><div class="relative"><div class="${ssrRenderClass([unref(aboutContent).missionImage ? "bg-cover bg-center bg-no-repeat" : "bg-gradient-primary-to-secondary", "rounded-2xl p-8 text-white relative overflow-hidden"])}" style="${ssrRenderStyle(unref(aboutContent).missionImage ? { backgroundImage: `url(${unref(aboutContent).missionImage})` } : {})}">`);
      if (unref(aboutContent).missionImage) {
        _push(`<div class="absolute inset-0 bg-black/60"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="relative z-10"><h3 class="text-2xl font-bold mb-4">${ssrInterpolate(unref(aboutContent).visionTitle)}</h3><p class="text-gray-100 mb-6">${ssrInterpolate(unref(aboutContent).visionText)}</p><ul class="space-y-4"><!--[-->`);
      ssrRenderList(unref(parsedVisionItems), (item) => {
        _push(`<li class="flex items-center"><svg class="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${ssrInterpolate(item)}</li>`);
      });
      _push(`<!--]--></ul></div></div></div></div></div></section><section class="section-padding"><div class="container"><div class="text-center mb-16"><h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">${ssrInterpolate(unref(aboutContent).valuesTitle)}</h2><p class="text-xl text-gray-600">${ssrInterpolate(unref(aboutContent).valuesText)}</p></div><div class="grid md:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(unref(parsedValuesItems), (value, index) => {
        _push(`<div class="text-center"><div class="${ssrRenderClass([getValueIconClass(index), "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"])}"><div>${getValueIcon(value.icon || "default")}</div></div><h3 class="text-2xl font-bold mb-4 text-gray-900">${ssrInterpolate(value.title)}</h3><p class="text-gray-600">${ssrInterpolate(value.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="section-padding bg-gray-50"><div class="container"><div class="text-center mb-16"><h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">${ssrInterpolate(unref(aboutContent).historyTitle)}</h2><p class="text-xl text-gray-600">${ssrInterpolate(unref(aboutContent).historyText)}</p></div><div class="max-w-4xl mx-auto"><div class="space-y-12"><!--[-->`);
      ssrRenderList(unref(parsedJourneyItems), (journey, index) => {
        _push(`<div class="flex items-center space-x-6"><div class="${ssrRenderClass([getJourneyColor(index), "w-16 h-16 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"])}">${ssrInterpolate(journey.year)}</div><div class="card p-6 flex-grow"><h3 class="text-xl font-bold mb-2 text-gray-900">${ssrInterpolate(journey.title)}</h3><p class="text-gray-600">${ssrInterpolate(journey.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></section><section class="section-padding gradient-bg text-white"><div class="container text-center"><h2 class="text-3xl lg:text-4xl font-bold mb-6">${ssrInterpolate(unref(t)("common.workTogether"))}</h2><p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">${ssrInterpolate(unref(t)("about.joinBusinesses", { siteName: unref(siteSettings).siteName }))}</p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/contact",
        class: "btn-primary bg-white text-blue-600 hover:bg-gray-100"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("common.startJourney"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("common.startJourney")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section><footer class="bg-gray-900 text-white py-12"><div class="container"><div class="grid md:grid-cols-4 gap-8"><div><div class="text-2xl font-bold mb-4">${ssrInterpolate(unref(siteSettings).siteName)}</div><p class="text-gray-400 mb-4">${ssrInterpolate(unref(t)("footer.elevatingBrands"))}</p><div class="grid grid-cols-3 gap-3 max-w-[156px]"><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><img${ssrRenderAttr("src", _imports_0)} alt="Facebook" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"><img${ssrRenderAttr("src", _imports_1)} alt="Instagram" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"><img${ssrRenderAttr("src", _imports_2)} alt="Line" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors"><img${ssrRenderAttr("src", _imports_3)} alt="TikTok" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><img${ssrRenderAttr("src", _imports_4)} alt="YouTube" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"><img${ssrRenderAttr("src", _imports_5)} alt="LinkedIn" class="w-7 h-7 object-contain"></a></div></div><div><h4 class="text-lg font-bold mb-4">${ssrInterpolate(unref(t)("footer.services"))}</h4><ul class="space-y-2 text-gray-400"><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.seoOptimization"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.socialMediaMarketing"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.webDevelopment"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.ppcAdvertising"))}</a></li></ul></div><div><h4 class="text-lg font-bold mb-4">${ssrInterpolate(unref(t)("footer.company"))}</h4><ul class="space-y-2 text-gray-400"><li>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=about-kVbU6ix4.js.map
