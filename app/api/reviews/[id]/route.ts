import { updateReviewSchema } from '@/types/zod_schema';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

// get single review
export async function GET(request: NextRequest, { params: { id } }: Props) {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: id,
      },
    });

    if (!review) {
      return NextResponse.json({ error: 'error' }, { status: 404 });
    }
    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

// update review
export async function PUT(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if review's in db
    const review = await prisma.review.findUnique({
      where: {
        id: id,
      },
    });
    if (!review) {
      return NextResponse.json({ error: 'review not found' }, { status: 404 });
    }

    // handle request
    const validate = updateReviewSchema.safeParse(await request.json());
    if (!validate.success) {
      return NextResponse.json({ error: validate.error }, { status: 404 });
    }

    // update review
    const updatedReview = await prisma.review.update({
      where: {
        id: id,
      },
      data: {
        comment: validate.data.comment,
        rating: validate.data.rating,
      },
    });
    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    // check if review's in db
    const review = await prisma.review.findUnique({
      where: {
        id: id,
      },
    });
    if (!review) {
      return NextResponse.json({ error: 'review not found' }, { status: 404 });
    }

    // delete review
    const deletedReview = await prisma.review.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(deletedReview, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }
}
