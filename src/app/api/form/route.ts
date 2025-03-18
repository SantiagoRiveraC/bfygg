import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const { name, profession } = await request.json();
    return NextResponse.json({ message: `Hello ${name}, your profession is ${profession}` });
}