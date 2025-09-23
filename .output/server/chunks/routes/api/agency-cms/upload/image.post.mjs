import { d as defineEventHandler, g as getCookie, c as createError, b as readMultipartFormData } from '../../../../nitro/nitro.mjs';
import { a as verifyToken } from '../../../../_/auth.mjs';
import { promises } from 'fs';
import { join } from 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'bcryptjs';
import 'jsonwebtoken';

const image_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "auth-token");
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  try {
    const form = await readMultipartFormData(event);
    if (!form || form.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "No file provided"
      });
    }
    const file = form[0];
    if (!file.filename || !file.data) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid file"
      });
    }
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type || "")) {
      throw createError({
        statusCode: 400,
        statusMessage: "Only image files are allowed (JPEG, PNG, GIF, WebP)"
      });
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: "File too large. Maximum size is 5MB"
      });
    }
    const timestamp = Date.now();
    const extension = file.filename.split(".").pop();
    const filename = `${timestamp}.${extension}`;
    const uploadsDir = join(process.cwd(), "public", "uploads");
    try {
      await promises.access(uploadsDir);
    } catch {
      await promises.mkdir(uploadsDir, { recursive: true });
    }
    const filePath = join(uploadsDir, filename);
    await promises.writeFile(filePath, file.data);
    const publicUrl = `/uploads/${filename}`;
    return {
      success: true,
      url: publicUrl,
      filename,
      size: file.data.length,
      type: file.type
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to upload image"
    });
  }
});

export { image_post as default };
//# sourceMappingURL=image.post.mjs.map
