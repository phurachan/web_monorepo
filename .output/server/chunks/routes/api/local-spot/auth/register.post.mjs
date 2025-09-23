import { d as defineEventHandler, r as readBody } from '../../../../nitro/nitro.mjs';
import User from '../../../../_/User.mjs';
import { s as signToken } from '../../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, V as VALIDATION_DETAILS, b as createSuccessResponse } from '../../../../_/mongodb.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongoose';
import 'bcryptjs';
import 'jsonwebtoken';

const register_post = defineEventHandler(async (event) => {
  var _a;
  await connectMongoDB();
  try {
    const body = await readBody(event);
    const { name, email, password, department, position, role = "user" } = body;
    if (!name || !email || !password) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_NAME_REQUIRED, VALIDATION_DETAILS.FIELD_EMAIL_REQUIRED, VALIDATION_DETAILS.FIELD_PASSWORD_REQUIRED]
      });
    }
    if (password.length < 6) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        details: [VALIDATION_DETAILS.PASSWORD_MIN_6]
      });
    }
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS, {
        details: [VALIDATION_DETAILS.USER_EMAIL_DUPLICATE]
      });
    }
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      department: department == null ? void 0 : department.trim(),
      position: position == null ? void 0 : position.trim(),
      role,
      emailVerified: false
    });
    await user.save();
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });
    return createSuccessResponse({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        position: user.position,
        avatar: user.avatar
      }
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.code === 11e3) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS, {
        details: [VALIDATION_DETAILS.USER_EMAIL_DUPLICATE]
      });
    }
    if (error.name === API_RESPONSE_CODES.VALIDATION_ERROR_EXCEPTION_NAME) {
      const message = ((_a = Object.values(error.errors)[0]) == null ? void 0 : _a.message) || "Validation error";
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        details: [message]
      });
    }
    console.error("Registration error:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR, {
      details: [(error == null ? void 0 : error.message) || "Internal server error"]
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
