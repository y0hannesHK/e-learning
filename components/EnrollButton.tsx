'use client';

import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface EnrollButtonProps {
  studentId: string;
  courseId: string;
}

const EnrollButton = ({ studentId, courseId }: EnrollButtonProps) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/enrollments', {
        method: 'POST',
        cache: 'no-store',
        // dev - vairable in zod and here must be the same
        body: JSON.stringify({ studentId: studentId, courseId: courseId }),
      });

      if (res.ok) {
        router.push('/student/courses');
      } else {
        const error = await res.json();
        console.error('Enrollment failed:', error);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  return <Button onClick={handleClick}>Enroll</Button>;
};

export default EnrollButton;
