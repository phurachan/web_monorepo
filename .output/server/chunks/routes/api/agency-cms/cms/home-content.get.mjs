import { d as defineEventHandler, c as createError } from '../../../../nitro/nitro.mjs';
import { c as ContentService } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongodb';

const homeContent_get = defineEventHandler(async (event) => {
  try {
    const content = await ContentService.getHomeContent();
    return content ? {
      ...content,
      id: content._id.toString()
    } : content;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch home content"
    });
  }
});

export { homeContent_get as default };
//# sourceMappingURL=home-content.get.mjs.map
