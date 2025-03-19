// lib/db.ts
import mongoose, { Mongoose } from 'mongoose';
import { MongooseConnection } from "@/utils/interfaces"

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const globalCache = global as unknown as { mongoose: MongooseConnection };

globalCache.mongoose = globalCache.mongoose || { conn: null, promise: null };

async function dbConnect(): Promise<Mongoose> {
    if (globalCache.mongoose.conn) {
        return globalCache.mongoose.conn;
    }

    if (!globalCache.mongoose.promise) {
        const opts = {
            bufferCommands: false,
        };

        globalCache.mongoose.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => mongoose);
    }

    try {
        globalCache.mongoose.conn = await globalCache.mongoose.promise;
    } catch (e) {
        globalCache.mongoose.promise = null;
        throw e;
    }

    return globalCache.mongoose.conn;
}

export default dbConnect;