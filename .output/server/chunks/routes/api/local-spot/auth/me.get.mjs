import { d as defineEventHandler, e as getHeader } from '../../../../nitro/nitro.mjs';
import User from '../../../../_/User.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES } from '../../../../_/mongodb.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongoose';
import 'bcryptjs';
import 'jsonwebtoken';

const me_get = defineEventHandler(async (event) => {
  await connectMongoDB();
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED);
    }
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).populate("roles", "name description permissions isActive");
    if (!user || !user.isActive) {
      throw createPredefinedError(API_RESPONSE_CODES.USER_NOT_FOUND);
    }
    return createSuccessResponse({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position,
      avatar: user.avatar,
      lastLogin: user.lastLogin,
      emailVerified: user.emailVerified,
      roles: user.roles || []
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    console.error("Get user error:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
