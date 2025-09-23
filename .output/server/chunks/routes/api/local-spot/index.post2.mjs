import { d as defineEventHandler, e as getHeader, r as readBody } from '../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, V as VALIDATION_DETAILS, b as createSuccessResponse } from '../../../_/mongodb.mjs';
import Role from '../../../_/Role.mjs';
import User from '../../../_/User.mjs';
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

const index_post = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const { name, description, permissions, createdBy } = body;
    if (!name || !description || !createdBy) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_NAME_REQUIRED, VALIDATION_DETAILS.FIELD_DESCRIPTION_REQUIRED, VALIDATION_DETAILS.FIELD_NAME_REQUIRED]
      });
    }
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS);
    }
    const role = new Role({
      name,
      description,
      permissions: permissions || [],
      createdBy,
      isActive: true
    });
    await role.save();
    return createSuccessResponse(role);
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    if (error.name === API_RESPONSE_CODES.VALIDATION_ERROR_EXCEPTION_NAME) {
      const fieldErrors = Object.keys(error.errors);
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: fieldErrors
      });
    }
    if (error.code === 11e3) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS);
    }
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { index_post as default };
//# sourceMappingURL=index.post2.mjs.map
