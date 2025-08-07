import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function updateHomeContent() {
  try {
    console.log('🔄 Updating existing home content with new People section fields...')
    
    // Find existing home content
    const existingContent = await prisma.homeContent.findFirst()
    
    if (existingContent) {
      // Check if the new fields already exist
      if (!existingContent.peopleTitle || !existingContent.peopleDescription) {
        const updated = await prisma.homeContent.update({
          where: { id: existingContent.id },
          data: {
            peopleTitle: existingContent.peopleTitle || "Meet Our People",
            peopleDescription: existingContent.peopleDescription || "Get to know the talented individuals who drive our success and make exceptional results possible"
          }
        })
        
        console.log('✅ Updated home content with People section fields')
        console.log(`   Title: "${updated.peopleTitle}"`)
        console.log(`   Description: "${updated.peopleDescription}"`)
      } else {
        console.log('ℹ️  Home content already has People section fields')
      }
    } else {
      console.log('ℹ️  No existing home content found. Fields will be set when content is first created.')
    }
    
    console.log('🎉 Home content update completed!')
    
  } catch (error) {
    console.error('❌ Error updating home content:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

// Run the update function
updateHomeContent()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))

export { updateHomeContent }