import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// components/HeroSection.tsx
export default async function HeroSection() {
  const session = await getServerSession(authOptions);
  return (
    <section
      className="relative h-screen bg-cover bg-center bg-no-repeat bg-gray-100"
      style={{
        backgroundImage: "url('/learn-hero-section.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Empower Your Learning Journey
        </h1>
        <p className="text-lg md:text-2xl mb-6 max-w-2xl">
          Join thousands of learners and take your skills to the next level with
          our expert-led courses.
        </p>
        <Link
          href={session ? `/${session.user.role}` : '/api/auth/signin'}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Browse Courses
        </Link>
      </div>
    </section>
  );
}
