import { d as defineEventHandler, e as getHeader, h as getQuery } from '../../../nitro/nitro.mjs';
import User from '../../../_/User.mjs';
import { p as parseQueryAndBuildFilter, b as createUserFilterConfig } from '../../../_/userManagement.mjs';
import { e as extractTokenFromHeader, v as verifyToken } from '../../../_/jwt.mjs';
import { c as connectMongoDB, a as createPredefinedError, A as API_RESPONSE_CODES, d as createPaginatedResponse } from '../../../_/mongodb.mjs';
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

const index_get = defineEventHandler(async (event) => {
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
    const query = getQuery(event);
    const { parsedQuery, mongoFilter } = parseQueryAndBuildFilter(
      query,
      createUserFilterConfig()
    );
    const { page, limit } = parsedQuery.pagination;
    let filter = mongoFilter;
    if (filter.roles && typeof filter.roles === "string") {
      try {
        filter.roles = new (await import('mongoose')).Types.ObjectId(filter.roles);
      } catch (error) {
        console.warn("Invalid ObjectId for roles filter:", filter.roles);
        delete filter.roles;
      }
    } else if (filter.roles && filter.roles.$in && Array.isArray(filter.roles.$in)) {
      try {
        const mongoose = await import('mongoose');
        filter.roles.$in = filter.roles.$in.map((id) => new mongoose.Types.ObjectId(id));
      } catch (error) {
        console.warn("Invalid ObjectId in roles filter array:", filter.roles.$in);
        delete filter.roles;
      }
    }
    const total = await User.countDocuments(filter);
    const users = await User.find(filter).populate("roles", "name description isActive").select("_id name email role department position avatar lastLogin emailVerified isActive roles").sort({ name: 1 }).skip((page - 1) * limit).limit(limit).lean();
    const transformedUsers = users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position,
      avatar: user.avatar,
      lastLogin: user.lastLogin,
      emailVerified: user.emailVerified,
      isActive: user.isActive,
      roles: user.roles ? user.roles.map((role) => ({
        id: role._id.toString(),
        name: role.name,
        description: role.description,
        isActive: role.isActive
      })) : []
    }));
    return createPaginatedResponse(transformedUsers, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED);
    }
    console.error("Get users error:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
