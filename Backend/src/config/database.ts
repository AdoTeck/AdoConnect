import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const dbURI = process.env.MONGO_URI as string;
    if (!dbURI) throw new Error('MongoDB URI not defined in environment variables.');

    await mongoose.connect(dbURI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;
