import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST() {
  try {
    await dbConnect();


    const defaultUser = new User({
        name: 'John Doe',
        profession: 'Software Engineer',
    });

    await defaultUser.save();

    return NextResponse.json(
      { message: 'Default user created successfully', user: defaultUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating default user', error: error.message },
      { status: 500 }
    );
  }
}