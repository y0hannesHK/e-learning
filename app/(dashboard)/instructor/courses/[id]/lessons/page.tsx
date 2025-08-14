import LessonList from '@/components/LessonList';
import { Lesson } from '@/types/model_types';
import React from 'react';
import { getLessonsByCourseId } from '@/lib/dbServices';

interface Props {
  params: {
    id: string;
  };
}

const LessonPage = async ({ params: { id } }: Props) => {
  const lessons: Lesson[] = await getLessonsByCourseId(id);
  return <LessonList lessons={lessons} />;
};

export default LessonPage;
