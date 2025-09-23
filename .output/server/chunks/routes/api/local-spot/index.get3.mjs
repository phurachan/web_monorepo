import { d as defineEventHandler, e as getHeader, h as getQuery } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, d as createPaginatedResponse } from '../../../_/mongodb.mjs';
import Role from '../../../_/Role.mjs';
import User from '../../../_/User.mjs';
import { p as parseQueryAndBuildFilter, a as createRoleFilterConfig } from '../../../_/userManagement.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import 'mongoose';
import 'bcryptjs';

const index_get = defineEventHandler(async (event) => {
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
    const query = getQuery(event);
    const { parsedQuery, mongoFilter } = parseQueryAndBuildFilter(
      query,
      createRoleFilterConfig(),
      ["name", "description"]
      // Custom search fields for roles
    );
    const { page, limit } = parsedQuery.pagination;
    const filter = mongoFilter;
    const total = await Role.countDocuments(filter);
    const roles = await Role.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit);
    return createPaginatedResponse(roles, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
