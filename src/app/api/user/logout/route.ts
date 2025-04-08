import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        await dbConnect()
        
        const userId = req.headers.get('X-user-id')
        if (!userId) {
            return NextResponse.json(
                { message: 'unauthenticated user' },
                { status: 401 }
            )
        }

        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json(
                { message: 'user not found' },
                { status: 404}
            )
        }

        return NextResponse.json(
            { message: 'Session successfully closed' },
            { status: 200}
        ) 
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error', error },
            { status: 500}
        )
    }
}