import React from 'react';
import EditLessonForm from '@/components/EditLessonForm';
import { getLessonByLessonId } from '@/lib/dbServices';

/**
 * dev - changing the params propery form 'id' to 'lessonId' makes it work, but
 * idk why the convectin works inside the child folder of dynamic route folder like [lessonId],
 * ranter than its direct child file
 */
interface Props {
  params: {
    id: string;
    lessonId: string;
  };
}

const EditLessonPage = async ({ params }: Props) => {
  const lesson = await getLessonByLessonId(params.lessonId);
  return <EditLessonForm lesson={lesson} courseId={params.id} />;
};

export default EditLessonPage;
