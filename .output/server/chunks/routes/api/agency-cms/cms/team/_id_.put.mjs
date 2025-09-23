import { d as defineEventHandler, g as getCookie, c as createError, a as getRouterParam, r as readBody } from '../../../../../nitro/nitro.mjs';
import { g as TeamMemberHelper } from '../../../../../_/db-helpers.mjs';
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
  try {
    const id = getRouterParam(event, "id");
    const body = await readBody(event);
    const teamMember = await TeamMemberHelper.updateById(id, {
      name: body.name,
      position: body.position,
      description: body.description,
      image: body.image || null,
      email: body.email || null,
      linkedin: body.linkedin || null,
      twitter: body.twitter || null,
      order: body.order || 0,
      isActive: body.isActive !== false
    });
    if (!teamMember) {
      throw createError({
        statusCode: 404,
        statusMessage: "Team member not found"
      });
    }
    return {
      ...teamMember,
      id: teamMember._id.toString()
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update team member"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
