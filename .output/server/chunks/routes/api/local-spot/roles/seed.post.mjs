import { d as defineEventHandler, e as getHeader } from '../../../../nitro/nitro.mjs';
import Role from '../../../../_/Role.mjs';
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

const seed_post = defineEventHandler(async (event) => {
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
    const existingRolesCount = await Role.countDocuments();
    if (existingRolesCount > 0) {
      return createSuccessResponse({
        count: existingRolesCount
      }, { responseType: API_RESPONSE_CODES.ALREADY_EXISTS });
    }
    const initialRoles = [
      {
        name: "Admin",
        description: "Full system access",
        permissions: [
          "dashboard.access",
          "components.access",
          "user_management.access",
          "user_management.users",
          "user_management.roles",
          "user_management.permissions"
        ],
        isActive: true,
        createdBy: "system"
      }
    ];
    let created = 0;
    let skipped = 0;
    for (const roleData of initialRoles) {
      const existingRole = await Role.findOne({ name: roleData.name });
      if (!existingRole) {
        const role = new Role(roleData);
        await role.save();
        created++;
      } else {
        skipped++;
      }
    }
    return createSuccessResponse({
      created,
      skipped,
      total: created + skipped
    });
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
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { seed_post as default };
//# sourceMappingURL=seed.post.mjs.map
