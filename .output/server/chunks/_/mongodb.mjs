import { c as createError } from '../nitro/nitro.mjs';
import mongoose from 'mongoose';

const MODEL_VALIDATION_MESSAGES = {
  // User Model Validation
  USER_NAME_REQUIRED: "USER_NAME_REQUIRED",
  USER_EMAIL_REQUIRED: "USER_EMAIL_REQUIRED",
  USER_PASSWORD_REQUIRED: "USER_PASSWORD_REQUIRED",
  USER_ROLE_REQUIRED: "USER_ROLE_REQUIRED",
  // User Field Length Validation
  USER_NAME_MAX_LENGTH: "USER_NAME_MAX_LENGTH",
  USER_PASSWORD_MIN_LENGTH: "USER_PASSWORD_MIN_LENGTH",
  USER_DEPARTMENT_MAX_LENGTH: "USER_DEPARTMENT_MAX_LENGTH",
  USER_POSITION_MAX_LENGTH: "USER_POSITION_MAX_LENGTH",
  USER_PHONE_MAX_LENGTH: "USER_PHONE_MAX_LENGTH",
  USER_WEBSITE_MAX_LENGTH: "USER_WEBSITE_MAX_LENGTH",
  // User Field Format Validation
  USER_EMAIL_INVALID_FORMAT: "USER_EMAIL_INVALID_FORMAT",
  // Role Model Validation
  ROLE_NAME_REQUIRED: "ROLE_NAME_REQUIRED",
  ROLE_DESCRIPTION_REQUIRED: "ROLE_DESCRIPTION_REQUIRED",
  ROLE_NAME_MAX_LENGTH: "ROLE_NAME_MAX_LENGTH",
  ROLE_DESCRIPTION_MAX_LENGTH: "ROLE_DESCRIPTION_MAX_LENGTH",
  // Permission Model Validation
  PERMISSION_NAME_REQUIRED: "PERMISSION_NAME_REQUIRED",
  PERMISSION_DESCRIPTION_REQUIRED: "PERMISSION_DESCRIPTION_REQUIRED",
  PERMISSION_MODULE_REQUIRED: "PERMISSION_MODULE_REQUIRED",
  PERMISSION_ACTION_REQUIRED: "PERMISSION_ACTION_REQUIRED",
  PERMISSION_RESOURCE_REQUIRED: "PERMISSION_RESOURCE_REQUIRED",
  PERMISSION_TYPE_REQUIRED: "PERMISSION_TYPE_REQUIRED",
  // Permission Field Length Validation
  PERMISSION_NAME_MAX_LENGTH: "PERMISSION_NAME_MAX_LENGTH",
  PERMISSION_DESCRIPTION_MAX_LENGTH: "PERMISSION_DESCRIPTION_MAX_LENGTH",
  PERMISSION_MODULE_MAX_LENGTH: "PERMISSION_MODULE_MAX_LENGTH",
  PERMISSION_RESOURCE_MAX_LENGTH: "PERMISSION_RESOURCE_MAX_LENGTH"};

const HTTP_STATUS = {
  // Success
  OK: 200,
  // Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  // Server Errors
  INTERNAL_SERVER_ERROR: 500};
const API_RESPONSE_MESSAGES = {
  // Authentication & Authorization
  INVALID_CREDENTIALS: {
    th: "\u0E2D\u0E35\u0E40\u0E21\u0E25\u0E2B\u0E23\u0E37\u0E2D\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E48\u0E32\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    en: "Invalid email or password"
  },
  UNAUTHORIZED: {
    th: "\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E15\u0E49\u0E2D\u0E07\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A",
    en: "Authentication required"
  },
  FORBIDDEN: {
    th: "\u0E01\u0E32\u0E23\u0E40\u0E02\u0E49\u0E32\u0E16\u0E36\u0E07\u0E16\u0E39\u0E01\u0E1B\u0E0F\u0E34\u0E40\u0E2A\u0E18 \u0E44\u0E21\u0E48\u0E21\u0E35\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E40\u0E1E\u0E35\u0E22\u0E07\u0E1E\u0E2D",
    en: "Access denied. Insufficient permissions"
  },
  TOKEN_EXPIRED: {
    th: "\u0E42\u0E17\u0E40\u0E04\u0E47\u0E19\u0E01\u0E32\u0E23\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19\u0E15\u0E31\u0E27\u0E15\u0E19\u0E2B\u0E21\u0E14\u0E2D\u0E32\u0E22\u0E38\u0E41\u0E25\u0E49\u0E27",
    en: "Authentication token has expired"
  },
  ACCOUNT_DEACTIVATED: {
    th: "\u0E1A\u0E31\u0E0D\u0E0A\u0E35\u0E16\u0E39\u0E01\u0E1B\u0E34\u0E14\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    en: "Account has been deactivated"
  },
  // Validation
  VALIDATION_ERROR: {
    th: "\u0E01\u0E32\u0E23\u0E15\u0E23\u0E27\u0E08\u0E2A\u0E2D\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27",
    en: "Validation failed"
  },
  MISSING_REQUIRED_FIELDS: {
    th: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E08\u0E33\u0E40\u0E1B\u0E47\u0E19\u0E02\u0E32\u0E14\u0E2B\u0E32\u0E22\u0E44\u0E1B",
    en: "Required fields are missing"
  },
  INVALID_INPUT: {
    th: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    en: "Invalid input provided"
  },
  // Resource Management
  NOT_FOUND: {
    th: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E23\u0E49\u0E2D\u0E07\u0E02\u0E2D",
    en: "Resource not found"
  },
  ALREADY_EXISTS: {
    th: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E21\u0E35\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27",
    en: "Resource already exists"
  },
  // Server Errors
  INTERNAL_ERROR: {
    th: "\u0E40\u0E01\u0E34\u0E14\u0E02\u0E49\u0E2D\u0E1C\u0E34\u0E14\u0E1E\u0E25\u0E32\u0E14\u0E20\u0E32\u0E22\u0E43\u0E19\u0E40\u0E0B\u0E34\u0E23\u0E4C\u0E1F\u0E40\u0E27\u0E2D\u0E23\u0E4C",
    en: "Internal server error"
  },
  DATABASE_ERROR: {
    th: "\u0E01\u0E32\u0E23\u0E14\u0E33\u0E40\u0E19\u0E34\u0E19\u0E01\u0E32\u0E23\u0E10\u0E32\u0E19\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E25\u0E49\u0E21\u0E40\u0E2B\u0E25\u0E27",
    en: "Database operation failed"
  },
  // Success Messages
  SUCCESS: {
    th: "\u0E40\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",
    en: "successful"
  },
  LOGIN_SUCCESS: {
    th: "\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",
    en: "Login successful"
  },
  LOGOUT_SUCCESS: {
    th: "\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",
    en: "Logout successful"
  },
  REGISTER_SUCCESS: {
    th: "\u0E25\u0E07\u0E17\u0E30\u0E40\u0E1A\u0E35\u0E22\u0E19\u0E2A\u0E33\u0E40\u0E23\u0E47\u0E08",
    en: "Registration successful"
  },
  // User Management
  USER_NOT_FOUND: {
    th: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    en: "User not found"
  },
  USER_ALREADY_EXISTS: {
    th: "\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E21\u0E35\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27",
    en: "User already exists"
  },
  INVALID_USER_ID: {
    th: "\u0E23\u0E2B\u0E31\u0E2A\u0E1C\u0E39\u0E49\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    en: "Invalid user ID"
  },
  // Role Management
  ROLE_NOT_FOUND: {
    th: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E1A\u0E17\u0E1A\u0E32\u0E17",
    en: "Role not found"
  },
  ROLE_ALREADY_EXISTS: {
    th: "\u0E1A\u0E17\u0E1A\u0E32\u0E17\u0E21\u0E35\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27",
    en: "Role already exists"
  },
  INVALID_ROLE_ID: {
    th: "\u0E23\u0E2B\u0E31\u0E2A\u0E1A\u0E17\u0E1A\u0E32\u0E17\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    en: "Invalid role ID"
  },
  ROLE_IN_USE: {
    th: "\u0E1A\u0E17\u0E1A\u0E32\u0E17\u0E19\u0E35\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 \u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E25\u0E1A\u0E44\u0E14\u0E49",
    en: "Role is currently in use and cannot be deleted"
  },
  // Permission Management
  PERMISSION_NOT_FOUND: {
    th: "\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    en: "Permission not found"
  },
  PERMISSION_ALREADY_EXISTS: {
    th: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E21\u0E35\u0E2D\u0E22\u0E39\u0E48\u0E41\u0E25\u0E49\u0E27",
    en: "Permission already exists"
  },
  INVALID_PERMISSION_ID: {
    th: "\u0E23\u0E2B\u0E31\u0E2A\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
    en: "Invalid permission ID"
  },
  PERMISSION_IN_USE: {
    th: "\u0E2A\u0E34\u0E17\u0E18\u0E34\u0E4C\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19\u0E19\u0E35\u0E49\u0E01\u0E33\u0E25\u0E31\u0E07\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19 \u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E25\u0E1A\u0E44\u0E14\u0E49",
    en: "Permission is currently in use and cannot be deleted"
  },
  DATA_USED: {
    th: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E16\u0E39\u0E01\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    en: "Data is used"
  }
};
const VALIDATION_DETAILS = {
  // Field Requirements
  FIELD_NAME_REQUIRED: "FIELD_NAME_REQUIRED",
  FIELD_EMAIL_REQUIRED: "FIELD_EMAIL_REQUIRED",
  FIELD_PASSWORD_REQUIRED: "FIELD_PASSWORD_REQUIRED",
  FIELD_ROLE_REQUIRED: "FIELD_ROLE_REQUIRED",
  FIELD_MODULE_REQUIRED: "FIELD_MODULE_REQUIRED",
  FIELD_ACTION_REQUIRED: "FIELD_ACTION_REQUIRED",
  FIELD_RESOURCE_REQUIRED: "FIELD_RESOURCE_REQUIRED",
  FIELD_DESCRIPTION_REQUIRED: "FIELD_DESCRIPTION_REQUIRED",
  FIELD_PERMISSIONS_REQUIRED: "FIELD_PERMISSIONS_REQUIRED",
  // Field Validation
  PASSWORD_MIN_6: "PASSWORD_MIN_6",
  EMAIL_INVALID_FORMAT: "EMAIL_INVALID_FORMAT",
  NAME_MIN_2_CHARS: "NAME_MIN_2_CHARS",
  ROLE_INVALID_VALUE: "ROLE_INVALID_VALUE",
  DEPARTMENT_INVALID_VALUE: "DEPARTMENT_INVALID_VALUE",
  POSITION_INVALID_VALUE: "POSITION_INVALID_VALUE",
  // Permission Validation
  PERMISSION_NAME_INVALID: "PERMISSION_NAME_INVALID",
  PERMISSION_MODULE_INVALID: "PERMISSION_MODULE_INVALID",
  PERMISSION_ACTION_INVALID: "PERMISSION_ACTION_INVALID",
  PERMISSION_RESOURCE_INVALID: "PERMISSION_RESOURCE_INVALID",
  PERMISSION_TYPE_INVALID: "PERMISSION_TYPE_INVALID",
  // Role Validation
  ROLE_NAME_INVALID: "ROLE_NAME_INVALID",
  ROLE_PERMISSIONS_INVALID: "ROLE_PERMISSIONS_INVALID",
  // User Validation
  USER_ID_INVALID: "USER_ID_INVALID",
  USER_EMAIL_DUPLICATE: "USER_EMAIL_DUPLICATE",
  USER_PASSWORD_TOO_WEAK: "USER_PASSWORD_TOO_WEAK",
  // Common Validation
  FIELD_TOO_LONG: "FIELD_TOO_LONG",
  FIELD_TOO_SHORT: "FIELD_TOO_SHORT",
  FIELD_INVALID_CHARACTERS: "FIELD_INVALID_CHARACTERS",
  FIELD_INVALID_FORMAT: "FIELD_INVALID_FORMAT",
  INVALID_PERMISSION_ID: "INVALID_PERMISSION_ID",
  ROLE_IN_USE: "ROLE_IN_USE",
  INVALID_ROLE_ID: "INVALID_ROLE_ID"
};
const API_RESPONSE_CODES = {
  SUCCESS: "SUCCESS",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  // Authentication & Authorization
  INVALID_OR_EXPIRED_TOKEN: "INVALID_OR_EXPIRED_TOKEN",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",
  // Validation
  VALIDATION_ERROR_EXCEPTION_NAME: "ValidationError",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
  INVALID_INPUT: "INVALID_INPUT",
  // Resource Management
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  DATA_USED: "DATA_USED",
  // Server Errors
  INTERNAL_ERROR: "INTERNAL_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  // User Management
  USER_NOT_FOUND: "USER_NOT_FOUND",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  INVALID_USER_ID: "INVALID_USER_ID",
  // Role Management
  ROLE_NOT_FOUND: "ROLE_NOT_FOUND",
  ROLE_ALREADY_EXISTS: "ROLE_ALREADY_EXISTS",
  INVALID_ROLE_ID: "INVALID_ROLE_ID",
  ROLE_IN_USE: "ROLE_IN_USE",
  // Permission Management
  PERMISSION_NOT_FOUND: "PERMISSION_NOT_FOUND",
  PERMISSION_ALREADY_EXISTS: "PERMISSION_ALREADY_EXISTS",
  INVALID_PERMISSION_ID: "INVALID_PERMISSION_ID",
  PERMISSION_IN_USE: "PERMISSION_IN_USE",
  // Account Status
  ACCOUNT_DEACTIVATED: "ACCOUNT_DEACTIVATED"
};
const API_RESPONSE = {
  SUCCESS: {
    statusCode: HTTP_STATUS.OK,
    statusMessage: "SUCCESS",
    messages: API_RESPONSE_MESSAGES.SUCCESS,
    message: API_RESPONSE_MESSAGES.SUCCESS.en
  },
  LOGIN_SUCCESS: {
    statusCode: HTTP_STATUS.OK,
    statusMessage: "SUCCESS",
    messages: API_RESPONSE_MESSAGES.LOGIN_SUCCESS,
    message: API_RESPONSE_MESSAGES.LOGIN_SUCCESS.en
  },
  LOGOUT_SUCCESS: {
    statusCode: HTTP_STATUS.OK,
    statusMessage: "SUCCESS",
    messages: API_RESPONSE_MESSAGES.LOGOUT_SUCCESS,
    message: API_RESPONSE_MESSAGES.LOGOUT_SUCCESS.en
  },
  REGISTER_SUCCESS: {
    statusCode: HTTP_STATUS.OK,
    statusMessage: "SUCCESS",
    messages: API_RESPONSE_MESSAGES.REGISTER_SUCCESS,
    message: API_RESPONSE_MESSAGES.REGISTER_SUCCESS.en
  },
  // Authentication & Authorization
  INVALID_CREDENTIALS: {
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    statusMessage: "INVALID_EMAIL_PASSWORD",
    messages: API_RESPONSE_MESSAGES.INVALID_CREDENTIALS,
    message: API_RESPONSE_MESSAGES.INVALID_CREDENTIALS.en
  },
  UNAUTHORIZED: {
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    statusMessage: "AUTHENTICATION_REQUIRED",
    messages: API_RESPONSE_MESSAGES.UNAUTHORIZED,
    message: API_RESPONSE_MESSAGES.UNAUTHORIZED.en
  },
  FORBIDDEN: {
    statusCode: HTTP_STATUS.FORBIDDEN,
    statusMessage: "ACCESS_DENIED_INSUFFICIENT_PERMISSIONS",
    messages: API_RESPONSE_MESSAGES.FORBIDDEN,
    message: API_RESPONSE_MESSAGES.FORBIDDEN.en
  },
  TOKEN_EXPIRED: {
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    statusMessage: "TOKEN_EXPIRED",
    messages: API_RESPONSE_MESSAGES.TOKEN_EXPIRED,
    message: API_RESPONSE_MESSAGES.TOKEN_EXPIRED.en
  },
  // Validation
  VALIDATION_ERROR: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    statusMessage: "VALIDATION_FAILED",
    messages: API_RESPONSE_MESSAGES.VALIDATION_ERROR,
    message: API_RESPONSE_MESSAGES.VALIDATION_ERROR.en
  },
  MISSING_REQUIRED_FIELDS: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    statusMessage: "REQUIRED_FIELDS_MISSING",
    messages: API_RESPONSE_MESSAGES.MISSING_REQUIRED_FIELDS,
    message: API_RESPONSE_MESSAGES.MISSING_REQUIRED_FIELDS.en
  },
  INVALID_INPUT: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    statusMessage: "INVALID_INPUT_PROVIDED",
    messages: API_RESPONSE_MESSAGES.INVALID_INPUT,
    message: API_RESPONSE_MESSAGES.INVALID_INPUT.en
  },
  // Resource Management
  NOT_FOUND: {
    statusCode: HTTP_STATUS.NOT_FOUND,
    statusMessage: "RESOURCE_NOT_FOUND",
    messages: API_RESPONSE_MESSAGES.NOT_FOUND,
    message: API_RESPONSE_MESSAGES.NOT_FOUND.en
  },
  ALREADY_EXISTS: {
    statusCode: HTTP_STATUS.CONFLICT,
    statusMessage: "RESOURCE_ALREADY_EXISTS",
    messages: API_RESPONSE_MESSAGES.ALREADY_EXISTS,
    message: API_RESPONSE_MESSAGES.ALREADY_EXISTS.en
  },
  DATA_USED: {
    statusCode: HTTP_STATUS.CONFLICT,
    statusMessage: "RESOURCE_IS_USED",
    messages: API_RESPONSE_MESSAGES.DATA_USED,
    message: API_RESPONSE_MESSAGES.DATA_USED.en
  },
  // Server Errors
  INTERNAL_ERROR: {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    statusMessage: "INTERNAL_SERVER_ERROR",
    messages: API_RESPONSE_MESSAGES.INTERNAL_ERROR,
    message: API_RESPONSE_MESSAGES.INTERNAL_ERROR.en
  },
  DATABASE_ERROR: {
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    statusMessage: "DATABASE_OPERATION_FAILED",
    messages: API_RESPONSE_MESSAGES.DATABASE_ERROR,
    message: API_RESPONSE_MESSAGES.DATABASE_ERROR.en
  },
  // User Management
  USER_NOT_FOUND: {
    statusCode: HTTP_STATUS.NOT_FOUND,
    statusMessage: "USER_NOT_FOUND",
    messages: API_RESPONSE_MESSAGES.USER_NOT_FOUND,
    message: API_RESPONSE_MESSAGES.USER_NOT_FOUND.en
  },
  USER_ALREADY_EXISTS: {
    statusCode: HTTP_STATUS.CONFLICT,
    statusMessage: "USER_ALREADY_EXISTS",
    messages: API_RESPONSE_MESSAGES.USER_ALREADY_EXISTS,
    message: API_RESPONSE_MESSAGES.USER_ALREADY_EXISTS.en
  },
  INVALID_USER_ID: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    statusMessage: "INVALID_USER_ID",
    messages: API_RESPONSE_MESSAGES.INVALID_USER_ID,
    message: API_RESPONSE_MESSAGES.INVALID_USER_ID.en
  },
  // Role Management
  ROLE_NOT_FOUND: {
    statusCode: HTTP_STATUS.NOT_FOUND,
    statusMessage: "ROLE_NOT_FOUND",
    messages: API_RESPONSE_MESSAGES.ROLE_NOT_FOUND,
    message: API_RESPONSE_MESSAGES.ROLE_NOT_FOUND.en
  },
  ROLE_ALREADY_EXISTS: {
    statusCode: HTTP_STATUS.CONFLICT,
    statusMessage: "ROLE_ALREADY_EXISTS",
    messages: API_RESPONSE_MESSAGES.ROLE_ALREADY_EXISTS,
    message: API_RESPONSE_MESSAGES.ROLE_ALREADY_EXISTS.en
  },
  INVALID_ROLE_ID: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    statusMessage: "INVALID_ROLE_ID",
    messages: API_RESPONSE_MESSAGES.INVALID_ROLE_ID,
    message: API_RESPONSE_MESSAGES.INVALID_ROLE_ID.en
  },
  ROLE_IN_USE: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    statusMessage: "ROLE_IN_USE_CANNOT_DELETE",
    messages: API_RESPONSE_MESSAGES.ROLE_IN_USE,
    message: API_RESPONSE_MESSAGES.ROLE_IN_USE.en
  },
  // Permission Management
  PERMISSION_NOT_FOUND: {
    statusCode: HTTP_STATUS.NOT_FOUND,
    statusMessage: "PERMISSION_NOT_FOUND",
    messages: API_RESPONSE_MESSAGES.PERMISSION_NOT_FOUND,
    message: API_RESPONSE_MESSAGES.PERMISSION_NOT_FOUND.en
  },
  PERMISSION_ALREADY_EXISTS: {
    statusCode: HTTP_STATUS.CONFLICT,
    statusMessage: "PERMISSION_ALREADY_EXISTS",
    messages: API_RESPONSE_MESSAGES.PERMISSION_ALREADY_EXISTS,
    message: API_RESPONSE_MESSAGES.PERMISSION_ALREADY_EXISTS.en
  },
  INVALID_PERMISSION_ID: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    statusMessage: "INVALID_PERMISSION_ID",
    messages: API_RESPONSE_MESSAGES.INVALID_PERMISSION_ID,
    message: API_RESPONSE_MESSAGES.INVALID_PERMISSION_ID.en
  },
  PERMISSION_IN_USE: {
    statusCode: HTTP_STATUS.BAD_REQUEST,
    statusMessage: "PERMISSION_IN_USE_CANNOT_DELETE",
    messages: API_RESPONSE_MESSAGES.PERMISSION_IN_USE,
    message: API_RESPONSE_MESSAGES.PERMISSION_IN_USE.en
  },
  // Account Status
  ACCOUNT_DEACTIVATED: {
    statusCode: HTTP_STATUS.UNAUTHORIZED,
    statusMessage: "ACCOUNT_DEACTIVATED",
    messages: API_RESPONSE_MESSAGES.ACCOUNT_DEACTIVATED,
    message: API_RESPONSE_MESSAGES.ACCOUNT_DEACTIVATED.en
  }
};
const createAPIError = (response) => {
  const { statusCode, statusMessage, messages, message, data, ...customProps } = response;
  const msg = typeof message === "string" ? message : message == null ? void 0 : message.en;
  const error = createError({
    statusCode,
    statusMessage,
    message: msg,
    data: {
      statusCode,
      statusMessage,
      messages,
      message: msg,
      ...customProps != null ? customProps : {},
      ...data != null ? data : {}
    }
  });
  return error;
};
function createPredefinedError(errorType, additionalData = {}) {
  const error = API_RESPONSE[errorType];
  return createAPIError({
    ...error,
    data: {
      ...additionalData
    }
  });
}
function createSuccessResponse(data, options = {
  responseType: API_RESPONSE_CODES.SUCCESS,
  additionalData: {}
}) {
  var _a, _b, _c;
  const success = API_RESPONSE[options.responseType || API_RESPONSE_CODES.SUCCESS];
  return {
    success: success.statusCode >= 200 && success.statusCode < 300,
    statusCode: (_a = success.statusCode) != null ? _a : API_RESPONSE.SUCCESS.statusCode,
    statusMessage: (_b = success.statusMessage) != null ? _b : API_RESPONSE.SUCCESS.statusMessage,
    messages: success.messages,
    message: ((_c = success.messages) == null ? void 0 : _c.en) || success.statusMessage,
    data,
    ...options.additionalData || {}
  };
}
function createPaginatedResponse(data, pagination, options = {
  responseType: API_RESPONSE_CODES.SUCCESS,
  additionalData: {}
}) {
  var _a, _b, _c;
  const success = API_RESPONSE[options.responseType || API_RESPONSE_CODES.SUCCESS];
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  const response = {
    success: success.statusCode >= 200 && success.statusCode < 300,
    statusCode: (_a = success.statusCode) != null ? _a : API_RESPONSE.SUCCESS.statusCode,
    statusMessage: (_b = success.statusMessage) != null ? _b : API_RESPONSE.SUCCESS.statusMessage,
    messages: success.messages,
    message: ((_c = success.messages) == null ? void 0 : _c.en) || success.statusMessage,
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total: pagination.total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1
    },
    ...options.additionalData || {}
  };
  return response;
}

let modelsLoaded = false;
async function loadAllModels() {
  if (modelsLoaded) return;
  try {
    const models = await Promise.all([
      import('./Permission.mjs'),
      import('./Role.mjs'),
      import('./User.mjs')
    ]);
    const modelNames = models.map((m, i) => {
      const modelName = ["Permission", "Role", "User"][i];
      return `${modelName}: ${m.default ? "\u2713" : "\u2717"}`;
    }).join(", ");
    console.log(`\u2705 Models loaded: ${modelNames}`);
    modelsLoaded = true;
  } catch (error) {
    console.error("\u274C Error loading models:", error);
    throw error;
  }
}

const MONGO_URI = process.env.LOCAL_SPOT_MONGO_URI;
if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
async function connectMongoDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };
    cached.promise = mongoose.connect(MONGO_URI, opts).then(async (mongoose2) => {
      await loadAllModels();
      return mongoose2;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export { API_RESPONSE_CODES as A, MODEL_VALIDATION_MESSAGES as M, VALIDATION_DETAILS as V, createPredefinedError as a, createSuccessResponse as b, connectMongoDB as c, createPaginatedResponse as d };
//# sourceMappingURL=mongodb.mjs.map
