import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string, email: string): string {
  const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key'
  return jwt.sign(
    { userId, email },
    jwtSecret,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret-key'
    const decoded = jwt.verify(token, jwtSecret) as any
    console.log('Token verified successfully for user:', decoded.email)
    return { userId: decoded.userId, email: decoded.email }
  } catch (error: any) {
    console.log('Token verification failed:', error.message)
    return null
  }
}