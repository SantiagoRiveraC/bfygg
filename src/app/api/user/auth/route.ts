import dbConnect from "@/lib/db"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    try {
        await dbConnect()

        const userId = req.headers.get('X-user-id')
        if (!userId) {
            return NextResponse.json(
                { message: 'unauthenticated user' },
                { status: 404}
            )
        }

        const user = await User.findById(userId).select('-_id')
        if (!user) {
            return NextResponse.json(
                { message: 'user not found' },
                { status: 404}
            )
        }

        return NextResponse.json({user})
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}