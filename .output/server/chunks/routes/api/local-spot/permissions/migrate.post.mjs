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

const migrate_post = defineEventHandler(async (event) => {
  try {
    await connectMongoDB();
    const permissionsWithoutType = await Permission.find({
      $or: [
        { type: { $exists: false } },
        { type: null },
        { type: void 0 }
      ]
    });
    let updatedCount = 0;
    for (const permission of permissionsWithoutType) {
      await Permission.findByIdAndUpdate(
        permission._id,
        {
          $set: {
            type: "action"
            // Set default value as 'action'
          }
        },
        { runValidators: false }
        // Skip validation since we're just adding the missing field
      );
      updatedCount++;
    }
    const invalidTypePermissions = await Permission.find({
      type: { $nin: ["menu", "action", "input"] }
    });
    for (const permission of invalidTypePermissions) {
      await Permission.findByIdAndUpdate(
        permission._id,
        {
          $set: {
            type: "action"
            // Set default value as 'action' for invalid types
          }
        },
        { runValidators: false }
      );
      updatedCount++;
    }
    const totalPermissions = await Permission.countDocuments();
    const validTypeCount = await Permission.countDocuments({
      type: { $in: ["menu", "action", "input"] }
    });
    const migrationStatus = {
      updated: updatedCount,
      totalPermissions,
      permissionsWithValidType: validTypeCount,
      migrationComplete: totalPermissions === validTypeCount
    };
    return createSuccessResponse(migrationStatus, {
      additionalData: {
        message: `Migration completed successfully. Updated ${updatedCount} permissions with default type 'action'.`
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
    console.error("Migration error:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { migrate_post as default };
//# sourceMappingURL=migrate.post.mjs.map
