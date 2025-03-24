import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, description, price, currency, availability } =
      await req.json();

    if (!name || !description || !price || !currency || !availability) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      name,
      description,
      price,
      currency,
      availability,
    });

    await newProduct.save();
    return NextResponse.json(
      {
        message: "Product created successfully",
        newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
