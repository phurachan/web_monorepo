import { d as defineEventHandler, e as getHeader, a as getRouterParam } from '../../../../nitro/nitro.mjs';
import User from '../../../../_/User.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, b as createSuccessResponse } from '../../../../_/mongodb.mjs';
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

const _id__get = defineEventHandler(async (event) => {
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
    const userId = getRouterParam(event, "id");
    if (!userId) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_USER_ID);
    }
    if (currentUser.role !== "admin" && currentUser._id.toString() !== userId) {
      throw createPredefinedError(API_RESPONSE_CODES.FORBIDDEN);
    }
    const user = await User.findById(userId).populate("roles", "name description isActive").select("_id name email role department position avatar lastLogin emailVerified isActive roles createdAt updatedAt").lean();
    if (!user) {
      throw createPredefinedError(API_RESPONSE_CODES.USER_NOT_FOUND);
    }
    const transformedUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position,
      avatar: user.avatar,
      lastLogin: user.lastLogin,
      emailVerified: user.emailVerified,
      isActive: user.isActive,
      roles: user.roles || [],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    return createSuccessResponse(transformedUser);
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

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
