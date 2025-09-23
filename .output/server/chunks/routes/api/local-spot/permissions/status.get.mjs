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

const status_get = defineEventHandler(async (event) => {
  try {
    await connectMongoDB();
    const totalPermissions = await Permission.countDocuments();
    const permissionsWithoutType = await Permission.find({
      $or: [
        { type: { $exists: false } },
        { type: null },
        { type: void 0 }
      ]
    }).select("_id name module action resource type");
    const invalidTypePermissions = await Permission.find({
      type: { $nin: ["menu", "action", "input"] }
    }).select("_id name module action resource type");
    const validTypeCount = await Permission.countDocuments({
      type: { $in: ["menu", "action", "input"] }
    });
    const typeCounts = await Permission.aggregate([
      {
        $match: {
          type: { $in: ["menu", "action", "input"] }
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      }
    ]);
    const needsMigration = permissionsWithoutType.length > 0 || invalidTypePermissions.length > 0;
    return createSuccessResponse({
      migration: {
        needed: needsMigration,
        permissionsNeedingUpdate: permissionsWithoutType.length + invalidTypePermissions.length
      },
      summary: {
        total: totalPermissions,
        withValidType: validTypeCount,
        withoutType: permissionsWithoutType.length,
        withInvalidType: invalidTypePermissions.length
      },
      typeCounts: typeCounts.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      details: {
        permissionsWithoutType,
        invalidTypePermissions
      }
    }, {
      additionalData: {
        message: needsMigration ? `Migration needed: ${permissionsWithoutType.length + invalidTypePermissions.length} permissions require type field updates` : "All permissions have valid type fields"
      }
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    console.error("Status check error:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map
