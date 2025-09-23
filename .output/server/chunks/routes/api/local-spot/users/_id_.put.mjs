import { d as defineEventHandler, e as getHeader, a as getRouterParam, r as readBody } from '../../../../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';
import User from '../../../../_/User.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../../_/jwt.mjs';
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
import 'jsonwebtoken';

const _id__put = defineEventHandler(async (event) => {
  await connectMongoDB();
  try {
    const authHeader = getHeader(event, "authorization");
    const token = extractTokenFromHeader(authHeader);
    if (!token) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED);
    }
    const decoded = verifyToken(token);
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser || !currentUser.isActive) {
      throw createPredefinedError(API_RESPONSE_CODES.USER_NOT_FOUND);
    }
    if (currentUser.role !== "admin") {
      throw createPredefinedError(API_RESPONSE_CODES.FORBIDDEN);
    }
    const userId = getRouterParam(event, "id");
    if (!userId) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        details: [VALIDATION_DETAILS.USER_ID_INVALID]
      });
    }
    const body = await readBody(event);
    const { name, email, department, position, isActive, password } = body;
    const errors = {};
    if (!name || !name.trim()) {
      errors.name = VALIDATION_DETAILS.FIELD_NAME_REQUIRED;
    }
    if (!email || !email.trim()) {
      errors.email = VALIDATION_DETAILS.FIELD_EMAIL_REQUIRED;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = VALIDATION_DETAILS.EMAIL_INVALID_FORMAT;
    }
    if (password && password.length < 6) {
      errors.password = VALIDATION_DETAILS.PASSWORD_MIN_6;
    }
    if (email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase().trim(),
        _id: { $ne: userId }
      });
      if (existingUser) {
        errors.email = VALIDATION_DETAILS.USER_EMAIL_DUPLICATE;
      }
    }
    if (Object.keys(errors).length > 0) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        details: ["email"],
        errors
      });
    }
    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND, {
        details: ["userId"]
      });
    }
    const updateData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      department: (department == null ? void 0 : department.trim()) || "",
      position: (position == null ? void 0 : position.trim()) || "",
      isActive: isActive !== false,
      // Default to true if not specified
      updatedAt: /* @__PURE__ */ new Date()
    };
    if (password && password.trim()) {
      updateData.password = await bcrypt.hash(password.trim(), 12);
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
        runValidators: true,
        select: "_id name email role department position avatar lastLogin emailVerified isActive"
      }
    ).populate("roles", "name description isActive");
    if (!updatedUser) {
      throw createPredefinedError(API_RESPONSE_CODES.USER_NOT_FOUND);
    }
    const transformedUser = {
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      department: updatedUser.department,
      position: updatedUser.position,
      avatar: updatedUser.avatar,
      lastLogin: updatedUser.lastLogin,
      emailVerified: updatedUser.emailVerified,
      isActive: updatedUser.isActive,
      roles: updatedUser.roles || []
    };
    return createSuccessResponse(transformedUser);
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    if (error.name === API_RESPONSE_CODES.VALIDATION_ERROR_EXCEPTION_NAME) {
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: errors
      });
    }
    if (error.code === 11e3) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS);
    }
    console.error("Update user error:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
