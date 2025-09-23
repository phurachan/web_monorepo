function parseQuery(query) {
  var _a, _b;
  const parsedQuery = {
    pagination: {
      page: parseInt((_a = query["pagination[page]"]) != null ? _a : "1"),
      limit: parseInt((_b = query["pagination[limit]"]) != null ? _b : "50")
    },
    filter: {},
    search: query.search || ""
  };
  Object.keys(query).forEach((key) => {
    if (key.startsWith("filter[") && key.endsWith("]")) {
      let filterKey;
      if (key.endsWith("[]")) {
        filterKey = key.slice(7, -3);
      } else {
        filterKey = key.slice(7, -1);
      }
      let value = query[key];
      if (value === "true") value = true;
      if (value === "false") value = false;
      if (key.endsWith("[]")) {
        value = Array.isArray(value) ? value : [value];
      }
      parsedQuery.filter[filterKey] = value;
    }
  });
  return parsedQuery;
}
function buildMongoFilter(parsedQuery, allowedFields, searchFields) {
  const filter = {};
  if (parsedQuery.search) {
    const defaultSearchFields = searchFields || ["name", "email"];
    filter.$or = defaultSearchFields.map((field) => ({
      [field]: { $regex: parsedQuery.search, $options: "i" }
    }));
  }
  Object.keys(parsedQuery.filter).forEach((field) => {
    const handler = allowedFields[field];
    if (handler) {
      const fieldFilter = handler(parsedQuery.filter[field]);
      if (fieldFilter) {
        Object.assign(filter, fieldFilter);
      }
    } else {
      console.warn(`Filter field '${field}' is not allowed`);
    }
  });
  return filter;
}
const commonFieldHandlers = {
  /**
   * Boolean field handler
   */
  boolean: (field) => (value) => typeof value === "boolean" ? { [field]: value } : null,
  /**
   * String field handler (exact match)
   */
  string: (field) => (value) => typeof value === "string" && value.trim() ? { [field]: value.trim() } : null,
  /**
   * String or Array field handler (using $in for arrays)
   */
  stringOrArray: (field) => (value) => {
    if (typeof value === "string" && value.trim()) return { [field]: value.trim() };
    if (Array.isArray(value) && value.length > 0) return { [field]: { $in: value } };
    return null;
  },
  /**
   * Number field handler
   */
  number: (field) => (value) => {
    const num = typeof value === "string" ? parseInt(value) : value;
    return typeof num === "number" && !isNaN(num) ? { [field]: num } : null;
  },
  /**
   * Date field handler (accepts ISO strings)
   */
  date: (field) => (value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) ? { [field]: date } : null;
  },
  /**
   * ObjectId or Array field handler (for MongoDB ObjectId fields)
   * Note: Uses string comparison as fallback if ObjectId conversion fails
   */
  objectIdOrArray: (field) => (value) => {
    if (typeof value === "string" && value.trim()) {
      return { [field]: value.trim() };
    }
    if (Array.isArray(value) && value.length > 0) {
      return { [field]: { $in: value } };
    }
    return null;
  },
  /**
   * Date range handler (for fields like createdAt)
   */
  dateRange: (field) => (value) => {
    if (typeof value === "object" && value !== null) {
      const filter = {};
      if (value.from) {
        const fromDate = new Date(value.from);
        if (!isNaN(fromDate.getTime())) filter.$gte = fromDate;
      }
      if (value.to) {
        const toDate = new Date(value.to);
        if (!isNaN(toDate.getTime())) filter.$lte = toDate;
      }
      return Object.keys(filter).length > 0 ? { [field]: filter } : null;
    }
    return null;
  }
};
function parseQueryAndBuildFilter(query, allowedFields, searchFields) {
  const parsedQuery = parseQuery(query);
  const mongoFilter = buildMongoFilter(parsedQuery, allowedFields, searchFields);
  return { parsedQuery, mongoFilter };
}

const createUserFilterConfig = () => ({
  isActive: commonFieldHandlers.boolean("isActive"),
  role: commonFieldHandlers.stringOrArray("role"),
  roles: commonFieldHandlers.objectIdOrArray("roles"),
  department: commonFieldHandlers.string("department"),
  position: commonFieldHandlers.string("position"),
  emailVerified: commonFieldHandlers.boolean("emailVerified")
});
const createRoleFilterConfig = () => ({
  isActive: commonFieldHandlers.boolean("isActive"),
  name: commonFieldHandlers.string("name"),
  module: commonFieldHandlers.stringOrArray("module")
});
const createPermissionFilterConfig = () => ({
  isActive: commonFieldHandlers.boolean("isActive"),
  module: commonFieldHandlers.stringOrArray("module"),
  action: commonFieldHandlers.stringOrArray("action"),
  resource: commonFieldHandlers.string("resource"),
  type: commonFieldHandlers.stringOrArray("type")
});

export { createRoleFilterConfig as a, createUserFilterConfig as b, createPermissionFilterConfig as c, parseQueryAndBuildFilter as p };
//# sourceMappingURL=userManagement.mjs.map
