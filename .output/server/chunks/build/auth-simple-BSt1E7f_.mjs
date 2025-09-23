import { d as defineNuxtRouteMiddleware } from './server.mjs';
import 'vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const authSimple = defineNuxtRouteMiddleware(async (to, from) => {
  if (!to.path.startsWith("/agency-cms/manage")) {
    return;
  }
  return;
});

export { authSimple as default };
//# sourceMappingURL=auth-simple-BSt1E7f_.mjs.map
