import React from 'react';
import { getAllCourses } from '@/lib/dbServices';
import CourseList from '@/components/CourseList';

const CoursesList = async () => {
  const courses = await getAllCourses();
  return <CourseList courses={courses} />;
};

export default CoursesList;
