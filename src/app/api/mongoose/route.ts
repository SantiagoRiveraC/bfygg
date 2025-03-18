import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
    try {
        await dbConnect();

        const users = await User.find({});

        return NextResponse.json({ message: 'Hello from Next.js!', users });
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching data', error: error.message },
            { status: 500 }
        );
    }
}