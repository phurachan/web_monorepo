import { d as defineNuxtRouteMiddleware } from "../server.mjs";
import "vue";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/klona/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/hookable/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/unctx/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/radix3/dist/index.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/defu/dist/defu.mjs";
import "/Users/phurachanphowutthirat/repositories/claude/web_monorepo/node_modules/ufo/dist/index.mjs";
import "vue/server-renderer";
const authSimple = defineNuxtRouteMiddleware(async (to, from) => {
  if (!to.path.startsWith("/agency-cms/manage")) {
    return;
  }
  return;
});
export {
  authSimple as default
};
//# sourceMappingURL=auth-simple-BSt1E7f_.js.map
