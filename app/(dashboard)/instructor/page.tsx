import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import InstructorDashboard from '@/components/InstructorDashboard';
import { getCreatededCourses } from '@/lib/dbServices';
import { getServerSession } from 'next-auth';
import React from 'react';

const InstructorPage = async () => {
  const session = await getServerSession(authOptions);
  const courses = await getCreatededCourses(session?.user.id);
  return <InstructorDashboard courses={courses} />;
};

export default InstructorPage;
