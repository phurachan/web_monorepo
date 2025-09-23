import { d as defineEventHandler, r as readBody, s as setCookie } from '../../../../nitro/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  await connectMongoDB();
  try {
    const body = await readBody(event);
    const { email, password } = body;
    if (!email || !password) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_EMAIL_REQUIRED, VALIDATION_DETAILS.FIELD_PASSWORD_REQUIRED]
      });
    }
    const user = await User.findOne({ email }).populate("roles", "name description permissions isActive");
    if (!user) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_CREDENTIALS);
    }
    if (!user.isActive) {
      throw createPredefinedError(API_RESPONSE_CODES.ACCOUNT_DEACTIVATED);
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_CREDENTIALS);
    }
    user.lastLogin = /* @__PURE__ */ new Date();
    await user.save();
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });
    setCookie(event, "token", token, {
      secure: false,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      // 7 days
      sameSite: "lax"
    });
    setCookie(event, "user", JSON.stringify({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position,
      avatar: user.avatar,
      roles: user.roles || []
    }), {
      secure: false,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7,
      // 7 days
      sameSite: "lax"
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
        avatar: user.avatar,
        roles: user.roles || []
      }
    }, { responseType: API_RESPONSE_CODES.LOGIN_SUCCESS });
  } catch (error) {
    console.error("Login error:", error);
    if (error.statusCode) {
      throw error;
    }
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
