import User from "@/models/User";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { RouteContext } from "@/utils/interfaces";

export async function DELETE(req: Request, context: RouteContext) {
try {
	await dbConnect();

	const { id } = await context.params;

	if (!id) {
	return NextResponse.json({ message: "ID is required" }, { status: 400 });
	}

	const deleteUser = await User.findByIdAndDelete(id);
	if (!deleteUser) {
	return NextResponse.json({ message: "User not found" }, { status: 400 });
	}

	return NextResponse.json(
	{ message: "User deleted successfully" },
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

	const user = await User.findById(id);
	if (user) {
	return NextResponse.json(
		{
		mesaage: "User found successfully",
		user,
		},
		{ status: 200 }
	);
	} else {
	return NextResponse.json({ mesaage: "User not found" }, { status: 400 });
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
		const user = await User.findById(id);
		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}
		
		if (body.password) {
			const isSamePassword = bcrypt.compareSync(body.password, user.password);
			if (!isSamePassword) {
				body.password = bcrypt.hashSync(body.password, 10);
			}
		}


		await User.findByIdAndUpdate(id,body);

		return NextResponse.json(
			{ message: " User update successfully" },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal Server Error", error },
			{ status: 500 }
		);
	}
}