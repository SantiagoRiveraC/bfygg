import SubscriptionModel from "@/models/Subscription";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import { RouteContext } from "@/utils/interfaces";

export async function DELETE(req: Request, context: RouteContext) {
  try {
    await dbConnect();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ mesaage: "ID is required" }, { status: 400 });
    }

    const deleteSubscription = await SubscriptionModel.findByIdAndDelete(id);
    if (!deleteSubscription) {
      return NextResponse.json(
        { mesaage: "Subscription not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { mesaage: "Subscription deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, context: RouteContext) {
  try {
    await dbConnect();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ mesaage: "ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const subscription = await SubscriptionModel.findById(id);
    if (!subscription) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    Object.assign(subscription, body);

    await subscription?.save();
    return NextResponse.json(
      { messaje: "Subscription update successfully", subscription },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, context: RouteContext) {
  try {
    await dbConnect();

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ mesaage: "ID is required" }, { status: 400 });
    }
    const subscription = await SubscriptionModel.findById(id);
    if (!subscription) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { messaje: "Subscription get successfully", subscription },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
