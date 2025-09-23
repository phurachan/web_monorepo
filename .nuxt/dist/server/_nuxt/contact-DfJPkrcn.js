import { _ as __nuxt_component_0, a as _imports_0, b as _imports_1, c as _imports_2, d as _imports_3, e as _imports_4, f as _imports_5 } from "./virtual_public-WLkNAOig.js";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-CKoRUFr1.js";
import { withAsyncContext, computed, reactive, ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
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
  __name: "contact",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { getContactContent, getFAQs, getSiteSettings } = useCMS();
    const { t, currentLanguage } = useI18n();
    const contactContentRaw = ([__temp, __restore] = withAsyncContext(() => getContactContent()), __temp = await __temp, __restore(), __temp);
    const faqs = ([__temp, __restore] = withAsyncContext(() => getFAQs()), __temp = await __temp, __restore(), __temp);
    const siteSettings = ([__temp, __restore] = withAsyncContext(() => getSiteSettings()), __temp = await __temp, __restore(), __temp);
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
    const contactContent = computed(() => ({
      // Basic fields
      heroImage: contactContentRaw.heroImage,
      // Multi-language text fields
      title: getLocalizedContent(contactContentRaw.title, "Contact Us"),
      subtitle: getLocalizedContent(contactContentRaw.subtitle, "Ready to transform your digital presence? Let's discuss how we can help accelerate your business growth.")
    }));
    const form = reactive({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
      newsletter: false
    });
    const isSubmitting = ref(false);
    const showSuccessMessage = ref(false);
    const openFaq = ref(-1);
    useSeoMeta({
      title: `Contact Us | ${siteSettings.siteName} - Get Your Free Consultation`,
      description: `Ready to transform your digital presence? Contact ${siteSettings.siteName} today for a free consultation. Our digital marketing experts are ready to help grow your business.`
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
        class: "text-blue-500 font-medium"
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
      _push(`</div><button class="btn-primary hidden md:block">${ssrInterpolate(unref(t)("common.getStarted"))}</button></div></div></nav><section style="${ssrRenderStyle([{ "padding-top": "140px" }, unref(contactContent).heroImage ? { backgroundImage: `url(${unref(contactContent).heroImage})` } : {}])}" class="${ssrRenderClass([unref(contactContent).heroImage ? "bg-cover bg-center bg-no-repeat" : "bg-gradient-primary-to-secondary", "section-padding text-white relative overflow-hidden"])}">`);
      if (unref(contactContent).heroImage) {
        _push(`<div class="absolute inset-0 bg-black/40"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container text-center relative z-10"><h1 class="text-4xl lg:text-5xl font-bold mb-6">${ssrInterpolate(unref(contactContent).title)}</h1><p class="text-xl text-blue-100 max-w-3xl mx-auto">${ssrInterpolate(unref(contactContent).subtitle)}</p></div></section><section class="section-padding"><div class="container"><div class="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto"><div><h2 class="text-3xl font-bold mb-8 text-gray-900">Let&#39;s Start a Conversation</h2><p class="text-lg text-gray-600 mb-8"> Whether you&#39;re looking to boost your online presence, increase conversions, or dominate search results, our team is here to help. Reach out today for a free consultation. </p><div class="space-y-6 mb-8"><div class="flex items-start space-x-4"><div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div><div><h4 class="font-bold text-gray-900 mb-1">Phone</h4><p class="text-gray-600">+1 (555) 123-4567</p><p class="text-sm text-gray-500">Available Mon-Fri 9AM-6PM PST</p></div></div><div class="flex items-start space-x-4"><div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div><div><h4 class="font-bold text-gray-900 mb-1">Email</h4><p class="text-gray-600">hello@digitalflow.com</p><p class="text-sm text-gray-500">We respond within 24 hours</p></div></div><div class="flex items-start space-x-4"><div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><div><h4 class="font-bold text-gray-900 mb-1">Office</h4><p class="text-gray-600">123 Innovation Drive<br>Tech Valley, CA 94105</p><p class="text-sm text-gray-500">Visit us for in-person consultations</p></div></div></div><div class="card p-6"><h3 class="text-xl font-bold mb-4 text-gray-900">Business Hours</h3><div class="space-y-2"><div class="flex justify-between"><span class="text-gray-600">Monday - Friday</span><span class="font-medium">9:00 AM - 6:00 PM</span></div><div class="flex justify-between"><span class="text-gray-600">Saturday</span><span class="font-medium">10:00 AM - 4:00 PM</span></div><div class="flex justify-between"><span class="text-gray-600">Sunday</span><span class="font-medium">Closed</span></div></div></div></div><div class="card p-8"><form class="space-y-6"><div class="grid md:grid-cols-2 gap-6"><div class="relative"><input${ssrRenderAttr("value", unref(form).firstName)} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">First Name</label></div><div class="relative"><input${ssrRenderAttr("value", unref(form).lastName)} type="text" placeholder=" " class="form-input peer" required><label class="floating-label">Last Name</label></div></div><div class="relative"><input${ssrRenderAttr("value", unref(form).email)} type="email" placeholder=" " class="form-input peer" required><label class="floating-label">Email Address</label></div><div class="relative"><input${ssrRenderAttr("value", unref(form).phone)} type="tel" placeholder=" " class="form-input peer"><label class="floating-label">Phone Number (Optional)</label></div><div class="relative"><input${ssrRenderAttr("value", unref(form).company)} type="text" placeholder=" " class="form-input peer"><label class="floating-label">Company Name</label></div><div class="relative"><select class="form-input peer" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "") : ssrLooseEqual(unref(form).service, "")) ? " selected" : ""}>Select a service</option><option value="seo"${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "seo") : ssrLooseEqual(unref(form).service, "seo")) ? " selected" : ""}>SEO Optimization</option><option value="social-media"${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "social-media") : ssrLooseEqual(unref(form).service, "social-media")) ? " selected" : ""}>Social Media Marketing</option><option value="web-development"${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "web-development") : ssrLooseEqual(unref(form).service, "web-development")) ? " selected" : ""}>Web Development</option><option value="ppc"${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "ppc") : ssrLooseEqual(unref(form).service, "ppc")) ? " selected" : ""}>PPC Advertising</option><option value="email-marketing"${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "email-marketing") : ssrLooseEqual(unref(form).service, "email-marketing")) ? " selected" : ""}>Email Marketing</option><option value="analytics"${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "analytics") : ssrLooseEqual(unref(form).service, "analytics")) ? " selected" : ""}>Analytics &amp; Reporting</option><option value="consultation"${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "consultation") : ssrLooseEqual(unref(form).service, "consultation")) ? " selected" : ""}>Free Consultation</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(form).service) ? ssrLooseContain(unref(form).service, "other") : ssrLooseEqual(unref(form).service, "other")) ? " selected" : ""}>Other</option></select><label class="floating-label">Service Interest</label></div><div class="relative"><select class="form-input peer"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, "") : ssrLooseEqual(unref(form).budget, "")) ? " selected" : ""}>Select your budget range</option><option value="under-5k"${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, "under-5k") : ssrLooseEqual(unref(form).budget, "under-5k")) ? " selected" : ""}>Under $5,000/month</option><option value="5k-10k"${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, "5k-10k") : ssrLooseEqual(unref(form).budget, "5k-10k")) ? " selected" : ""}>$5,000 - $10,000/month</option><option value="10k-25k"${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, "10k-25k") : ssrLooseEqual(unref(form).budget, "10k-25k")) ? " selected" : ""}>$10,000 - $25,000/month</option><option value="25k-50k"${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, "25k-50k") : ssrLooseEqual(unref(form).budget, "25k-50k")) ? " selected" : ""}>$25,000 - $50,000/month</option><option value="50k-plus"${ssrIncludeBooleanAttr(Array.isArray(unref(form).budget) ? ssrLooseContain(unref(form).budget, "50k-plus") : ssrLooseEqual(unref(form).budget, "50k-plus")) ? " selected" : ""}>$50,000+/month</option></select><label class="floating-label">Budget Range</label></div><div class="relative"><textarea placeholder=" " rows="4" class="form-input resize-none peer" required>${ssrInterpolate(unref(form).message)}</textarea><label class="floating-label">Tell us about your project</label></div><div class="flex items-start space-x-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).newsletter) ? ssrLooseContain(unref(form).newsletter, null) : unref(form).newsletter) ? " checked" : ""} type="checkbox" id="newsletter" class="mt-1 w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"><label for="newsletter" class="text-sm text-gray-600"> I&#39;d like to receive updates about digital marketing tips and ${ssrInterpolate(unref(siteSettings).siteName)} news </label></div><button type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""}>${ssrInterpolate(unref(isSubmitting) ? "Sending..." : "Send Message")}</button><p class="text-sm text-gray-500 text-center"> By submitting this form, you agree to our privacy policy and terms of service. </p></form>`);
      if (unref(showSuccessMessage)) {
        _push(`<div class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"><div class="flex items-center"><svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span class="text-green-700 font-medium">Thank you! We&#39;ll be in touch within 24 hours.</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section><section class="section-padding bg-gray-50"><div class="container max-w-4xl mx-auto"><div class="text-center mb-16"><h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions</h2><p class="text-xl text-gray-600">Get quick answers to common questions</p></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(faqs), (faq, index) => {
        _push(`<div class="card"><button class="w-full p-6 text-left flex justify-between items-center"><h3 class="text-lg font-bold text-gray-900">${ssrInterpolate(faq.question)}</h3><svg class="${ssrRenderClass([{ "rotate-180": unref(openFaq) === index }, "w-5 h-5 text-gray-500 transform transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button><div style="${ssrRenderStyle(unref(openFaq) === index ? null : { display: "none" })}" class="px-6 pb-6"><p class="text-gray-600">${ssrInterpolate(faq.answer)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="section-padding gradient-bg text-white"><div class="container text-center"><h2 class="text-3xl lg:text-4xl font-bold mb-6">${ssrInterpolate(unref(t)("home.readyToGetStarted"))}</h2><p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"> Join hundreds of businesses that have transformed their digital presence with ${ssrInterpolate(unref(siteSettings).siteName)}</p><button class="btn-primary bg-white text-blue-600 hover:bg-gray-100">${ssrInterpolate(unref(t)("common.scheduleConsultation"))}</button></div></section><footer class="bg-gray-900 text-white py-12"><div class="container"><div class="grid md:grid-cols-4 gap-8"><div><div class="text-2xl font-bold mb-4">${ssrInterpolate(unref(siteSettings).siteName)}</div><p class="text-gray-400 mb-4">${ssrInterpolate(unref(t)("footer.elevatingBrands"))}</p><div class="grid grid-cols-3 gap-3 max-w-[156px]"><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><img${ssrRenderAttr("src", _imports_0)} alt="Facebook" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors"><img${ssrRenderAttr("src", _imports_1)} alt="Instagram" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors"><img${ssrRenderAttr("src", _imports_2)} alt="Line" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors"><img${ssrRenderAttr("src", _imports_3)} alt="TikTok" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"><img${ssrRenderAttr("src", _imports_4)} alt="YouTube" class="w-7 h-7 object-contain"></a><a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"><img${ssrRenderAttr("src", _imports_5)} alt="LinkedIn" class="w-7 h-7 object-contain"></a></div></div><div><h4 class="text-lg font-bold mb-4">${ssrInterpolate(unref(t)("footer.services"))}</h4><ul class="space-y-2 text-gray-400"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/agency-cms/services",
        class: "hover:text-white transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(t)("footer.seoOptimization"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(t)("footer.seoOptimization")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.socialMediaMarketing"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.webDevelopment"))}</a></li><li><a href="#" class="hover:text-white transition-colors">${ssrInterpolate(unref(t)("footer.ppcAdvertising"))}</a></li></ul></div><div><h4 class="text-lg font-bold mb-4">${ssrInterpolate(unref(t)("footer.company"))}</h4><ul class="space-y-2 text-gray-400"><li>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/pages/agency-cms/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=contact-DfJPkrcn.js.map
