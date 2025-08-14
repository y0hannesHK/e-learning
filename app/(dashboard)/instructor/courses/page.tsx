import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CourseList from '@/components/CourseList';
import { getCreatededCourses } from '@/lib/dbServices';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';

const CreatedCoursesPage = async () => {
  const session = await getServerSession(authOptions);
  const courses = await getCreatededCourses(session?.user.id);

  return (
    <main className="p-4 md:p-6">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold mb-6 grow">Created Courses</h1>
        <div className="grow">
          <Link
            href={'/instructor/courses/new'}
            className="border-gray-500 hover:border-black"
          >
            Create Course
          </Link>
        </div>
      </div>
      <CourseList courses={courses} />
    </main>
  );
};

export default CreatedCoursesPage;
