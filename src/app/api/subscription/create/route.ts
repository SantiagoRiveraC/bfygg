import dbConnect from "@/lib/db";
import SubscriptionModel from "@/models/Subscription";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const {
      name,
      description,
      type,
      price,
      currency,
      billingCycle,
      benefits,
      options,
      bundledItems,
    } = body;

    // Validación base
    if (!name || !description || !type) {
      return NextResponse.json(
        { message: "Missing required base fields (name, description, type)" },
        { status: 400 }
      );
    }

    // Validaciones según el tipo de suscripción
    if (type === "simple") {
      if (
        price === undefined ||
        !currency ||
        !billingCycle ||
        !benefits ||
        !Array.isArray(benefits)
      ) {
        return NextResponse.json(
          { message: "Missing required fields for 'simple' subscription" },
          { status: 400 }
        );
      }
    }

    if (type === "variable") {
      if (!options || !Array.isArray(options) || options.length === 0) {
        return NextResponse.json(
          { message: "Missing or invalid 'options' for 'variable' subscription" },
          { status: 400 }
        );
      }
    }

    if (type === "bundled") {
      if (
        !bundledItems ||
        !Array.isArray(bundledItems) ||
        bundledItems.length === 0
      ) {
        return NextResponse.json(
          { message: "Missing or invalid 'bundledItems' for 'bundled' subscription" },
          { status: 400 }
        );
      }
    }

    const newSubscription = new SubscriptionModel({
      name,
      description,
      type,
      price,
      currency,
      billingCycle,
      benefits,
      options,
      bundledItems,
    });

    await newSubscription.save();

    return NextResponse.json(
      {
        message: "Subscription created successfully",
        subscription: newSubscription,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
