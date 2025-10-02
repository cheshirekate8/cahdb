// importData.js - Run with Node.js to import your JSON data
// Usage: node importData.js

import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

// Your Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Initialize Supabase with service role key (bypasses RLS)
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Example JSON structure you mentioned:
// {
//   "packs": [
//     {
//       "name": "Base Set",
//       "official": true,
//       "white": [
//         { "text": "A white card text", "pack": 0 }
//       ],
//       "black": [
//         { "text": "A black card with ___.", "pick": 1, "pack": 0 }
//       ]
//     }
//   ]
// }

async function importData() {
  try {
    // Read your JSON file
    const jsonData = JSON.parse(fs.readFileSync('./cah-cards-full.json', 'utf8'))
    
    console.log('Starting import...')
    console.log(`Found ${jsonData.length} packs to import`)

    for (let i = 0; i < jsonData.length; i++) {
      const packData = jsonData[i]
      console.log(`\nImporting pack ${i + 1}/${jsonData.length}: ${packData.name}`)

      // Insert pack
      const { data: pack, error: packError } = await supabase
        .from('packs')
        .insert({
          name: packData.name,
          official: packData.official,
          created_by: null // Official packs have no creator
        })
        .select()
        .single()

      if (packError) {
        console.error(`Error inserting pack "${packData.name}":`, packError)
        continue
      }

      console.log(`✓ Pack created with ID: ${pack.id}`)

      // Insert white cards
      if (packData.white && packData.white.length > 0) {
        const whiteCards = packData.white.map(card => ({
          text: card.text,
          pack_id: pack.id
        }))

        const { error: whiteError } = await supabase
          .from('white_cards')
          .insert(whiteCards)

        if (whiteError) {
          console.error(`Error inserting white cards:`, whiteError)
        } else {
          console.log(`✓ Inserted ${whiteCards.length} white cards`)
        }
      }

      // Insert black cards
      if (packData.black && packData.black.length > 0) {
        const blackCards = packData.black.map(card => ({
          text: card.text,
          pick: card.pick || 1,
          pack_id: pack.id
        }))

        const { error: blackError } = await supabase
          .from('black_cards')
          .insert(blackCards)

        if (blackError) {
          console.error(`Error inserting black cards:`, blackError)
        } else {
          console.log(`✓ Inserted ${blackCards.length} black cards`)
        }
      }

      // Optional: Add a small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log('\n✅ Import completed successfully!')

    // Print summary
    const { count: packCount } = await supabase
      .from('packs')
      .select('*', { count: 'exact', head: true })

    const { count: whiteCount } = await supabase
      .from('white_cards')
      .select('*', { count: 'exact', head: true })

    const { count: blackCount } = await supabase
      .from('black_cards')
      .select('*', { count: 'exact', head: true })

    console.log('\n📊 Database Summary:')
    console.log(`   Total packs: ${packCount}`)
    console.log(`   Total white cards: ${whiteCount}`)
    console.log(`   Total black cards: ${blackCount}`)

  } catch (error) {
    console.error('Import failed:', error)
    process.exit(1)
  }
}

// Alternative: Import from array format
// If your JSON is structured differently, use this function instead
async function importFromArrayFormat() {
  try {
    // If your JSON has separate arrays like:
    // { "packs": [...], "whiteCards": [...], "blackCards": [...] }
    
    const jsonData = JSON.parse(fs.readFileSync('./cah-cards-full.json', 'utf8'))
    
    console.log('Importing packs...')
    
    // Import packs first
    const { data: insertedPacks, error: packError } = await supabase
      .from('packs')
      .insert(jsonData.map(p => ({
        name: p.name,
        official: p.official,
        created_by: null
      })))
      .select()

    if (packError) {
      throw packError
    }

    // Create a mapping of old pack ID to new pack ID
    const packIdMap = {}
    jsonData.forEach((oldPack, index) => {
      const oldId = oldPack.pack || index
      packIdMap[oldId] = insertedPacks[index].id
    })

    // Import white cards with updated pack_id references
    console.log('Importing white cards...')
    const whiteCardsToInsert = jsonData.whiteCards.map(card => ({
      text: card.text,
      pack_id: packIdMap[card.pack]
    }))

    const { error: whiteError } = await supabase
      .from('white_cards')
      .insert(whiteCardsToInsert)

    if (whiteError) {
      throw whiteError
    }

    // Import black cards with updated pack_id references
    console.log('Importing black cards...')
    const blackCardsToInsert = jsonData.blackCards.map(card => ({
      text: card.text,
      pick: card.pick || 1,
      pack_id: packIdMap[card.pack]
    }))

    const { error: blackError } = await supabase
      .from('black_cards')
      .insert(blackCardsToInsert)

    if (blackError) {
      throw blackError
    }

    console.log('✅ Import completed successfully!')

  } catch (error) {
    console.error('Import failed:', error)
    process.exit(1)
  }
}

// Run the import
console.log('🚀 Starting Card Game Data Import\n')
console.log('Make sure you have:')
console.log('1. Created all tables in Supabase')
console.log('2. Using your SERVICE ROLE key (not anon key)')
console.log('3. Your JSON file is in the correct format\n')

// Choose which import function matches your JSON structure
importData()
// OR
// importFromArrayFormat()