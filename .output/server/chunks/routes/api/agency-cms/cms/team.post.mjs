import { d as defineEventHandler, g as getCookie, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import { g as TeamMemberHelper } from '../../../../_/db-helpers.mjs';
import { a as verifyToken } from '../../../../_/auth.mjs';
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

const team_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  try {
    const body = await readBody(event);
    const teamMember = await TeamMemberHelper.create({
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
    return {
      ...teamMember,
      id: teamMember._id.toString()
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create team member"
    });
  }
});

export { team_post as default };
//# sourceMappingURL=team.post.mjs.map
