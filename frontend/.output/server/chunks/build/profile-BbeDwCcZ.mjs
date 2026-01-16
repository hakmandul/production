import { defineComponent, ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { b as useRequestHeaders } from './server.mjs';
import { u as useFetch } from './fetch-DgWu-JWv.mjs';
import 'node:http';
import 'node:https';
import '../../index.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'better-auth/vue';
import '@vue/shared';
import './asyncData-K7ZdKEFQ.mjs';
import 'perfect-debounce';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const isLoggingOut = ref(false);
    const { data: profile, status, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("https://gocyxapik.pp.ua/api/me", {
      headers: useRequestHeaders(["cookie"]),
      key: "user-profile"
    }, "$-6sbaO0toW")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md mx-auto">`);
      if (unref(status) === "pending") {
        _push(`<div class="bg-white p-8 rounded-xl shadow w-full animate-pulse"><div class="flex justify-center mb-6"><div class="w-24 h-24 bg-gray-200 rounded-full"></div></div><div class="space-y-4"><div class="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div><div class="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div></div></div>`);
      } else if (unref(error)) {
        _push(`<div class="bg-red-50 p-6 rounded-xl border border-red-200 text-center"><h2 class="text-lg font-bold text-red-600 mb-2">Не удалось загрузить профиль</h2><p class="text-sm text-red-800 mb-4">${ssrInterpolate(unref(error).message)}</p><button class="px-4 py-2 bg-white border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition"> Повторить </button></div>`);
      } else if (unref(profile)?.user) {
        _push(`<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div><div class="relative px-6 pb-6"><div class="relative -mt-12 mb-4 flex justify-center"><div class="p-1 bg-white rounded-full">`);
        if (unref(profile).user.image) {
          _push(`<img${ssrRenderAttr("src", unref(profile).user.image)} alt="Avatar" class="w-24 h-24 rounded-full object-cover border border-gray-200">`);
        } else {
          _push(`<div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-bold border border-gray-200">${ssrInterpolate(unref(profile).user.name?.charAt(0)?.toUpperCase() ?? "U")}</div>`);
        }
        _push(`</div></div><div class="text-center mb-6"><h1 class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(profile).user.name)}</h1><p class="text-sm text-gray-500">${ssrInterpolate(unref(profile).user.email)}</p><span class="mt-2 inline-block px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full"> Пользователь </span></div><div class="bg-gray-50 rounded-lg p-3 mb-6 flex justify-between items-center text-xs text-gray-500"><span>ID Аккаунта:</span><span class="font-mono bg-white px-2 py-1 rounded border border-gray-200 select-all">${ssrInterpolate(unref(profile).user.id)}</span></div><div class="space-y-3"><button${ssrIncludeBooleanAttr(unref(isLoggingOut)) ? " disabled" : ""} class="w-full py-2.5 px-4 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition flex justify-center items-center gap-2 disabled:opacity-50">`);
        if (unref(isLoggingOut)) {
          _push(`<span class="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(unref(isLoggingOut) ? "Выход..." : "Выйти")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
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
//# sourceMappingURL=profile-BbeDwCcZ.mjs.map
