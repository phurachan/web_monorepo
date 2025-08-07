import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const originalFaqs = [
  {
    question: "How long does it take to see results?",
    answer: "SEO typically shows initial improvements in 3-6 months, while PPC and social media campaigns can generate results within days. The timeline varies based on your industry, competition, and current online presence.",
    order: 0,
    isActive: true
  },
  {
    question: "What makes us different?",
    answer: "We combine data-driven strategies with creative excellence, providing transparent reporting and dedicated account management. Our proprietary tools and 10+ years of experience deliver measurable ROI for every client.",
    order: 1,
    isActive: true
  },
  {
    question: "Do you work with small businesses?",
    answer: "Absolutely! We work with businesses of all sizes, from startups to Fortune 500 companies. Our scalable solutions are tailored to fit your budget and growth objectives.",
    order: 2,
    isActive: true
  },
  {
    question: "What's included in your reporting?",
    answer: "Our comprehensive reports include traffic analytics, conversion tracking, ROI analysis, keyword rankings, social media metrics, and actionable recommendations for continued growth.",
    order: 3,
    isActive: true
  }
]

async function seedFaqs() {
  try {
    console.log('🌱 Seeding FAQ data...')
    
    // Check if FAQs already exist
    const existingFaqs = await prisma.fAQ.findMany()
    
    if (existingFaqs.length > 0) {
      console.log(`ℹ️  Found ${existingFaqs.length} existing FAQs. Skipping seed to avoid duplicates.`)
      console.log('💡 If you want to re-seed, delete existing FAQs first.')
      return
    }
    
    // Insert the original FAQs
    for (const faq of originalFaqs) {
      const created = await prisma.fAQ.create({
        data: faq
      })
      console.log(`✅ Created FAQ: "${created.question}"`)
    }
    
    console.log('🎉 Successfully seeded FAQ data!')
    
  } catch (error) {
    console.error('❌ Error seeding FAQ data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding function
seedFaqs()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))

export { seedFaqs }