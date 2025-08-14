import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Users, Star, Play, BookOpen } from 'lucide-react';
import Image from 'next/image';
import placeHolderImage from '@/public/images/placeholder-image.jpg';

// dev - his fields are to be included in db
interface Course {
  courseId: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  instructorImage: string;
  category: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
  thumbnail: string;
  level: string;
}

const courses: Course[] = [
  {
    courseId: 'WD001',
    title: 'Complete Web Development Bootcamp',
    description:
      'Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive full-stack development course. Build real-world projects and deploy them to production.',
    instructorId: 'INS001',
    instructorName: 'John Smith',
    instructorImage: '/professional-man-smiling.png',
    category: 'Development',
    duration: '40 hours',
    students: 1234,
    rating: 4.9,
    progress: 65,
    thumbnail: '/blog-web-development.png',
    level: 'Beginner',
  },
  {
    courseId: 'DS002',
    title: 'Data Science & Machine Learning',
    description:
      'Learn Python, pandas, scikit-learn, and TensorFlow. Build predictive models and analyze complex datasets with hands-on projects.',
    instructorId: 'INS002',
    instructorName: 'Dr. Emily Chen',
    instructorImage: '/professional-woman-entrepreneur.png',
    category: 'Data Science',
    duration: '60 hours',
    students: 856,
    rating: 4.8,
    progress: 30,
    thumbnail: '/placeholder.svg?height=200&width=300&text=Data+Science',
    level: 'Intermediate',
  },
  {
    courseId: 'DM003',
    title: 'Digital Marketing Mastery',
    description:
      'Master SEO, social media marketing, PPC advertising, and content marketing. Create effective campaigns that drive real business results.',
    instructorId: 'INS003',
    instructorName: 'Sarah Wilson',
    instructorImage: '/professional-woman-smiling.png',
    category: 'Marketing',
    duration: '25 hours',
    students: 2156,
    rating: 4.7,
    progress: 85,
    thumbnail: '/placeholder.svg?height=200&width=300&text=Digital+Marketing',
    level: 'Beginner',
  },
  {
    courseId: 'UI004',
    title: 'UI/UX Design Fundamentals',
    description:
      'Learn design principles, user research, wireframing, and prototyping. Master Figma and create stunning user interfaces.',
    instructorId: 'INS004',
    instructorName: 'Michael Rodriguez',
    instructorImage: '/professional-man-smiling.png',
    category: 'Design',
    duration: '35 hours',
    students: 945,
    rating: 4.9,
    progress: 15,
    thumbnail: '/placeholder.svg?height=200&width=300&text=UI/UX+Design',
    level: 'Beginner',
  },
];

export function CourseList() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <Card
          key={course.courseId}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="aspect-video relative">
            <Image
              alt={course.title}
              className="object-cover"
              fill
              src={course.thumbnail ?? placeHolderImage}
            />
            <div className="absolute top-2 left-2 flex gap-2">
              <Badge className="bg-emerald-600">{course.category}</Badge>
              <Badge variant="secondary">{course.level}</Badge>
            </div>
            <Button
              size="icon"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 hover:bg-white text-emerald-600"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle className="text-lg leading-tight">
                  {course.title}
                </CardTitle>
                <div className="text-sm text-gray-500 mt-1">
                  Course ID: {course.courseId}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>

            <CardDescription className="line-clamp-3">
              {course.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Instructor Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={course.instructorImage ?? placeHolderImage}
                  alt={course.instructorName}
                />
                <AvatarFallback>
                  {course.instructorName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {course.instructorName}
                </div>
                <div className="text-xs text-gray-500">
                  ID: {course.instructorId}
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{course.students.toLocaleString()}</span>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>

            {/* Action Button */}
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <BookOpen className="mr-2 h-4 w-4" />
              {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
