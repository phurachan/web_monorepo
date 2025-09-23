import { d as defineEventHandler, g as getCookie, c as createError, a as getRouterParam, r as readBody } from '../../../../../nitro/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const id = getRouterParam(event, "id");
  const body = await readBody(event);
  try {
    const service = await ServiceHelper.updateById(id, {
      title: body.title,
      description: body.description,
      icon: body.icon || "",
      image: body.image || null,
      color: body.color || "#6495ed",
      features: JSON.stringify(body.features || []),
      order: body.order || 0,
      isActive: body.isActive !== false
    });
    if (!service) {
      throw createError({
        statusCode: 404,
        statusMessage: "Service not found"
      });
    }
    return {
      ...service,
      id: service._id.toString(),
      features: JSON.parse(service.features || "[]")
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update service"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
