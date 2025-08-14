import LessonDetail from '@/components/LessonDetail';
import { getLessonByLessonId, getLessonsByCourseId } from '@/lib/dbServices';
import React from 'react';

interface Props {
  params: {
    id: string;
    lessonId: string;
  };
}

const LessonDetailPage = async ({ params: { id, lessonId } }: Props) => {
  const lessons = await getLessonsByCourseId(id!);
  // console.log(lessons);
  return (
    <LessonDetail
      lessonsInCourse={lessons!}
      courseId={id}
      lessonId={lessonId}
    />
  );
};

export default LessonDetailPage;
