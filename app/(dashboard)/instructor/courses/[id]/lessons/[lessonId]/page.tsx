import LessonDetail from '@/components/LessonDetail';
import { Lesson } from '@/types/model_types';
import React from 'react';
import { getLessonByLessonId } from '@/lib/dbServices';

interface Props {
  params: {
    id: string;
    lessonId: string;
  };
}

const LessonPage = async ({ params }: Props) => {
  const lesson: Lesson = await getLessonByLessonId(params.lessonId);
  return <LessonDetail lesson={lesson} courseId={params.id} />;
};

export default LessonPage;
