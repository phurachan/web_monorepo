import { d as defineEventHandler, g as getCookie, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import { c as ContentService, A as AboutContentHelper } from '../../../../_/db-helpers.mjs';
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

const aboutContent_post = defineEventHandler(async (event) => {
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
      missionTitle: body.missionTitle,
      missionText: body.missionText,
      visionTitle: body.visionTitle,
      visionText: body.visionText,
      valuesTitle: body.valuesTitle,
      valuesText: body.valuesText,
      historyTitle: body.historyTitle,
      historyText: body.historyText,
      missionImage: body.missionImage || null,
      heroImage: body.heroImage || null,
      // Statistics
      happyClientsCount: body.happyClientsCount || "500+",
      happyClientsLabel: body.happyClientsLabel || "Happy Clients",
      experienceCount: body.experienceCount || "10+",
      experienceLabel: body.experienceLabel || "Years Experience",
      // Dynamic arrays
      visionItems: body.visionItems || "[]",
      valuesItems: body.valuesItems || "[]",
      journeyItems: body.journeyItems || "[]"
    };
    const existingContent = await ContentService.getAboutContent();
    let result;
    if (existingContent) {
      result = await AboutContentHelper.updateById(existingContent._id, contentData);
    } else {
      result = await AboutContentHelper.create(contentData);
    }
    return {
      ...result,
      id: result._id.toString()
    };
  } catch (error) {
    console.error("About content save error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save about content"
    });
  }
});

export { aboutContent_post as default };
//# sourceMappingURL=about-content.post.mjs.map
