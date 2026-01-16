import { p as executeAsync } from '../../index.mjs';
import { a as authClient, u as useFetch } from './fetch-Ck_USP8n.mjs';
import { d as defineNuxtRouteMiddleware, n as navigateTo } from './server.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'better-auth/vue';
import 'vue';
import '@vue/shared';
import 'perfect-debounce';
import 'node:http';
import 'node:https';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const auth = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const publicPages = ["/login", "/register", "/"];
  if (publicPages.includes(to.path)) {
    return;
  }
  const { data: session } = ([__temp, __restore] = executeAsync(() => authClient.useSession(useFetch)), __temp = await __temp, __restore(), __temp);
  if (!session.value) {
    return navigateTo("/login");
  }
});

export { auth as default };
//# sourceMappingURL=auth-BI20-VX5.mjs.map
