import CourseList from './CourseList';
import { ProfileCard } from './ProfileCard';
import { Course } from '@/types/model_types';

export default function AdminDashboard({ courses }: { courses: Course[] }) {
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-6">Courses</h1>

      <CourseList courses={courses} />
    </main>
  );
}
