import { d as defineEventHandler, r as readBody } from '../../../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';
import User from '../../../_/User.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, V as VALIDATION_DETAILS, b as createSuccessResponse } from '../../../_/mongodb.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongoose';

const index_post = defineEventHandler(async (event) => {
  await connectMongoDB();
  try {
    const body = await readBody(event);
    if (!body.name || !body.email || !body.password) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_NAME_REQUIRED, VALIDATION_DETAILS.FIELD_EMAIL_REQUIRED, VALIDATION_DETAILS.FIELD_PASSWORD_REQUIRED]
      });
    }
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw createPredefinedError(API_RESPONSE_CODES.USER_ALREADY_EXISTS, {
        details: [VALIDATION_DETAILS.USER_EMAIL_DUPLICATE]
      });
    }
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    const userData = {
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      password: hashedPassword,
      role: body.role || "user",
      // Default to 'user' role
      department: body.department || "",
      position: body.position || "",
      isActive: body.isActive !== void 0 ? body.isActive : true,
      avatar: body.avatar || null,
      roles: body.roles || [],
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    const newUser = new User(userData);
    const savedUser = await newUser.save();
    await savedUser.populate("roles", "name description permissions isActive");
    const userResponse = {
      id: savedUser._id.toString(),
      name: savedUser.name,
      email: savedUser.email,
      role: savedUser.role,
      department: savedUser.department,
      position: savedUser.position,
      avatar: savedUser.avatar,
      isActive: savedUser.isActive,
      roles: savedUser.roles || [],
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt
    };
    return createSuccessResponse(userResponse);
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    if (error.name === API_RESPONSE_CODES.VALIDATION_ERROR_EXCEPTION_NAME) {
      console.log(error);
      const fieldErrors = Object.keys(error.errors);
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: fieldErrors
      });
    }
    if (error.code === 11e3) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS);
    }
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
