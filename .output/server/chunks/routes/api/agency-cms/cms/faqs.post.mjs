import { d as defineEventHandler, g as getCookie, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import { F as FAQHelper } from '../../../../_/db-helpers.mjs';
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

const faqs_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  try {
    const body = await readBody(event);
    const faq = await FAQHelper.create({
      question: body.question,
      answer: body.answer,
      order: body.order || 0,
      isActive: body.isActive !== false
    });
    return {
      ...faq,
      id: faq._id.toString()
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create FAQ"
    });
  }
});

export { faqs_post as default };
//# sourceMappingURL=faqs.post.mjs.map
