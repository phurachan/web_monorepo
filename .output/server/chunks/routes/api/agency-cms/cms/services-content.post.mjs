import { d as defineEventHandler, r as readBody, c as createError } from '../../../../nitro/nitro.mjs';
import { c as ContentService, d as ServicesContentHelper } from '../../../../_/db-helpers.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongodb';

const servicesContent_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const contentData = {
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImage: body.heroImage
    };
    const existingContent = await ContentService.getServicesContent();
    let result;
    if (existingContent) {
      result = await ServicesContentHelper.updateById(existingContent._id, contentData);
    } else {
      result = await ServicesContentHelper.create(contentData);
    }
    return {
      ...result,
      id: result._id.toString()
    };
  } catch (error) {
    console.error("Error saving services content:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save services content"
    });
  }
});

export { servicesContent_post as default };
//# sourceMappingURL=services-content.post.mjs.map
