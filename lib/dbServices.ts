import { prisma } from '@/prisma/client';
import {
  Course,
  Enrollment,
  Certificate,
  Review,
  ProgressTracking,
  Subscription,
  User,
} from '@/types/model_types';

// fetch courses that a student has been enrolled
export async function getEnrolledCourses(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${id}/enrollments/`,
      {
        cache: 'no-store', // Opt-out of Next.js fetch cache if data changes frequently
        // Or use next: { revalidate: 3600 } to revalidate every hour
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to fetch courses: ${response.statusText}`
      );
    }

    const data: Course[] = await response.json();

    // console.log(data, session);
    return data;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
}

// fetch all courses created by instructor
export async function getCreatededCourses(id: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/users/${id}/courses`,
      {
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to fetch courses: ${response.statusText}`
      );
    }

    const data: Course[] = await response.json();

    // dev -  console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
}

// fetch all users
export async function getAllUsers() {
  try {
    const response = await fetch(`http://localhost:3000/api/users`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Failed to fetch all courses: ${response.statusText}`
      );
    }

    const data: User[] = await response.json();

    // dev -  console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
}

// fetch all courses
export async function getAllCourses() {
  try {
    const response = await fetch(`http://localhost:3000/api/courses`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `Failed to fetch all courses: ${response.statusText}`
      );
    }

    const data: Course[] = await response.json();

    // dev -  console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
}

// dev - need body
// create course by instructor
export async function createCourse(
  title: string,
  description: string,
  instructorId: string
) {
  try {
    const response = await fetch(`http://localhost:3000/api/courses`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to fetch courses: ${response.statusText}`
      );
    }

    const data: Course[] = await response.json();

    // dev -  console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
}

// dev - need body
// enroll in course
export async function enrollInCourse(
  title: string,
  description: string,
  instructorId: string
) {
  try {
    const response = await fetch(`http://localhost:3000/api/courses`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Failed to fetch courses: ${response.statusText}`
      );
    }

    const data: Course[] = await response.json();

    // dev -  console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching all courses:', error);
    throw error;
  }
}

// fetch acourse with id
export async function getCourseById(id: string): Promise<Course | null> {
  const res = await fetch(`http://localhost:3000/api/courses/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res.ok) return null;
  return res.json();
}

export async function getUnenrolledCourses(
  studentId: string
): Promise<Course[]> {
  const allCourses = await getAllCourses();
  const enrolledCourses = await getEnrolledCourses(studentId);

  const enrolledCourseIds = new Set(enrolledCourses.map((course) => course.id));

  const unenrolledCourses = allCourses.filter(
    (course) => !enrolledCourseIds.has(course.id)
  );

  return unenrolledCourses;
}

export async function getLessonsByCourseId(courseId: string) {
  const lessons = prisma.lesson.findMany({
    where: { courseId },
    orderBy: { orderIndex: 'asc' },
  });
  return lessons;
}

export async function getLessonByLessonId(lessonId: string) {
  const res = await fetch(`http://localhost:3000/api/lessons/${lessonId}`);
  if (!res.ok) throw new Error('Failed to fetch lesson');
  const data = await res.json();
  return data;
}

export async function checkEnrollment(studentId: string, courseId: string) {
  const res = await prisma.enrollment.findFirst({
    where: {
      AND: [{ courseId: courseId }, { studentId: studentId }],
    },
  });
  if (!res) throw new Error('Failed to fetch lesson');
  else return true;
}
