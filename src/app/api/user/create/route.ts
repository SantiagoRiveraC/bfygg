import dbConnect from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export async function POST(req: Request) {
    
    try {
        await dbConnect()

        const { firstName, lastName, email, birthday, password, role, membershipLevel } = await req.json()

        if (!firstName || !lastName || !email || !password || !birthday ) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            )
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { message: 'user already exists' },
                { status: 409 }
            )
        }

        const hashedPasssword = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPasssword,
            birthday,
            role: role || 'member',
            membershipLevel: membershipLevel || 'basic'
        })

        await newUser.save()
        return NextResponse.json(
            {
                message: 'User created successfully',
                newUser
            },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}