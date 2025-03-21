import Suscription from "@/models/Suscription";
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

    const deleteSuscription = await Suscription.findByIdAndDelete(id);
    if (!deleteSuscription) {
      return NextResponse.json(
        { mesaage: "Suscription not found" },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { mesaage: "Suscription deleted successfully" },
        { status: 400 }
      );
    }
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
    const suscription = await Suscription.findById(id);
    if (!suscription) {
      return NextResponse.json(
        { message: "Suscription not found" },
        { status: 404 }
      );
    }

    Object.assign(suscription, body);

    await suscription?.save();
    return NextResponse.json(
      { messaje: "Suscription update successfully", suscription },
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
    const suscription = await Suscription.findById(id);
    if (!suscription) {
      return NextResponse.json(
        { message: "Suscription not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { messaje: "Suscription get successfully", suscription },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
