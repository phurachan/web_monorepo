import { d as defineEventHandler, g as getCookie, p as parseCookies, c as createError } from '../../../../nitro/nitro.mjs';
import { a as verifyToken } from '../../../../_/auth.mjs';
import { a as UserHelper } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'bcryptjs';
import 'jsonwebtoken';
import 'mongodb';

const me_get = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");
  const allCookies = parseCookies(event);
  console.log("Auth me endpoint called");
  console.log("All cookies:", Object.keys(allCookies));
  console.log("Auth token present:", !!token);
  console.log("Auth token length:", (token == null ? void 0 : token.length) || 0);
  if (!token) {
    console.log("No auth token found in cookies");
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    console.log("Token verification failed");
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid token"
    });
  }
  try {
    const user = await UserHelper.findById(decoded.userId);
    if (!user) {
      console.log("User not found in database for ID:", decoded.userId);
      throw createError({
        statusCode: 404,
        statusMessage: "User not found"
      });
    }
    console.log("Auth me endpoint: returning user data for:", user.email);
    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  } catch (error) {
    console.log("Database error in auth me:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error"
    });
  }
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
