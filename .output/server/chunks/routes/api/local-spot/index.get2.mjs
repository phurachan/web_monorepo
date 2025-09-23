import { d as defineEventHandler, h as getQuery } from '../../../nitro/nitro.mjs';
import Permission from '../../../_/Permission.mjs';
import { p as parseQueryAndBuildFilter, c as createPermissionFilterConfig } from '../../../_/userManagement.mjs';
import { c as connectMongoDB, d as createPaginatedResponse, A as API_RESPONSE_CODES, a as createPredefinedError } from '../../../_/mongodb.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'mongoose';

const index_get = defineEventHandler(async (event) => {
  try {
    await connectMongoDB();
    const query = getQuery(event);
    const { parsedQuery, mongoFilter } = parseQueryAndBuildFilter(
      query,
      createPermissionFilterConfig(),
      ["name", "description", "module", "resource"]
      // Custom search fields for permissions
    );
    const { page, limit } = parsedQuery.pagination;
    const filter = mongoFilter;
    const total = await Permission.countDocuments(filter);
    const permissions = await Permission.find(filter).sort({ module: 1, action: 1 }).skip((page - 1) * limit).limit(limit);
    return createPaginatedResponse(permissions, {
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
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR);
  }
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
