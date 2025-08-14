import { BookOpen, LucideProps } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { ProfileCard } from '@/components/profile-card';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Navigation items
// const navigationItems = [
//   {
//     title: 'Dashboard',
//     url: '/dashboard',
//     icon: Home,
//   },
//   {
//     title: 'My Courses',
//     url: '/courses',
//     icon: BookOpen,
//   },
//   {
//     title: 'Browse Courses',
//     url: '/browse',
//     icon: Video,
//   },
//   {
//     title: 'Certificates',
//     url: '/certificates',
//     icon: Trophy,
//   },
//   {
//     title: 'Schedule',
//     url: '/schedule',
//     icon: Calendar,
//   },
//   {
//     title: 'Messages',
//     url: '/messages',
//     icon: MessageSquare,
//   },
// ];

// const learningItems = [
//   {
//     title: 'Progress',
//     url: '/progress',
//     icon: BarChart3,
//   },
//   {
//     title: 'Instructors',
//     url: '/instructors',
//     icon: Users,
//   },
//   {
//     title: 'Achievements',
//     url: '/achievements',
//     icon: GraduationCap,
//   },
// ];

// const accountItems = [
//   {
//     title: 'Settings',
//     url: '/settings',
//     icon: Settings,
//   },
// ];

interface AppSidebarProps {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
}

export async function AppSidebar({
  navigationItems,
}: {
  navigationItems: AppSidebarProps[];
}) {
  const session = await getServerSession(authOptions);
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <BookOpen className="h-8 w-8 text-emerald-600" />
          <Link href="/home">
            <span className="text-xl font-bold text-gray-900">LearnHub</span>
          </Link>
        </div>
        <ProfileCard
          name={session?.user.name}
          role={session?.user.role}
          image="/professional-woman-smiling.png"
          email={session?.user.email}
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* <SidebarGroup>
          <SidebarGroupLabel>Learning</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {learningItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}

        {/* <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2 text-xs text-gray-500 text-center">
          © {new Date().getUTCFullYear()} LearnHub
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
