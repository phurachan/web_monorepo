import { d as defineEventHandler, e as getHeader, a as getRouterParam, r as readBody } from '../../../../../nitro/nitro.mjs';
import mongoose from 'mongoose';
import Role from '../../../../../_/Role.mjs';
import User from '../../../../../_/User.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, b as createSuccessResponse } from '../../../../../_/mongodb.mjs';
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

const roles_put = defineEventHandler(async (event) => {
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
    const { roleIds } = body;
    if (!id) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS);
    }
    const user = await User.findById(id);
    if (!user) {
      throw createPredefinedError(API_RESPONSE_CODES.USER_NOT_FOUND);
    }
    if (roleIds && roleIds.length > 0) {
      const validRoleIds = roleIds.filter((id2) => id2 != null && id2 !== "");
      if (validRoleIds.length === 0) {
        const updatedUser3 = await User.findByIdAndUpdate(
          id,
          { roles: [] },
          { new: true, runValidators: true }
        ).populate("roles", "name description permissions isActive").lean();
        return createSuccessResponse(updatedUser3.roles || []);
      }
      const objectIds = validRoleIds.map((id2) => {
        if (mongoose.Types.ObjectId.isValid(id2)) {
          return new mongoose.Types.ObjectId(id2);
        }
        throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT);
      });
      const validRoles = await Role.countDocuments({
        _id: { $in: objectIds },
        isActive: true
      });
      if (validRoles !== validRoleIds.length) {
        throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT);
      }
      const updatedUser2 = await User.findByIdAndUpdate(
        id,
        { roles: objectIds },
        { new: true, runValidators: true }
      ).populate("roles", "name description permissions isActive").lean();
      return createSuccessResponse(updatedUser2.roles || []);
    }
    const rolesToAssign = [];
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { roles: rolesToAssign },
      { new: true, runValidators: true }
    ).populate("roles", "name description permissions isActive").lean();
    return createSuccessResponse(updatedUser.roles || []);
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED);
    }
    console.error("Error updating user roles:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { roles_put as default };
//# sourceMappingURL=roles.put.mjs.map
