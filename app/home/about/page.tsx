import { BookOpen, Users, Target, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mb-6">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          We’re on a mission to make learning accessible, engaging, and
          personalized for everyone.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <BookOpen className="mx-auto text-blue-500 mb-3" size={40} />
            <h2 className="font-semibold text-xl mb-2">Our Story</h2>
            <p className="text-gray-600 text-sm">
              Founded with the goal of empowering learners, we’ve built tools
              that make complex topics simple and fun to explore.
            </p>
          </div>

          <div className="text-center">
            <Users className="mx-auto text-green-500 mb-3" size={40} />
            <h2 className="font-semibold text-xl mb-2">Our Community</h2>
            <p className="text-gray-600 text-sm">
              A global network of instructors and students, learning and growing
              together through shared knowledge and collaboration.
            </p>
          </div>

          <div className="text-center">
            <Target className="mx-auto text-purple-500 mb-3" size={40} />
            <h2 className="font-semibold text-xl mb-2">Our Vision</h2>
            <p className="text-gray-600 text-sm">
              To become the leading platform for skill development and
              continuous learning, fostering curiosity and innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
