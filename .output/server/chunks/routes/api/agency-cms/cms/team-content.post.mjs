import { d as defineEventHandler, r as readBody, c as createError } from '../../../../nitro/nitro.mjs';
import { c as ContentService, T as TeamContentHelper } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongodb';

const teamContent_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const contentData = {
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImage: body.heroImage
    };
    const existingContent = await ContentService.getTeamContent();
    let result;
    if (existingContent) {
      result = await TeamContentHelper.updateById(existingContent._id, contentData);
    } else {
      result = await TeamContentHelper.create(contentData);
    }
    return {
      ...result,
      id: result._id.toString()
    };
  } catch (error) {
    console.error("Error saving team content:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save team content"
    });
  }
});

export { teamContent_post as default };
//# sourceMappingURL=team-content.post.mjs.map
