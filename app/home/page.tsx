'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  BookOpen,
  Users,
  Award,
  Clock,
  Star,
  Play,
  CheckCircle,
  Globe,
  Smartphone,
  Trophy,
  Menu,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import heroImage from '@/public/images/hero_section_image.avif';

export default function ELearningLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="/home">
          <BookOpen className="h-8 w-8 text-emerald-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">
            LearnHub
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-6">
          <Link
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
            href="/login"
          >
            Courses
          </Link>
          {/* <Link
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
            href="#features"
          >
            Features
          </Link> */}
          <Link
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
            href="/home/pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
            href="/home/about"
          >
            About
          </Link>
        </nav>
        <div className="ml-4 flex items-center gap-2">
          <Link
            href="/login"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-sm"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-1.5 rounded-sm"
          >
            Sign Up
          </Link>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    🚀 New: AI-Powered Learning Paths
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Master New Skills with{' '}
                    <span className="text-emerald-600">Expert-Led</span> Online
                    Courses
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Join over 100,000 learners worldwide. Access premium
                    courses, earn certificates, and advance your career with our
                    comprehensive e-learning platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="text-white p-2 bg-emerald-600 hover:bg-emerald-700 rounded-sm inline-flex items-center"
                    href={'/api/auth/signin'}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Learning Free
                  </Link>
                  <Button variant="outline" size="lg">
                    Browse Courses
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Free trial</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="Students learning online"
                  className="aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
                  height="400"
                  src={heroImage}
                  width="600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 bg-white border-y">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">100K+</div>
                <div className="text-sm text-gray-500">Active Learners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-sm text-gray-500">Expert Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">50K+</div>
                <div className="text-sm text-gray-500">Certificates Earned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">4.8★</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-emerald-100 text-emerald-800">
                  Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to Succeed
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools and resources you need to
                  learn effectively and achieve your goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Globe className="mx-auto h-12 w-12 text-emerald-600" />
                  <CardTitle>Learn Anywhere</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Access your courses from any device, anywhere in the world.
                    Learn at your own pace with offline downloads.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Users className="mx-auto h-12 w-12 text-emerald-600" />
                  <CardTitle>Expert Instructors</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Learn from industry professionals and subject matter experts
                    with years of real-world experience.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Award className="mx-auto h-12 w-12 text-emerald-600" />
                  <CardTitle>Certificates</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Earn verified certificates upon completion to showcase your
                    new skills to employers and peers.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Clock className="mx-auto h-12 w-12 text-emerald-600" />
                  <CardTitle>Self-Paced Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Study on your schedule with lifetime access to course
                    materials and regular content updates.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Smartphone className="mx-auto h-12 w-12 text-emerald-600" />
                  <CardTitle>Mobile Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Optimized mobile apps for iOS and Android. Learn during
                    commutes or whenever you have spare time.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Trophy className="mx-auto h-12 w-12 text-emerald-600" />
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Monitor your learning journey with detailed analytics,
                    achievements, and personalized recommendations.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Popular Courses Section */}
        <section id="courses" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-emerald-100 text-emerald-800">
                  Popular Courses
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Your Learning Journey Today
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose from our most popular courses across technology,
                  business, design, and more.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    alt="Web Development Course"
                    className="object-cover"
                    fill
                    src="/blog-web-development.png"
                  />
                  <Badge className="absolute top-2 left-2 bg-emerald-600">
                    Bestseller
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Development</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9</span>
                    </div>
                  </div>
                  <CardTitle>Complete Web Development Bootcamp</CardTitle>
                  <CardDescription>
                    Master HTML, CSS, JavaScript, React, and Node.js in this
                    comprehensive course.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-emerald-600">
                      $89
                    </div>
                    <div className="text-sm text-gray-500">
                      40 hours • 1,234 students
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    alt="Data Science Course"
                    className="object-cover"
                    fill
                    src="/-zhp9k.png"
                  />
                  <Badge className="absolute top-2 left-2 bg-orange-600">
                    New
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Data Science</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  <CardTitle>Data Science & Machine Learning</CardTitle>
                  <CardDescription>
                    Learn Python, pandas, scikit-learn, and build real-world ML
                    projects.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-emerald-600">
                      $129
                    </div>
                    <div className="text-sm text-gray-500">
                      60 hours • 856 students
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    alt="Digital Marketing Course"
                    className="object-cover"
                    fill
                    src="/placeholder-82kie.png"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Marketing</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.7</span>
                    </div>
                  </div>
                  <CardTitle>Digital Marketing Mastery</CardTitle>
                  <CardDescription>
                    Master SEO, social media, PPC, and content marketing
                    strategies.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-emerald-600">
                      $79
                    </div>
                    <div className="text-sm text-gray-500">
                      25 hours • 2,156 students
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="lg">
                View All Courses
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-emerald-100 text-emerald-800">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Students Say
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of successful learners who have transformed
                  their careers with our courses.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-3">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/professional-woman-smiling.png" />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Sarah Johnson</div>
                      <div className="text-sm text-gray-500">
                        Software Developer
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    "The web development course completely changed my career.
                    The instructors are amazing and the content is always
                    up-to-date. I landed my dream job within 3 months!"
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/professional-man-smiling.png" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Michael Rodriguez</div>
                      <div className="text-sm text-gray-500">Data Analyst</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    "I was able to transition from marketing to data science
                    thanks to the comprehensive courses here. The hands-on
                    projects really prepared me for real-world challenges."
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/professional-woman-entrepreneur.png" />
                      <AvatarFallback>EL</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">Emily Liu</div>
                      <div className="text-sm text-gray-500">
                        Marketing Manager
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    "The digital marketing course gave me the skills I needed to
                    grow my business. The ROI strategies I learned increased our
                    revenue by 200% in just 6 months!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Ready to Start Your Learning Journey?
                </h2>
                <p className="max-w-[600px] text-emerald-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join over 100,000 students worldwide and start building the
                  skills you need to succeed in your career.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-lg flex-1 bg-white/10 border-white/20 text-white placeholder:text-emerald-100"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-emerald-600 hover:bg-gray-100"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-emerald-100">
                  Start with a free trial. No credit card required.{' '}
                  <Link href="/terms" className="underline underline-offset-2">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Start Free Trial
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Browse Courses
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <span className="text-lg font-bold">LearnHub</span>
          </div>
          <p className="text-xs text-gray-500">
            © 2025 LearnHub. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Privacy Policy
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Terms of Service
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Contact
            </Link>
            <Link
              className="text-xs hover:underline underline-offset-4"
              href="#"
            >
              Help Center
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
