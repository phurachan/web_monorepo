import { d as defineEventHandler, a as getRouterParam, r as readBody } from '../../../../nitro/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  try {
    await connectMongoDB();
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const { name, description, module, action, resource, type, isActive } = body;
    if (!id) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.INVALID_PERMISSION_ID]
      });
    }
    const existingPermission = await Permission.findById(id);
    if (!existingPermission) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND);
    }
    if (name && name !== existingPermission.name) {
      const nameExists = await Permission.findOne({ name, _id: { $ne: id } });
      if (nameExists) {
        throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS);
      }
    }
    const updateData = {};
    if (name !== void 0) updateData.name = name;
    if (description !== void 0) updateData.description = description;
    if (module !== void 0) updateData.module = module;
    if (action !== void 0) updateData.action = action;
    if (resource !== void 0) updateData.resource = resource;
    if (type !== void 0) updateData.type = type;
    if (isActive !== void 0) updateData.isActive = isActive;
    const updatedPermission = await Permission.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return createSuccessResponse(updatedPermission);
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
