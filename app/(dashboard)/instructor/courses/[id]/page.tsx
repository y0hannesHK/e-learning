import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';
import { getCourseById } from '@/lib/dbServices';
import React from 'react';
import CourseDetail from '@/components/CourseDetail';

async function CourseDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  const course = await getCourseById(params.id);
  if (!course || course.instructorId !== session.user.id) {
    notFound();
  }

  return <CourseDetail course={course} />;
}

export default CourseDetailPage;
