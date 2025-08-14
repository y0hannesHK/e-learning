import LessonList from '@/components/LessonList';
import { getLessonsByCourseId } from '@/lib/dbServices';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const LessonPage = async ({ params: { id } }: Props) => {
  const lessons = await getLessonsByCourseId(id);
  return <LessonList lessons={lessons} />;
};

export default LessonPage;
