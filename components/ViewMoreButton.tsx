'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const ViewMoreButton = (props: { id: string }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleClick = async () => {
    if (!session?.user?.role) {
      console.error('No user session or role');
      return;
    }

    router.push(`/${session.user.role}/courses/${props.id}`);
  };

  return (
    <Button className="w-full" variant={'default'} onClick={handleClick}>
      View More
    </Button>
  );
};

export default ViewMoreButton;
