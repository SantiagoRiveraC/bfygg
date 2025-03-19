import dbConnect from "@/lib/db"
import Suscription from "@/models/Suscription"
import { NextResponse } from "next/server"


export async function GET() {
    
    try {
        await dbConnect()
        
        const suscription = await Suscription.find()
        if (suscription) {
            return NextResponse.json(
                { suscription },
                { status: 200}
            )
        } else {
            return NextResponse.json(
                { message: 'Suscription didn´t found' },
                { status: 404}
            )
        }
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}