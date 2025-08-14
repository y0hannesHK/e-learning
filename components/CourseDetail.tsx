'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import EnrollButton from './EnrollButton';
import Link from 'next/link';
import { Course } from '@/types/model_types';

const CourseDetail = ({ course }: { course: Course }) => {
  const { data: session } = useSession();
  const [isEnrolledInCourse, setIsEnrolledInCourse] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (session?.user.role === 'student') {
        // dev - take this logic to debService and import form there
        const res = await fetch(`/api/users/${session.user.id}/enrollments`);
        const enrolledCourses: Course[] = await res.json();
        const isEnrolled = enrolledCourses.some((c) => c.id === course.id);
        setIsEnrolledInCourse(isEnrolled);
      }
    };
    checkEnrollment();
  }, [session, course.id]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-gray-700 mb-6">{course.description}</p>

      <div className="text-sm text-gray-500 m-2">
        <p>
          <span className="font-medium">Instructor ID:</span>{' '}
          {course.instructorId}
        </p>
        <p>
          <span className="font-medium">Course ID:</span> {course.id}
        </p>
      </div>

      {/**
       * this link is visible for
       * students when they are enrolled
       * instructors - is always vissible as isEnrolledInCourse = false
       */}

      <div className="border-black flex justify-around">
        {isEnrolledInCourse === false && session?.user.role === 'student' && (
          <EnrollButton studentId={session.user.id} courseId={course.id} />
        )}

        {!isEnrolledInCourse && (
          <Link
            href={`/${session?.user.role}/courses/${course.id}/lessons`}
            className=" p-2 text-white border-black bg-emerald-600 hover:bg-emerald-500 rounded-sm"
          >
            View Lessons
          </Link>
        )}

        {
          // if role role === 'instructor'display link to edit page
          session?.user.role === 'instructor' && (
            <Link
              href={`${course.id}/edit`}
              className=" p-2 text-white border-black bg-emerald-400 hover:bg-emerald-300 rounded-sm"
            >
              Edit
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default CourseDetail;
