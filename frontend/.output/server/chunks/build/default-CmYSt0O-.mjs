import { _ as __nuxt_component_0$1 } from './nuxt-link-Bs8G-SmD.mjs';
import { defineComponent, useSSRContext, mergeProps, withCtx, createTextVNode, unref, createVNode, createBlock, toDisplayString, openBlock } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { h as useUser } from './server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import '../../index.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'node:http';
import 'node:https';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'better-auth/vue';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useUser();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "bg-white border-b border-gray-200 sticky top-0 z-50" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between h-16 items-center"><div class="flex-shrink-0 flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-2xl font-bold text-blue-600 tracking-tight"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` GoCyxapik `);
          } else {
            return [
              createTextVNode(" GoCyxapik ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center space-x-4">`);
      if (unref(user)) {
        _push(`<div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "flex items-center gap-2 group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-blue-600"${_scopeId}>${ssrInterpolate(unref(user).name)}</span>`);
              if (unref(user).image) {
                _push2(`<img class="h-9 w-9 rounded-full border border-gray-300 group-hover:ring-2 group-hover:ring-blue-500 transition"${ssrRenderAttr("src", unref(user).image)} alt="Avatar"${_scopeId}>`);
              } else {
                _push2(`<div class="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold group-hover:ring-2 group-hover:ring-blue-500 transition"${_scopeId}>${ssrInterpolate(unref(user).name?.charAt(0)?.toUpperCase() ?? "U")}</div>`);
              }
            } else {
              return [
                createVNode("span", { class: "hidden sm:block text-sm font-medium text-gray-700 group-hover:text-blue-600" }, toDisplayString(unref(user).name), 1),
                unref(user).image ? (openBlock(), createBlock("img", {
                  key: 0,
                  class: "h-9 w-9 rounded-full border border-gray-300 group-hover:ring-2 group-hover:ring-blue-500 transition",
                  src: unref(user).image,
                  alt: "Avatar"
                }, null, 8, ["src"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold group-hover:ring-2 group-hover:ring-blue-500 transition"
                }, toDisplayString(unref(user).name?.charAt(0)?.toUpperCase() ?? "U"), 1))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="flex items-center gap-3">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "text-gray-600 hover:text-gray-900 font-medium text-sm transition"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Войти `);
            } else {
              return [
                createTextVNode(" Войти ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/register",
          class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Регистрация `);
            } else {
              return [
                createTextVNode(" Регистрация ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "AppHeader" });
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-white border-t border-gray-200 mt-auto" }, _attrs))}><div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"><div class="flex flex-col items-center justify-center space-y-2"><p class="text-gray-500 text-sm font-medium"> © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} All rights reserved. </p><div class="flex items-center gap-2 text-gray-400 text-xs uppercase tracking-wider"><span>by</span><span class="font-bold text-gray-600">extezil</span><span class="px-1">•</span><span>supported ai</span></div></div></div></footer>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "AppFooter" });
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppHeader = __nuxt_component_0;
  const _component_AppFooter = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex flex-col bg-gray-50" }, _attrs))}>`);
  _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
  _push(`<main class="flex-grow">`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _default as default };
//# sourceMappingURL=default-CmYSt0O-.mjs.map
