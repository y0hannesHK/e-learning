import CourseList from './CourseList';
import Link from 'next/link';
import { Course } from '@/types/model_types';
import { ProfileCard } from './profile-card';

export default function InstructorDashboard({
  courses,
}: {
  courses: Course[];
}) {
  return (
    <main className="p-4 md:p-6">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold mb-6 grow">Created Courses</h1>
        <div className="grow">
          <Link
            href={'/instructor/courses/new'}
            className="text-white p-2 bg-emerald-600 border-gray-500 hover:bg-emerald-500 rounded-sm"
          >
            Create Course
          </Link>
        </div>
      </div>
      <CourseList courses={courses} />
    </main>
  );
}
