import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const sampleTeamMembers = [
  {
    name: "Sarah Johnson",
    position: "CEO & Founder",
    description: "With over 15 years of experience in digital marketing, Sarah leads our team with vision and passion. She's helped hundreds of businesses transform their online presence and achieve remarkable growth.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    email: "sarah@digitalflow.com",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    twitter: "https://twitter.com/sarahjohnson",
    order: 0,
    isActive: true
  },
  {
    name: "Michael Chen",
    position: "Head of SEO",
    description: "Michael is our SEO wizard with a track record of achieving top rankings for competitive keywords. His data-driven approach and technical expertise have delivered exceptional results for our clients.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    email: "michael@digitalflow.com",
    linkedin: "https://linkedin.com/in/michaelchen",
    order: 1,
    isActive: true
  },
  {
    name: "Emily Rodriguez",
    position: "Social Media Director",
    description: "Emily crafts compelling social media strategies that build communities and drive engagement. Her creative campaigns have generated millions of impressions and countless conversions.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    email: "emily@digitalflow.com",
    linkedin: "https://linkedin.com/in/emilyrodriguez",
    twitter: "https://twitter.com/emilyrodriguez",
    order: 2,
    isActive: true
  },
  {
    name: "David Kim",
    position: "PPC Specialist",
    description: "David maximizes ROI through strategic paid advertising campaigns. His expertise in Google Ads and Facebook Ads has helped clients achieve average returns of 300% on ad spend.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    email: "david@digitalflow.com",
    linkedin: "https://linkedin.com/in/davidkim",
    order: 3,
    isActive: true
  },
  {
    name: "Jessica Thompson",
    position: "Content Marketing Manager",
    description: "Jessica creates content that converts. Her strategic approach to content marketing has increased organic traffic by an average of 250% for our clients while building strong brand authority.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    email: "jessica@digitalflow.com",
    linkedin: "https://linkedin.com/in/jessicathompson",
    order: 4,
    isActive: true
  },
  {
    name: "Alex Parker",
    position: "Analytics & Strategy Lead",
    description: "Alex turns data into actionable insights. With expertise in Google Analytics, Tag Manager, and custom reporting, Alex ensures every campaign decision is backed by solid data.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    email: "alex@digitalflow.com",
    linkedin: "https://linkedin.com/in/alexparker",
    order: 5,
    isActive: true
  }
]

async function seedTeamMembers() {
  try {
    console.log('🌱 Seeding team member data...')
    
    // Check if team members already exist
    const existingMembers = await prisma.teamMember.findMany()
    
    if (existingMembers.length > 0) {
      console.log(`ℹ️  Found ${existingMembers.length} existing team members. Skipping seed to avoid duplicates.`)
      console.log('💡 If you want to re-seed, delete existing team members first.')
      return
    }
    
    // Insert the sample team members
    for (const member of sampleTeamMembers) {
      const created = await prisma.teamMember.create({
        data: member
      })
      console.log(`✅ Created team member: "${created.name}" - ${created.position}`)
    }
    
    console.log('🎉 Successfully seeded team member data!')
    
  } catch (error) {
    console.error('❌ Error seeding team member data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the seeding function
seedTeamMembers()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))

export { seedTeamMembers }