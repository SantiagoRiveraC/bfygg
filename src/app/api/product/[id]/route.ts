import Product from "@/models/Product";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, {params}: {params: {id: string}}) {

    try {
        await dbConnect()

        const { id } = params

        if (!id) {
            return NextResponse.json(
                { mesaage: 'ID is required' },
                { status: 400 }
            )
        }

        const deleteProduct = await Product.findByIdAndDelete(id)
        if (!deleteProduct) {
            return NextResponse.json(
                { mesaage: 'Product not found' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { mesaage: 'Product deleted successfully' },
            { status: 200 }
        )
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
        const body = await req.json()

        if (!id) {
            return NextResponse.json(
                { mesaage: 'ID is required' },
                { status: 400 }
            )
        }
        
        const product = await Product.findById(id)
        if (!product) {
            return NextResponse.json(
                { message: 'Product not found' },
                { status: 404}
            )
        }

        Object.assign(product, body)
        
        await product?.save()
        return NextResponse.json(
            { messaje: 'Product update successfully', product },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    
    try {
        await dbConnect()

        const { id } = params

        if (!id) {
            return NextResponse.json(
                { mesaage: 'ID is required' },
                { status: 400 }
            )
        }
        const product = await Product.findById(id)
        if (!product) {
            return NextResponse.json(
                { message: 'Product not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(
            { messaje: 'Product get successfully', product },
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error },
            { status: 500 }
        )
    }
}