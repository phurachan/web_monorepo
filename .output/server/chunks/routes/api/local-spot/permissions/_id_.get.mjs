import { d as defineEventHandler, a as getRouterParam } from '../../../../nitro/nitro.mjs';
import Permission from '../../../../_/Permission.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  try {
    await connectMongoDB();
    const id = getRouterParam(event, "id");
    if (!id) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.INVALID_PERMISSION_ID]
      });
    }
    const permission = await Permission.findById(id);
    if (!permission) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND);
    }
    return createSuccessResponse(permission);
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

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
