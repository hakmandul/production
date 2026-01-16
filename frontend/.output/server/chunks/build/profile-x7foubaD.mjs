import { _ as __nuxt_component_0 } from './nuxt-link-BWdYDbni.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { b as useFetch, c as useRequestHeaders } from './server.mjs';
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
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: profile } = ([__temp, __restore] = withAsyncContext(() => useFetch("https://gocyxapik.pp.ua/api/me", {
      headers: useRequestHeaders(["cookie"])
    }, "$-6sbaO0toW")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center min-h-screen bg-gray-100" }, _attrs))}>`);
      if (unref(profile)) {
        _push(`<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md"><h1 class="text-2xl font-bold mb-6 text-center">Профиль</h1><div class="space-y-4"><div class="flex justify-center">`);
        if (unref(profile).user.image) {
          _push(`<img${ssrRenderAttr("src", unref(profile).user.image)} class="w-20 h-20 rounded-full border-2 border-blue-500">`);
        } else {
          _push(`<div class="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">${ssrInterpolate(unref(profile).user.name[0])}</div>`);
        }
        _push(`</div><div><label class="text-sm text-gray-500">Имя</label><p class="font-medium text-lg">${ssrInterpolate(unref(profile).user.name)}</p></div><div><label class="text-sm text-gray-500">Email</label><p class="font-medium text-lg">${ssrInterpolate(unref(profile).user.email)}</p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "block text-center text-blue-600 hover:underline mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` На главную `);
            } else {
              return [
                createTextVNode(" На главную ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="text-gray-500"> Загрузка данных... </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-x7foubaD.mjs.map
