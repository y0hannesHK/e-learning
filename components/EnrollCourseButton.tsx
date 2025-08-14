'use client';

import { Button } from '@/components/ui/button';

export default function EnrollCourseButton() {
  const handleEnroll = () => {
    // Example: enroll user in a course
    console.log('Enroll clicked');
  };

  return (
    <Button onClick={handleEnroll} variant="secondary">
      Enroll in Course
    </Button>
  );
}
