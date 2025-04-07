import User from "@/models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import bcrypt from "bcryptjs";
import {  SignJWT } from "jose";


export async function POST(req: Request) {
    
    try {
        await dbConnect()
        const { email, password } = await req.json()
        if (!email?.trim() || !password?.trim()) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            )
        }

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(
                { message: 'User does not exist, please register' },
                { status: 404}
            )
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return NextResponse.json(
                { message: 'wrong credentials' },
                { status: 400}
            )
        }

        const secretKey = new TextEncoder().encode(process.env.SECRET);

        const token = await new SignJWT({ id: user._id.toString(), role: user.role })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("24h")
            .sign(secretKey);

        return NextResponse.json(
            {
                message: 'session started',
                token,
                user
            },
            { status: 200}
        )

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}