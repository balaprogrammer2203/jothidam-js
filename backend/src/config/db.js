import mongoose from 'mongoose';
import { seedMasterDataIfEmpty } from '../services/masterData.service.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    await seedMasterDataIfEmpty();
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
  }
};

