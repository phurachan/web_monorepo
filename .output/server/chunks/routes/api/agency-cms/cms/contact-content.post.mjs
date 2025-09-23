import { d as defineEventHandler, g as getCookie, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import { c as ContentService, C as ContactContentHelper } from '../../../../_/db-helpers.mjs';
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

const contactContent_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  try {
    const body = await readBody(event);
    const contentData = {
      title: body.title,
      subtitle: body.subtitle,
      phone: body.phone,
      email: body.email,
      address: body.address,
      businessHours: body.businessHours || "{}",
      mapEmbedUrl: body.mapEmbedUrl || null,
      bannerImage: body.bannerImage || null,
      heroImage: body.heroImage || null
    };
    const existingContent = await ContentService.getContactContent();
    let result;
    if (existingContent) {
      result = await ContactContentHelper.updateById(existingContent._id, contentData);
    } else {
      result = await ContactContentHelper.create(contentData);
    }
    return {
      ...result,
      id: result._id.toString()
    };
  } catch (error) {
    console.error("Contact content save error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save contact content"
    });
  }
});

export { contactContent_post as default };
//# sourceMappingURL=contact-content.post.mjs.map
