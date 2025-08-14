import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { ProfileCard } from './ProfileCard';

interface SidebarProps {
  items: {
    title: string;
    url: string;
    icon: any;
  }[];
}

export default function Sidebar({ items }: SidebarProps) {
  return (
    <NavigationMenu orientation="vertical" className="flex flex-col gap-4">
      <ProfileCard />

      <NavigationMenuList className="flex flex-col gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavigationMenuItem key={item.title}>
              <Link href={item.url}>
                <Button variant="ghost" className="w-full justify-start">
                  <Icon /> {item.title}
                </Button>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
