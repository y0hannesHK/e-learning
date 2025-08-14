import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ViewMoreButton from './ViewMoreButton';
import { Course } from '@/types/model_types';

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No courses available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <Card
          key={`${course.title}-${index}`}
          className="hover:shadow-lg transition-shadow flex flex-col h-full"
        >
          <CardHeader>
            <CardTitle className="text-xl">{course.title}</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-muted-foreground mb-4">{course.description}</p>

            {/* ViewMoreButton fixed at bottom */}
            <div className="mt-auto">
              <ViewMoreButton id={course.id} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
