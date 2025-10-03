import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function importData() {
  try {
    const jsonData = JSON.parse(
      fs.readFileSync('./cah-cards-full.json', 'utf8')
    );

    console.log('Starting import...');
    console.log(`Found ${jsonData.length} packs to import`);

    for (let i = 0; i < jsonData.length; i++) {
      const packData = jsonData[i];
      console.log(
        `\nImporting pack ${i + 1}/${jsonData.length}: ${packData.name}`
      );

      const { data: pack, error: packError } = await supabase
        .from('packs')
        .insert({
          name: packData.name,
          official: packData.official,
          created_by: null, 
        })
        .select()
        .single();

      if (packError) {
        console.error(`Error inserting pack "${packData.name}":`, packError);
        continue;
      }

      console.log(`✓ Pack created with ID: ${pack.id}`);

      if (packData.white && packData.white.length > 0) {
        const whiteCards = packData.white.map((card) => ({
          text: card.text,
          pack_id: pack.id,
        }));

        const { error: whiteError } = await supabase
          .from('white_cards')
          .insert(whiteCards);

        if (whiteError) {
          console.error(`Error inserting white cards:`, whiteError);
        } else {
          console.log(`✓ Inserted ${whiteCards.length} white cards`);
        }
      }

      if (packData.black && packData.black.length > 0) {
        const blackCards = packData.black.map((card) => ({
          text: card.text,
          pick: card.pick || 1,
          pack_id: pack.id,
        }));

        const { error: blackError } = await supabase
          .from('black_cards')
          .insert(blackCards);

        if (blackError) {
          console.error(`Error inserting black cards:`, blackError);
        } else {
          console.log(`✓ Inserted ${blackCards.length} black cards`);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log('\n✅ Import completed successfully!');

    const { count: packCount } = await supabase
      .from('packs')
      .select('*', { count: 'exact', head: true });

    const { count: whiteCount } = await supabase
      .from('white_cards')
      .select('*', { count: 'exact', head: true });

    const { count: blackCount } = await supabase
      .from('black_cards')
      .select('*', { count: 'exact', head: true });

    console.log('\n📊 Database Summary:');
    console.log(`   Total packs: ${packCount}`);
    console.log(`   Total white cards: ${whiteCount}`);
    console.log(`   Total black cards: ${blackCount}`);
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}
async function importFromArrayFormat() {
  try {
    const jsonData = JSON.parse(
      fs.readFileSync('./cah-cards-full.json', 'utf8')
    );

    console.log('Importing packs...');

    const { data: insertedPacks, error: packError } = await supabase
      .from('packs')
      .insert(
        jsonData.map((p) => ({
          name: p.name,
          official: p.official,
          created_by: null,
        }))
      )
      .select();

    if (packError) {
      throw packError;
    }

    const packIdMap = {};
    jsonData.forEach((oldPack, index) => {
      const oldId = oldPack.pack || index;
      packIdMap[oldId] = insertedPacks[index].id;
    });

    console.log('Importing white cards...');
    const whiteCardsToInsert = jsonData.whiteCards.map((card) => ({
      text: card.text,
      pack_id: packIdMap[card.pack],
    }));

    const { error: whiteError } = await supabase
      .from('white_cards')
      .insert(whiteCardsToInsert);

    if (whiteError) {
      throw whiteError;
    }

    console.log('Importing black cards...');
    const blackCardsToInsert = jsonData.blackCards.map((card) => ({
      text: card.text,
      pick: card.pick || 1,
      pack_id: packIdMap[card.pack],
    }));

    const { error: blackError } = await supabase
      .from('black_cards')
      .insert(blackCardsToInsert);

    if (blackError) {
      throw blackError;
    }

    console.log('✅ Import completed successfully!');
  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

console.log('🚀 Starting Card Game Data Import\n');
console.log('Make sure you have:');
console.log('1. Created all tables in Supabase');
console.log('2. Using your SERVICE ROLE key (not anon key)');
console.log('3. Your JSON file is in the correct format\n');

importData();
// importFromArrayFormat()
