'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NavBar = () => {
  const { status, data: session } = useSession();
  // dev - console.log(session);
  return (
    <nav className="w-full flex flex-col md:flex-row items-center justify-between p-4 border-b shadow-sm bg-white gap-3">
      {/* Search Bar */}
      <div className="w-full max-w-md">
        <Input type="text" placeholder="Search courses..." />
      </div>

      {/* Navigation Links */}
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-2">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/instructor">Instructor</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/student">Student</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/admin">Admin</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Session Info and Auth Buttons */}
      <div className="flex items-center gap-4">
        {status === 'authenticated' ? (
          <>
            <p className="text-sm text-muted-foreground">
              Hi, {session.user?.name}
            </p>
            <Button variant="outline" asChild>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="default" asChild>
              <Link href="/api/auth/signin">Login</Link>
            </Button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
