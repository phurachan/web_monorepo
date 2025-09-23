import { d as defineEventHandler, e as getHeader, a as getRouterParam } from '../../../../nitro/nitro.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, b as createSuccessResponse } from '../../../../_/mongodb.mjs';
import User from '../../../../_/User.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import 'mongoose';
import 'bcryptjs';

const _id__delete = defineEventHandler(async (event) => {
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
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED);
    }
    if (currentUser.role !== "admin") {
      throw createPredefinedError(API_RESPONSE_CODES.FORBIDDEN);
    }
    const userId = getRouterParam(event, "id");
    if (!userId) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, "User ID is required");
    }
    if (userId === currentUser._id.toString()) {
      throw createPredefinedError(API_RESPONSE_CODES.DATA_USED, "Cannot delete your own account");
    }
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND, "User not found");
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isActive: false,
        deletedAt: /* @__PURE__ */ new Date(),
        deletedBy: currentUser._id
      },
      { new: true }
    ).select("_id name email isActive");
    return createSuccessResponse({
      id: updatedUser == null ? void 0 : updatedUser._id.toString(),
      name: updatedUser == null ? void 0 : updatedUser.name,
      email: updatedUser == null ? void 0 : updatedUser.email,
      isActive: updatedUser == null ? void 0 : updatedUser.isActive
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    console.error("Delete user error:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
