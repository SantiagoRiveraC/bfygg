import dbConnect from "@/lib/db";
import Suscription from "@/models/Suscription";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, description, price, currency, billingCycle, benefits } =
      await req.json();
      debugger;

    if (!name || !description || !price || !currency || !billingCycle || !benefits) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newSuscription = new Suscription({
      name,
      description,
      price,
      currency,
      billingCycle,
      benefits
    });

    await newSuscription.save();
    return NextResponse.json(
      {
        message: "Suscription created successfully",
        newSuscription,
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
