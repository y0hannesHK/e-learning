import { NextRequest, NextResponse } from 'next/server';
import { createUserSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';
import bcrypt from 'bcrypt';

// dev - pagination needed
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany(); // all users
  return NextResponse.json(users, { status: 200 });
}

// create new user
export async function POST(request: NextRequest) {
  // handle request
  const body = await request.json();
  const validate = createUserSchema.safeParse(body);

  if (!validate.success) {
    return NextResponse.json(validate.error, { status: 404 });
  }

  // check if already exists
  const user = await prisma.user.findUnique({
    where: { email: validate.data.email },
  });
  if (user)
    return NextResponse.json({ error: 'user already exist' }, { status: 404 });

  // create user
  const newUser = await prisma.user.create({
    data: {
      firstName: validate.data.firstName,
      lastName: validate.data.lastName,
      email: validate.data.email,
      hashedPassword: await bcrypt.hash(validate.data.password!, 10),
      role: validate.data.role,
      name: validate.data.firstName + ' ' + validate.data.lastName,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}
