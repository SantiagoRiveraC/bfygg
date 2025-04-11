import dbConnect from "@/lib/db"
import SubscriptionModel from "@/models/Subscription"
import { NextResponse } from "next/server"


export async function GET() {
    
    try {
        await dbConnect()
        
        const subscription = await SubscriptionModel.find()
        if (!subscription) {
            return NextResponse.json(
                { message: 'Subscription didn´t found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { subscription },
            { status: 200}
        )
    } catch (error) {
        
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}