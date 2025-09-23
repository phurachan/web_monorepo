import { d as defineEventHandler, g as getCookie, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import { c as ContentService, H as HomeContentHelper } from '../../../../_/db-helpers.mjs';
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

const homeContent_post = defineEventHandler(async (event) => {
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
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImage: body.heroImage || null,
      featureTitle: body.featureTitle,
      featureDescription: body.featureDescription,
      featureImage: body.featureImage || null,
      ctaText: body.ctaText,
      ctaButtonText: body.ctaButtonText,
      aboutTitle: body.aboutTitle,
      aboutDescription: body.aboutDescription,
      aboutImage: body.aboutImage || null,
      peopleTitle: body.peopleTitle,
      peopleDescription: body.peopleDescription
    };
    const existingContent = await ContentService.getHomeContent();
    let result;
    if (existingContent) {
      result = await HomeContentHelper.updateById(existingContent._id, contentData);
    } else {
      result = await HomeContentHelper.create(contentData);
    }
    return {
      ...result,
      id: result._id.toString()
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save home content"
    });
  }
});

export { homeContent_post as default };
//# sourceMappingURL=home-content.post.mjs.map
