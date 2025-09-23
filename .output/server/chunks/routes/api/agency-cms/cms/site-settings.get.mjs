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

const siteSettings_get = defineEventHandler(async (event) => {
  try {
    const settings = await ContentService.getSiteSettings();
    if (settings && settings.socialLinks) {
      return {
        ...settings,
        id: settings._id.toString(),
        socialLinks: JSON.parse(settings.socialLinks)
      };
    }
    return settings ? {
      ...settings,
      id: settings._id.toString()
    } : settings;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to fetch site settings"
    });
  }
});

export { siteSettings_get as default };
//# sourceMappingURL=site-settings.get.mjs.map
