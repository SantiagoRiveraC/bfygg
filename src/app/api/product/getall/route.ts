import dbConnect from "@/lib/db"
import Product from "@/models/Product"
import { NextResponse } from "next/server"


export async function GET() {
    
    try {
        await dbConnect()
        
        const Products = await Product.find()
        if (Products) {
            return NextResponse.json(
                { Products },
                { status: 200}
            )
        } else {
            return NextResponse.json(
                { message: 'Products didn´t found' },
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