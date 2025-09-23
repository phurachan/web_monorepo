import { hashPassword } from '~/lib/auth'
import {
  UserService,
  HomeContentHelper,
  ServiceHelper,
  AboutContentHelper,
  ContactContentHelper,
  SiteSettingsHelper
} from '~/server/agency-cms/lib/db-helpers'

export default defineEventHandler(async (event) => {
  try {
    // Check if any admin users exist
    const existingAdmin = await UserService.userExists()

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

    const admin = await UserService.createUser({
      email,
      password: hashedPassword,
      name: name || 'Admin',
      role: 'ADMIN'
    })

    // Create default content
    await createDefaultContent()

    return {
      success: true,
      admin: {
        id: admin._id!.toString(),
        email: admin.email,
        name: admin.name,
        role: admin.role
      },
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
  await HomeContentHelper.create({
    heroTitle: JSON.stringify({
      "en": "Elevate Your Digital Presence",
      "th": "ยกระดับการมีตัวตนในโลกดิจิทัล"
    }),
    heroSubtitle: JSON.stringify({
      "en": "We craft innovative digital marketing solutions that drive growth, boost engagement, and transform your business for the digital age.",
      "th": "เราสร้างโซลูชั่นการตลาดดิจิทัลที่นวัตกรรมใหม่ เพื่อส่งเสริมการเติบโต เพิ่มการมีส่วนร่วม และเปลี่ยนแปลงธุรกิจของคุณสู่ยุคดิจิทัล"
    }),
    ctaText: JSON.stringify({
      "en": "Ready to Get Started?",
      "th": "พร้อมที่จะเริ่มต้นแล้วหรือยัง?"
    }),
    ctaButtonText: JSON.stringify({
      "en": "Start Your Journey",
      "th": "เริ่มต้นการเดินทางของคุณ"
    }),
    aboutTitle: JSON.stringify({
      "en": "Why Choose Us?",
      "th": "ทำไมต้องเลือกเรา?"
    }),
    aboutDescription: JSON.stringify({
      "en": "With over a decade of experience in digital marketing, we've helped hundreds of businesses transform their online presence and achieve remarkable growth.",
      "th": "ด้วยประสบการณ์กว่าทศวรรษในการตลาดดิจิทัล เราได้ช่วยให้ธุรกิจหลายร้อยแห่งเปลี่ยนแปลงการมีตัวตนออนไลน์และบรรลุการเติบโตที่น่าทึ่ง"
    })
  })

  // Create default services
  const defaultServices = [
    {
      title: JSON.stringify({
        "en": "SEO Optimization",
        "th": "การเพิ่มประสิทธิภาพ SEO"
      }),
      description: JSON.stringify({
        "en": "Boost your search rankings and organic traffic with our proven SEO strategies.",
        "th": "เพิ่มอันดับการค้นหาและการเข้าชมแบบออร์แกนิกด้วยกลยุทธ์ SEO ที่พิสูจน์แล้ว"
      }),
      icon: 'search',
      features: JSON.stringify([
        { "en": "Keyword Research", "th": "การวิจัยคำหลัก" },
        { "en": "On-Page SEO", "th": "การเพิ่มประสิทธิภาพในหน้า" },
        { "en": "Link Building", "th": "การสร้างลิงก์" }
      ]),
      order: 1
    },
    {
      title: JSON.stringify({
        "en": "Social Media Marketing",
        "th": "การตลาดสื่อสังคม"
      }),
      description: JSON.stringify({
        "en": "Engage your audience across all social platforms with compelling content.",
        "th": "ดึงดูดผู้ชมของคุณในทุกแพลตฟอร์มสื่อสังคมด้วยเนื้อหาที่น่าสนใจ"
      }),
      icon: 'social',
      features: JSON.stringify([
        { "en": "Content Strategy", "th": "กลยุทธ์เนื้อหา" },
        { "en": "Community Management", "th": "การจัดการชุมชน" },
        { "en": "Paid Social", "th": "สื่อสังคมแบบจ่าย" }
      ]),
      order: 2
    },
    {
      title: JSON.stringify({
        "en": "Web Development",
        "th": "การพัฒนาเว็บไซต์"
      }),
      description: JSON.stringify({
        "en": "Modern, responsive websites that convert visitors into customers.",
        "th": "เว็บไซต์ที่ทันสมัยและตอบสนองที่แปลงผู้เยี่ยมชมให้เป็นลูกค้า"
      }),
      icon: 'code',
      features: JSON.stringify([
        { "en": "Custom Design", "th": "การออกแบบแบบกำหนดเอง" },
        { "en": "E-commerce", "th": "อีคอมเมิร์ซ" },
        { "en": "Mobile-First", "th": "มือถือเป็นอันดับแรก" }
      ]),
      order: 3
    }
  ]

  for (const service of defaultServices) {
    await ServiceHelper.create(service)
  }

  // Create default about content
  await AboutContentHelper.create({
    missionTitle: JSON.stringify({
      "en": "Our Mission",
      "th": "พันธกิจของเรา"
    }),
    missionText: JSON.stringify({
      "en": "We believe every business deserves to succeed online. Our mission is to democratize digital marketing by providing world-class strategies.",
      "th": "เราเชื่อว่าทุกธุรกิจสมควรได้รับความสำเร็จออนไลน์ พันธกิจของเราคือการทำให้การตลาดดิจิทัลเป็นประชาธิปไตยโดยให้กลยุทธ์ระดับโลก"
    }),
    visionTitle: JSON.stringify({
      "en": "Our Vision",
      "th": "วิสัยทัศน์ของเรา"
    }),
    visionText: JSON.stringify({
      "en": "To become the leading digital marketing agency that transforms businesses through innovative technology and creative excellence.",
      "th": "เป็นเอเจนซี่การตลาดดิจิทัลชั้นนำที่เปลี่ยนแปลงธุรกิจผ่านเทคโนโลยีนวัตกรรมและความเป็นเลิศด้านความคิดสร้างสรรค์"
    }),
    valuesTitle: JSON.stringify({
      "en": "Our Values",
      "th": "ค่านิยมของเรา"
    }),
    valuesText: JSON.stringify({
      "en": "Excellence, Transparency, Innovation - these core values guide everything we do.",
      "th": "ความเป็นเลิศ ความโปร่งใส นวัตกรรม - ค่านิยมหลักเหล่านี้นำทางทุกสิ่งที่เราทำ"
    }),
    historyTitle: JSON.stringify({
      "en": "Our Journey",
      "th": "การเดินทางของเรา"
    }),
    historyText: JSON.stringify({
      "en": "From startup to industry leader, we've been helping businesses grow since 2015.",
      "th": "จากสตาร์ทอัปสู่ผู้นำอุตสาหกรรม เราได้ช่วยธุรกิจเติบโตมาตั้งแต่ปี 2015"
    })
  })

  // Create default contact content
  await ContactContentHelper.create({
    title: JSON.stringify({
      "en": "Get In Touch",
      "th": "ติดต่อเรา"
    }),
    subtitle: JSON.stringify({
      "en": "Ready to transform your digital presence? Let's discuss how we can help accelerate your business growth.",
      "th": "พร้อมที่จะเปลี่ยนแปลงการมีตัวตนดิจิทัลของคุณแล้วหรือยัง? มาคุยกันว่าเราสามารถช่วยเร่งการเติบโตของธุรกิจคุณได้อย่างไร"
    }),
    phone: '+1 (555) 123-4567',
    email: 'hello@digitalflow.com',
    address: JSON.stringify({
      "en": "123 Innovation Drive, Tech Valley, CA 94105",
      "th": "123 ถนนนวัตกรรม เทคแวลลี่ย์ แคลิฟอร์เนีย 94105"
    }),
    businessHours: JSON.stringify({
      'Monday - Friday': '9:00 AM - 6:00 PM',
      'Saturday': '10:00 AM - 4:00 PM',
      'Sunday': 'Closed'
    })
  })

  // Create default site settings
  await SiteSettingsHelper.create({
    siteName: 'Digital Agency',
    siteTagline: 'Elevating brands through innovative digital marketing solutions',
    primaryColor: '#6495ed',
    secondaryColor: '#9333ea',
    socialLinks: JSON.stringify({
      twitter: '#',
      linkedin: '#',
      facebook: '#'
    })
  })
}