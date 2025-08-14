import CourseList from './CourseList';
import { Course } from '@/types/model_types';

export default function StudentDashboard({
  courses,
  unenrolledCourses,
}: {
  courses: Course[];
  unenrolledCourses: Course[];
}) {
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Enrolled Courses</h1>

      <CourseList courses={courses} />
      <h1 className="text-2xl font-bold mb-6">Explore</h1>

      <CourseList courses={unenrolledCourses} />
    </main>
  );
}
