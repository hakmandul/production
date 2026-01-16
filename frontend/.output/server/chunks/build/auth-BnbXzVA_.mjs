import { q as executeAsync } from '../../index.mjs';
import { d as defineNuxtRouteMiddleware, a as authClient, n as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-CI6ozfx3.mjs';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue';
import 'node:http';
import 'node:https';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'better-auth/vue';
import 'perfect-debounce';
import '@vue/shared';

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
//# sourceMappingURL=auth-BnbXzVA_.mjs.map
