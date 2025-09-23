import jwt from 'jsonwebtoken';
import { A as API_RESPONSE_CODES } from './mongodb.mjs';

const JWT_SECRET = process.env.LOCAL_SPOT_JWT_SECRET || "web-admin-base-secret-key-change-in-production";
const JWT_EXPIRES_IN = process.env.LOCAL_SPOT_JWT_EXPIRES_IN || "7d";
function signToken(payload) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error(API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN);
  }
}
function extractTokenFromHeader(authHeader) {
  if (!authHeader) return null;
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return authHeader;
}

export { extractTokenFromHeader as e, signToken as s, verifyToken as v };
//# sourceMappingURL=jwt.mjs.map
