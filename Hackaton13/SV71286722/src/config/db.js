import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI  || 'mongodb://localhost:27017/test');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error('Unexpected error', error);
        }
        process.exit(1);
    }
};