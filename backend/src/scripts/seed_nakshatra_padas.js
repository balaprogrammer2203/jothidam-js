import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import NakshatraPadaMaster from '../models/NakshatraPadaMaster.js';
import { NAKSHATRA_PADAS_DATA } from '../services/nakshatraPadaData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

async function seedNakshatraPadas() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jothidam_db';
  console.log(`Connecting to MongoDB at: ${mongoUri}...`);
  await mongoose.connect(mongoUri);
  console.log('MongoDB Connected successfully!');

  console.log('\n--- Seeding 108 Nakshatra Padas Table ---');
  await NakshatraPadaMaster.deleteMany({});
  console.log('Cleared existing records from nakshatra_pada_masters.');

  const inserted = await NakshatraPadaMaster.insertMany(NAKSHATRA_PADAS_DATA);
  console.log(`✓ Successfully inserted ${inserted.length} Nakshatra Padas into nakshatra_pada_masters table!`);

  // Verification checks
  console.log('\n--- Verification Samples ---');
  const samples = [1, 9, 10, 108];
  for (const num of samples) {
    const doc = await NakshatraPadaMaster.findOne({ padaNumber: num });
    if (doc) {
      console.log(`\n[Pada #${doc.padaNumber}] ${doc.padaName.name} (${doc.padaName.nameTa})`);
      console.log(`  - 360° Position: ${doc.startDMS} to ${doc.endDMS} (Span: ${doc.padamSpan})`);
      console.log(`  - Rasi: ${doc.rasiName.name} (${doc.rasiName.nameTa}) | Degree in Rasi: ${doc.rasiStartDMS} to ${doc.rasiEndDMS}`);
      console.log(`  - Rasi Athipathi: ${doc.rasiAthipathi.name} (${doc.rasiAthipathi.nameTa})`);
      console.log(`  - Nakshatra Athipathi: ${doc.nakshatraAthipathi.name} (${doc.nakshatraAthipathi.nameTa})`);
      console.log(`  - Padam Athipathi (Navamsha Lord): ${doc.padamAthipathi.name} (${doc.padamAthipathi.nameTa})`);
      console.log(`  - Navamsha Rasi: ${doc.navamsaRasiName.name} (${doc.navamsaRasiName.nameTa})`);
      console.log(`  - Birth Syllable (Akshara): ${doc.akshara.en} / ${doc.akshara.ta} / ${doc.akshara.hi}`);
    }
  }

  const totalCount = await NakshatraPadaMaster.countDocuments();
  console.log(`\nTotal verified records in collection: ${totalCount} / 108`);

  await mongoose.disconnect();
  console.log('MongoDB disconnected cleanly.');
}

seedNakshatraPadas().catch((err) => {
  console.error('Failed to seed 108 Nakshatra Padas:', err);
  process.exit(1);
});
