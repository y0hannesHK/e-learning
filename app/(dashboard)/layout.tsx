import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Menu,
  LayoutDashboard, // dashboard
  BookOpen, // course
  ShieldCheck, // certificate
  Settings, // setting
  Users, // user
  UserCheck, // approval
  ClipboardList, // task
  FileBarChart, // taksk
  User, // user
  GraduationCap, // instructor
  BarChart3, // analytics
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import { SidebarProvider } from '@/components/ui/sidebar';

const studentDashboardList = [
  {
    title: 'Dashboard',
    url: '/student',
    icon: LayoutDashboard,
  },
  {
    title: 'My Courses',
    url: '/student/courses',
    icon: BookOpen,
  },
  {
    title: 'Certificates',
    url: '/student/certificates',
    icon: ShieldCheck,
  },
  {
    title: 'Settings',
    url: '/student/settings',
    icon: Settings,
  },
];

const instructorDashboardList = [
  {
    title: 'Dashboard',
    url: '/instructor',
    icon: LayoutDashboard,
  },
  {
    title: 'My Courses',
    url: '/instructor/courses',
    icon: BookOpen,
  },
  {
    title: 'Assignments',
    url: '/instructor/assignments',
    icon: ClipboardList,
  },
  {
    title: 'Settings',
    url: '/instructor/settings',
    icon: Settings,
  },
];

const adminDashboardList = [
  {
    title: 'Dashboard',
    url: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    url: '/admin/users',
    icon: User,
  },
  {
    title: 'Courses',
    url: '/admin/courses',
    icon: BookOpen,
  },
  {
    title: 'Settings',
    url: '/admin/settings',
    icon: Settings,
  },
];

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);
  let items = adminDashboardList;
  switch (session?.user.role) {
    case 'admin':
      items = adminDashboardList;
      break;
    case 'student':
      items = studentDashboardList;
      break;
    case 'instructor':
      items = instructorDashboardList;
      break;
    default:
      break;
  }
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[250px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block border-r border-gray-200 p-4 bg-white">
        <SidebarProvider>
          <AppSidebar navigationItems={items} />
        </SidebarProvider>
      </aside>

      <div className="flex flex-col">
        <NavBar />

        {/* Main content */}
        <main className="p-4 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
}
