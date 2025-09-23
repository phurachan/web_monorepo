import { d as defineEventHandler, g as getCookie, c as createError, r as readBody } from '../../../../nitro/nitro.mjs';
import { c as ContentService, b as SiteSettingsHelper } from '../../../../_/db-helpers.mjs';
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

const siteSettings_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  try {
    const body = await readBody(event);
    const settingsData = {
      siteName: body.siteName,
      siteTagline: body.siteTagline,
      logo: body.logo || null,
      favicon: body.favicon || null,
      primaryColor: body.primaryColor || "#6495ed",
      secondaryColor: body.secondaryColor || "#9333ea",
      socialLinks: body.socialLinks || "{}",
      metaDescription: body.metaDescription || "",
      keywords: body.keywords || "",
      contactEmail: body.contactEmail || "",
      contactPhone: body.contactPhone || ""
    };
    const existingSettings = await ContentService.getSiteSettings();
    let result;
    if (existingSettings) {
      result = await SiteSettingsHelper.updateById(existingSettings._id, settingsData);
    } else {
      result = await SiteSettingsHelper.create(settingsData);
    }
    return {
      ...result,
      id: result._id.toString()
    };
  } catch (error) {
    console.error("Site settings save error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to save site settings"
    });
  }
});

export { siteSettings_post as default };
//# sourceMappingURL=site-settings.post.mjs.map
