import User from '~/server/local-spot/models/User'
import { createUserFilterConfig } from '~/server/local-spot/utils/filter_config/userManagement'
import { extractTokenFromHeader, verifyToken } from '~/server/local-spot/utils/jwt'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'
import { parseQueryAndBuildFilter } from '~/server/local-spot/utils/queryParser'
import { API_RESPONSE_CODES, createPaginatedResponse, createPredefinedError } from '~/server/local-spot/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get token from Authorization header
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED)
    }

    // Verify and decode token
    const decoded = verifyToken(token)

    // Find current user to check permissions
    const currentUser = await User.findById(decoded.userId)

    if (!currentUser || !currentUser.isActive) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED)
    }

    // Check if user has permission to view users (admin)
    if (currentUser.role !== 'admin') {
      throw createPredefinedError(API_RESPONSE_CODES.FORBIDDEN)
    }

    const query: any = getQuery(event)

    // Parse query and build MongoDB filter using global utilities
    const { parsedQuery, mongoFilter } = parseQueryAndBuildFilter(
      query,
      createUserFilterConfig()
    )

    const { page, limit } = parsedQuery.pagination
    let filter = mongoFilter

    // Handle ObjectId conversion for roles field
    if (filter.roles && typeof filter.roles === 'string') {
      try {
        filter.roles = new (await import('mongoose')).Types.ObjectId(filter.roles)
      } catch (error) {
        console.warn('Invalid ObjectId for roles filter:', filter.roles)
        delete filter.roles
      }
    } else if (filter.roles && filter.roles.$in && Array.isArray(filter.roles.$in)) {
      try {
        const mongoose = await import('mongoose')
        filter.roles.$in = filter.roles.$in.map((id: string) => new mongoose.Types.ObjectId(id))
      } catch (error) {
        console.warn('Invalid ObjectId in roles filter array:', filter.roles.$in)
        delete filter.roles
      }
    }

    // Get total count
    const total = await User.countDocuments(filter)

    // Get users with pagination and populate roles
    const users = await User.find(filter)
      .populate('roles', 'name description isActive')
      .select('_id name email role department position avatar lastLogin emailVerified isActive roles')
      .sort({ name: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    // Transform users data
    const transformedUsers = users.map((user: any) => ({
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
      roles: user.roles ? user.roles.map((role: any) => ({
        id: role._id.toString(),
        name: role.name,
        description: role.description,
        isActive: role.isActive
      })) : []
    }))

    return createPaginatedResponse(transformedUsers, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    })
  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle JWT errors
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED)
    }

    // Log unexpected errors
    console.error('Get users error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})