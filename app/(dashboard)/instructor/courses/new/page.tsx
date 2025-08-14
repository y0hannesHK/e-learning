import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import CreateCourseForm from '@/components/CreateCourseForm';

const NewCoursePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return <CreateCourseForm instructorId={session.user.id} />;
};

export default NewCoursePage;
