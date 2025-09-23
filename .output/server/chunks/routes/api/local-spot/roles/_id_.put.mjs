import { d as defineEventHandler, e as getHeader, a as getRouterParam, r as readBody } from '../../../../nitro/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
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
    const body = await readBody(event);
    const { name, description, permissions, isActive } = body;
    if (!id) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.INVALID_ROLE_ID]
      });
    }
    const existingRole = await Role.findById(id);
    if (!existingRole) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND);
    }
    if (name && name !== existingRole.name) {
      const nameExists = await Role.findOne({ name, _id: { $ne: id } });
      if (nameExists) {
        throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS);
      }
    }
    const updateData = {};
    if (name !== void 0) updateData.name = name;
    if (description !== void 0) updateData.description = description;
    if (permissions !== void 0) updateData.permissions = permissions;
    if (isActive !== void 0) updateData.isActive = isActive;
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return createSuccessResponse(updatedRole);
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

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
