import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminDashboard from '@/components/AdminDashboard';
import { getAllCourses, getCreatededCourses } from '@/lib/dbServices';
import { getServerSession } from 'next-auth';
import React from 'react';

const InstructorPage = async () => {
  const courses = await getAllCourses();
  return <AdminDashboard courses={courses} />;
};

export default InstructorPage;
