import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://charreleramis24_db_user:YHNcAiL2vpueZKhE@dev.kgzoujj.mongodb.net/?appName=dev';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: 'spacemaster'
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

