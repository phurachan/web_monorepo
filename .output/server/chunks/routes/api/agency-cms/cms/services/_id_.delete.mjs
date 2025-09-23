import { d as defineEventHandler, g as getCookie, c as createError, a as getRouterParam } from '../../../../../nitro/nitro.mjs';
import { S as ServiceHelper } from '../../../../../_/db-helpers.mjs';
import { a as verifyToken } from '../../../../../_/auth.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongodb';
import 'bcryptjs';
import 'jsonwebtoken';

const _id__delete = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const id = getRouterParam(event, "id");
  try {
    const deleted = await ServiceHelper.deleteById(id);
    if (!deleted) {
      throw createError({
        statusCode: 404,
        statusMessage: "Service not found"
      });
    }
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to delete service"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
