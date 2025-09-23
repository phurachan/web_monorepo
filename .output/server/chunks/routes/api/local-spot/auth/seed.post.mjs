import { d as defineEventHandler } from '../../../../nitro/nitro.mjs';
import Role from '../../../../_/Role.mjs';
import User from '../../../../_/User.mjs';
import { c as connectMongoDB, b as createSuccessResponse, a as createPredefinedError, A as API_RESPONSE_CODES } from '../../../../_/mongodb.mjs';
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

const seed_post = defineEventHandler(async (event) => {
  await connectMongoDB();
  try {
    const existingUsersCount = await User.countDocuments();
    if (existingUsersCount > 0) {
      return createSuccessResponse({
        count: existingUsersCount
      });
    }
    const defaultUsers = [
      {
        name: "System Administrator",
        email: "admin@moonoi.com",
        password: "admin123",
        role: "admin",
        department: "IT",
        position: "System Administrator",
        isActive: true,
        emailVerified: true
      }
    ];
    const adminRole = await Role.findOne({ name: "Admin" });
    const createdUsers = [];
    for (const userData of defaultUsers) {
      const user = new User(userData);
      if (userData.role === "admin" && adminRole) {
        user.roles = [adminRole._id];
      }
      await user.save();
      createdUsers.push(user);
    }
    return createSuccessResponse({
      count: createdUsers.length,
      users: createdUsers.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        position: user.position
      }))
    });
  } catch (error) {
    console.error("Seed users error:", error);
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { seed_post as default };
//# sourceMappingURL=seed.post.mjs.map
