import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}
async function verifyPassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
function generateToken(userId, email) {
  const jwtSecret = process.env.AGENCY_JWT_SECRET || "fallback-secret-key";
  return jwt.sign(
    { userId, email },
    jwtSecret,
    { expiresIn: "7d" }
  );
}
function verifyToken(token) {
  try {
    const jwtSecret = process.env.AGENCY_JWT_SECRET || "fallback-secret-key";
    const decoded = jwt.verify(token, jwtSecret);
    console.log("Token verified successfully for user:", decoded.email);
    return { userId: decoded.userId, email: decoded.email };
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return null;
  }
}

export { verifyToken as a, generateToken as g, hashPassword as h, verifyPassword as v };
//# sourceMappingURL=auth.mjs.map
