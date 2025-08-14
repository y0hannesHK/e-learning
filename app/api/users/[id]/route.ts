import { updateUserSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

interface Props {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'error' }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}

// dev - needs futher logic
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  // check if user in in db
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return NextResponse.json({ error: 'no user found' }, { status: 404 });
  }

  // hanlde request
  const body = await request.json();
  const validate = updateUserSchema.safeParse(body);
  if (!validate.success) {
    return NextResponse.json({ error: 'invalid credentials' }, { status: 404 });
  }

  // update user
  const updateUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      firstName: validate.data.firstName,
      lastName: validate.data.lastName,
      email: validate.data.email,
      // dev  i think role shouldn't be changed
      // role: validate.data.role,
      // dev - to be inclded after change password page
      // hashedPassword: bcrypt.hash(validate.data.password, 10)
    },
  });
  return NextResponse.json(updateUser, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  // check if user's in db
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user) {
    return NextResponse.json({ error: 'error' }, { status: 404 });
  }

  // delete user
  const deletedUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deletedUser, { status: 200 });
}
