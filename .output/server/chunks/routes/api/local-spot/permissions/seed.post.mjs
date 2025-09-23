import { d as defineEventHandler } from '../../../../nitro/nitro.mjs';
import Permission from '../../../../_/Permission.mjs';
import { c as connectMongoDB, b as createSuccessResponse, A as API_RESPONSE_CODES, a as createPredefinedError } from '../../../../_/mongodb.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongoose';

const seed_post = defineEventHandler(async (event) => {
  try {
    await connectMongoDB();
    const initialPermissions = [
      // Dashboard permissions
      {
        name: "dashboard.access",
        description: "Access to dashboard page",
        module: "dashboard",
        action: "access",
        resource: "dashboard",
        type: "menu",
        isActive: true
      },
      {
        name: "components.access",
        description: "Access to components page",
        module: "developer",
        action: "access",
        resource: "components",
        type: "menu",
        isActive: true
      },
      // Settings permissions
      {
        name: "user_management.access",
        description: "Access module",
        module: "user_management",
        action: "access",
        resource: "access",
        type: "menu",
        isActive: true
      },
      {
        name: "user_management.roles",
        description: "Manage roles and permissions",
        module: "user_management",
        action: "update",
        resource: "roles",
        type: "action",
        isActive: true
      },
      {
        name: "user_management.permissions",
        description: "Manage permissions",
        module: "user_management",
        action: "update",
        resource: "permissions",
        type: "action",
        isActive: true
      },
      {
        name: "user_management.users",
        description: "Assign roles to users",
        module: "user_management",
        action: "update",
        resource: "users",
        type: "action",
        isActive: true
      }
    ];
    let createdCount = 0;
    let skippedCount = 0;
    for (const permissionData of initialPermissions) {
      const existing = await Permission.findOne({ name: permissionData.name });
      if (!existing) {
        await Permission.create(permissionData);
        createdCount++;
      } else {
        skippedCount++;
      }
    }
    return createSuccessResponse({
      created: createdCount,
      skipped: skippedCount,
      total: initialPermissions.length
    }, {
      additionalData: {
        message: `Permissions seeded successfully. Created: ${createdCount}, Skipped: ${skippedCount}`
      }
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
