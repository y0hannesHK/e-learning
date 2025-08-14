import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import StudentDashboard from '@/components/StudentDashboard';
import { getEnrolledCourses, getUnenrolledCourses } from '@/lib/dbServices';
import { getServerSession } from 'next-auth';

export default async function StudentsPage() {
  const session = await getServerSession(authOptions);
  const courses = await getEnrolledCourses(session?.user.id);
  const unenrolledCourses = await getUnenrolledCourses(session?.user.id);
  return (
    <StudentDashboard courses={courses} unenrolledCourses={unenrolledCourses} />
  );
}
