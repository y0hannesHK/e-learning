import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail } from 'lucide-react';
import placeHolderImage from '@/public/images/placeholder-image.jpg';

interface ProfileCardProps {
  name: string;
  role: string;
  image?: string;
  email: string;
}

export function ProfileCard({ name, role, image, email }: ProfileCardProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <Card className="mx-2 mb-2 bg-emerald-100">
      <CardContent className="p-1">
        <div className="flex flex-col items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={image! ?? placeHolderImage} alt={name} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 text-center">
            <h3 className="font-semibold text-sm">{name}</h3>
            <Badge variant="secondary" className="text-xs mt-1 mx-auto">
              {role}
            </Badge>
            <div className="flex items-center justify-center gap-1 mt-1 truncate">
              <Mail className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500">
                <a href={`mailto:${email}`} className="break-all">
                  {email}
                </a>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
