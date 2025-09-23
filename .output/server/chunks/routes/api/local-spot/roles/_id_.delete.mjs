import { d as defineEventHandler, e as getHeader, a as getRouterParam } from '../../../../nitro/nitro.mjs';
import Role from '../../../../_/Role.mjs';
import User from '../../../../_/User.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, V as VALIDATION_DETAILS, b as createSuccessResponse } from '../../../../_/mongodb.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  await connectMongoDB();
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED);
    }
    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser || !currentUser.isActive) {
      throw createPredefinedError(API_RESPONSE_CODES.USER_NOT_FOUND);
    }
    if (currentUser.role !== "admin") {
      throw createPredefinedError(API_RESPONSE_CODES.FORBIDDEN);
    }
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.INVALID_ROLE_ID]
      });
    }
    const role = await Role.findById(id);
    if (!role) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND);
    }
    const usersWithRole = await User.countDocuments({ roles: id });
    if (usersWithRole > 0) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        details: [VALIDATION_DETAILS.ROLE_IN_USE]
      });
    }
    await Role.findByIdAndDelete(id);
    return createSuccessResponse({});
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    console.error("Error deleting role:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
