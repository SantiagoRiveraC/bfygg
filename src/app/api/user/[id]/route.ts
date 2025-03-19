import User from "@/models/User";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function DELETE(req: Request, {params}: {params: {id: string}}) {

    try {
        await dbConnect()

        const { id } = params

        if (!id) {
            return NextResponse.json(
                { mesaage: 'ID is required' },
                { status: 400}
            )
        }

        const deleteUser = await User.findByIdAndDelete(id)
        if (!deleteUser) {
            return NextResponse.json(
                { mesaage: 'User not found' },
                { status: 400 }
            )
        } else {
            return NextResponse.json(
                { mesaage: 'User deleted successfully' },
                { status: 400 }
            )
        }
    } catch (error) {
        
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}


export async function PUT(req: Request, { params }: { params: { id: string } }) {
    
    try {
        await dbConnect()

        const { id } = params
        if (!id) {
            return NextResponse.json(
                { mesaage: 'ID is required' },
                { status: 400 }
            )
        }

        const body = await req.json()
        const user = await User.findById(id)
        if (!user) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404}
            )
        }

        if (body.password) {
            const samePass = bcrypt.compareSync(body.password, user.password)
            if (!samePass) {
                user.password = bcrypt.hashSync(body.password,10)
            } 
        }

        Object.assign(user, body)
        
        await user.save()
        return NextResponse.json(
            { messaje: ' User update successfully', user },
            { status: 200}
        )

    } catch (error) {
        
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}