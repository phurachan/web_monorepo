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

const modules_get = defineEventHandler(async (event) => {
  try {
    await connectMongoDB();
    const modules = await Permission.distinct("module", { isActive: true });
    return createSuccessResponse(modules.sort());
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

export { modules_get as default };
//# sourceMappingURL=modules.get.mjs.map
