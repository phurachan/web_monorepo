import { d as defineEventHandler, s as setCookie } from '../../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const logout_post = defineEventHandler(async (event) => {
  setCookie(event, "auth-token", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  setCookie(event, "auth-status", "", {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  console.log("Logout: Cookies cleared");
  return { success: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
