import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { courses } from './content';
import { LandingSection } from './LandingSection';
import { Rating } from './Rating';
import { SectionIntro } from './SectionIntro';

export function LandingCourses() {
  return (
    <LandingSection id="courses" ariaLabelledBy="courses-heading">
      <SectionIntro
        eyebrow="Popular Courses"
        title="Start Your Learning Journey Today"
        description="Choose from our most popular courses across technology, business, design, and more."
        titleId="courses-heading"
      />
      <ul className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-3">
        {courses.map((course) => (
          <li key={course.title}>
            <Card className="h-full overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  alt={course.imageAlt}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  src={course.imageSrc}
                />
                {course.badge ? (
                  <Badge
                    className={`absolute top-2 left-2 ${course.badge.className}`}
                  >
                    {course.badge.label}
                  </Badge>
                ) : null}
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Rating value={course.rating} variant="compact" />
                </div>
                <h3 className="font-semibold leading-none">{course.title}</h3>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-emerald-600">
                    {course.price}
                  </p>
                  <p className="text-sm text-gray-500">{course.meta}</p>
                </div>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <Button type="button" variant="outline" size="lg">
          View All Courses
        </Button>
      </div>
    </LandingSection>
  );
}
