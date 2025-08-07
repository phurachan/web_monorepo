import { verifyToken } from '~/lib/auth'
import { promises as fs } from 'fs'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // Verify authentication
  const token = getCookie(event, 'auth-token')
  if (!token || !verifyToken(token)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  try {
    const form = await readMultipartFormData(event)
    
    if (!form || form.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file provided'
      })
    }

    const file = form[0]
    
    if (!file.filename || !file.data) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file'
      })
    }

    // Check if file is an image
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type || '')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Only image files are allowed (JPEG, PNG, GIF, WebP)'
      })
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.data.length > maxSize) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File too large. Maximum size is 5MB'
      })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const extension = file.filename.split('.').pop()
    const filename = `${timestamp}.${extension}`

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    try {
      await fs.access(uploadsDir)
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true })
    }

    // Save file
    const filePath = join(uploadsDir, filename)
    await fs.writeFile(filePath, file.data)

    // Return public URL
    const publicUrl = `/uploads/${filename}`

    return {
      success: true,
      url: publicUrl,
      filename,
      size: file.data.length,
      type: file.type
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to upload image'
    })
  }
})