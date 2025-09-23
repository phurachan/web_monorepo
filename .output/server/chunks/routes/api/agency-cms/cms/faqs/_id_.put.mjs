import { d as defineEventHandler, g as getCookie, c as createError, a as getRouterParam, r as readBody } from '../../../../../nitro/nitro.mjs';
import { F as FAQHelper } from '../../../../../_/db-helpers.mjs';
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
    const faq = await FAQHelper.updateById(id, {
      question: body.question,
      answer: body.answer,
      order: body.order || 0,
      isActive: body.isActive !== false
    });
    if (!faq) {
      throw createError({
        statusCode: 404,
        statusMessage: "FAQ not found"
      });
    }
    return {
      ...faq,
      id: faq._id.toString()
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update FAQ"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
