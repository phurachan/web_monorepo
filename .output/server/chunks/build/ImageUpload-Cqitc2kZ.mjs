import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageUpload",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: { default: "Image" }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    ref();
    const uploading = ref(false);
    const error = ref("");
    const isDragging = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="flex items-center justify-between"><label class="block text-sm font-medium text-gray-700">${ssrInterpolate(_ctx.label)}</label>`);
      if (_ctx.modelValue) {
        _push(`<button type="button" class="text-sm text-red-600 hover:text-red-500"> Remove </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!_ctx.modelValue) {
        _push(`<div class="${ssrRenderClass([{ "border-blue-400 bg-blue-50": unref(isDragging) }, "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer transition-colors"])}"><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><div class="mt-2"><p class="text-sm text-gray-600"><span class="font-medium text-blue-600">Click to upload</span> or drag and drop </p><p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p></div></div>`);
      } else {
        _push(`<div class="relative"><img${ssrRenderAttr("src", _ctx.modelValue)}${ssrRenderAttr("alt", _ctx.label)} class="w-full h-48 object-cover rounded-lg border"><div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center"><button class="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium"> Change Image </button></div></div>`);
      }
      _push(`<div class="relative"><input${ssrRenderAttr("value", _ctx.modelValue)} type="text" placeholder="Or enter image URL" class="form-input"></div><input type="file" accept="image/*" class="hidden">`);
      if (unref(uploading)) {
        _push(`<div class="flex items-center space-x-2"><div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div><span class="text-sm text-gray-600">Uploading...</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(error)) {
        _push(`<div class="p-3 bg-red-50 border border-red-200 rounded-lg"><p class="text-red-700 text-sm">${ssrInterpolate(unref(error))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../digital-agency/components/ImageUpload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ImageUpload-Cqitc2kZ.mjs.map
