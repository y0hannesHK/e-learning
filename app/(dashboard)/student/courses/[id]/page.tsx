import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect, notFound } from 'next/navigation';
import { getCourseById } from '@/lib/dbServices';
import CourseDetail from '@/components/CourseDetail';

export default async function EnrolledCourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/api/auth/signin');

  const course = await getCourseById(params.id);
  if (!course) notFound();

  return <CourseDetail course={course} />;
}
