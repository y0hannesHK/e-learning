import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditCourseForm from '@/components/EditCourseForm';
import { getCourseById } from '@/lib/dbServices';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

const CourseEditPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  console.log(params.id);
  const course = await getCourseById(params.id);
  if (!course || course.instructorId !== session.user.id) {
    notFound();
  }

  return <EditCourseForm course={course} />;
};

export default CourseEditPage;
