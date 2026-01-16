import { _ as __nuxt_component_0 } from './nuxt-link-CL8d-1v6.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as authClient } from './server.mjs';
import { useRouter } from 'vue-router';
import { u as useFetch } from './fetch-utFJoQ8C.mjs';
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
import 'better-auth/vue';
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: session } = ([__temp, __restore] = withAsyncContext(() => authClient.useSession(useFetch)), __temp = await __temp, __restore(), __temp);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-8" }, _attrs))}><div class="max-w-4xl mx-auto">`);
      if (unref(session)) {
        _push(`<div class="bg-white rounded-lg shadow-md p-6"><div class="flex items-center space-x-4">`);
        if (unref(session).user.image) {
          _push(`<div class="shrink-0"><img${ssrRenderAttr("src", unref(session).user.image)} class="h-16 w-16 rounded-full object-cover" alt="Avatar"></div>`);
        } else {
          _push(`<div class="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">${ssrInterpolate(unref(session).user.name.charAt(0).toUpperCase())}</div>`);
        }
        _push(`<div><h1 class="text-2xl font-bold text-gray-900">Привет, ${ssrInterpolate(unref(session).user.name)}!</h1><p class="text-gray-500">${ssrInterpolate(unref(session).user.email)}</p></div></div><div class="mt-8 border-t pt-6"><h3 class="text-lg font-medium text-gray-900 mb-4">Данные сессии (Debug):</h3><pre class="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">${ssrInterpolate(unref(session))}</pre></div><div class="mt-6"><button class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"> Выйти </button></div></div>`);
      } else {
        _push(`<div class="text-center py-20"><h1 class="text-3xl font-bold text-gray-900 mb-4">Добро пожаловать</h1><p class="text-gray-600 mb-8">Для доступа к контенту необходимо авторизоваться.</p><div class="space-x-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
          class: "px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
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
        _push(`</div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-cMHbI5_i.mjs.map
