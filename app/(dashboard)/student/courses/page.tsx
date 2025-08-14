import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CourseList from '@/components/CourseList';
import { getEnrolledCourses } from '@/lib/dbServices';
import { getServerSession } from 'next-auth';
import React from 'react';

const EnrolledCoursesPage = async () => {
  const session = await getServerSession(authOptions);
  const courses = await getEnrolledCourses(session?.user.id);
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Enrolled Courses</h1>
      <CourseList courses={courses} />
    </main>
  );
};

export default EnrolledCoursesPage;
