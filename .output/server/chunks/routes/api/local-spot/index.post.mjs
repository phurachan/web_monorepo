import { d as defineEventHandler, r as readBody } from '../../../nitro/nitro.mjs';
import Permission from '../../../_/Permission.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, b as createSuccessResponse } from '../../../_/mongodb.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongoose';

const index_post = defineEventHandler(async (event) => {
  try {
    await connectMongoDB();
    const body = await readBody(event);
    const { name, description, module, action, resource, type } = body;
    if (!name || !description || !module || !action || !resource) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        details: ["name", "description", "module", "action", "resource"]
      });
    }
    const existingPermission = await Permission.findOne({ name });
    if (existingPermission) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS, {
        details: ["name"]
      });
    }
    const permission = new Permission({
      name,
      description,
      module,
      action,
      resource,
      type: type || "action",
      // Use provided type or default to 'action'
      isActive: true
    });
    await permission.save();
    return createSuccessResponse(permission);
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
//# sourceMappingURL=index.post.mjs.map
