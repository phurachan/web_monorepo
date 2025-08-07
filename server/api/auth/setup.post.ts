import { prisma } from '~/lib/prisma'
import { hashPassword } from '~/lib/auth'

export default defineEventHandler(async (event) => {
  try {
    // Check if any admin users exist
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    })

    if (existingAdmin) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Admin user already exists'
      })
    }

    const { email, password, name } = await readBody(event)

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }

    const hashedPassword = await hashPassword(password)

    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || 'Admin',
        role: 'ADMIN'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    // Create default content
    await createDefaultContent()

    return { 
      success: true, 
      admin,
      message: 'Admin user created successfully' 
    }
  } catch (error) {
    if (error.statusCode) {
      throw error
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create admin user'
    })
  }
})

async function createDefaultContent() {
  // Create default home content
  await prisma.homeContent.create({
    data: {
      heroTitle: 'Elevate Your Digital Presence',
      heroSubtitle: 'We craft innovative digital marketing solutions that drive growth, boost engagement, and transform your business for the digital age.',
      ctaText: 'Ready to Get Started?',
      ctaButtonText: 'Start Your Journey',
      aboutTitle: 'Why Choose Us?',
      aboutDescription: 'With over a decade of experience in digital marketing, we\'ve helped hundreds of businesses transform their online presence and achieve remarkable growth.'
    }
  })

  // Create default services
  const defaultServices = [
    {
      title: 'SEO Optimization',
      description: 'Boost your search rankings and organic traffic with our proven SEO strategies.',
      icon: 'search',
      features: JSON.stringify(['Keyword Research', 'On-Page SEO', 'Link Building']),
      order: 1
    },
    {
      title: 'Social Media Marketing',
      description: 'Engage your audience across all social platforms with compelling content.',
      icon: 'social',
      features: JSON.stringify(['Content Strategy', 'Community Management', 'Paid Social']),
      order: 2
    },
    {
      title: 'Web Development',
      description: 'Modern, responsive websites that convert visitors into customers.',
      icon: 'code',
      features: JSON.stringify(['Custom Design', 'E-commerce', 'Mobile-First']),
      order: 3
    }
  ]

  for (const service of defaultServices) {
    await prisma.service.create({ data: service })
  }

  // Create default about content
  await prisma.aboutContent.create({
    data: {
      missionTitle: 'Our Mission',
      missionText: 'We believe every business deserves to succeed online. Our mission is to democratize digital marketing by providing world-class strategies.',
      visionTitle: 'Our Vision',
      visionText: 'To become the leading digital marketing agency that transforms businesses through innovative technology and creative excellence.',
      valuesTitle: 'Our Values',
      valuesText: 'Excellence, Transparency, Innovation - these core values guide everything we do.',
      teamTitle: 'Meet Our Team',
      teamDescription: 'Passionate experts dedicated to your success',
      historyTitle: 'Our Journey',
      historyText: 'From startup to industry leader, we\'ve been helping businesses grow since 2015.'
    }
  })

  // Create default contact content
  await prisma.contactContent.create({
    data: {
      title: 'Get In Touch',
      subtitle: 'Ready to transform your digital presence? Let\'s discuss how we can help accelerate your business growth.',
      phone: '+1 (555) 123-4567',
      email: 'hello@digitalflow.com',
      address: '123 Innovation Drive, Tech Valley, CA 94105',
      businessHours: JSON.stringify({
        'Monday - Friday': '9:00 AM - 6:00 PM',
        'Saturday': '10:00 AM - 4:00 PM',
        'Sunday': 'Closed'
      })
    }
  })

  // Create default site settings
  await prisma.siteSettings.create({
    data: {
      siteName: 'Digital Agency',
      siteTagline: 'Elevating brands through innovative digital marketing solutions',
      primaryColor: '#6495ed',
      socialLinks: JSON.stringify({
        twitter: '#',
        linkedin: '#',
        facebook: '#'
      })
    }
  })
}