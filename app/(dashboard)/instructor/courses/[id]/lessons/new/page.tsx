import React from 'react';
import CreateLessonForm from '@/components/CreateLessonForm';

interface Props {
  params: {
    id: string;
  };
}

const NewLessonPage = ({ params: { id } }: Props) => {
  return <CreateLessonForm courseId={id} />;
};

export default NewLessonPage;
