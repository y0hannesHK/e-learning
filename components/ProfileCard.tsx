import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { UserIcon, Shield } from 'lucide-react';
import { getServerSession } from 'next-auth';

interface ProfileCardProps {
  name: string;
  role: string;
}

export async function ProfileCard() {
  const session = await getServerSession(authOptions);
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md">
      <CardHeader className="flex flex-col items-center text-center space-y-2">
        <div className="bg-gray-100 rounded-full p-3">
          <UserIcon className="h-8 w-8 text-gray-600" />
        </div>
        <CardTitle>{session?.user.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          {session?.user.role}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
