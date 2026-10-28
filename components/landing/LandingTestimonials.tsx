import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { testimonials } from './content';
import { LandingSection } from './LandingSection';
import { Rating } from './Rating';
import { SectionIntro } from './SectionIntro';

export function LandingTestimonials() {
  return (
    <LandingSection
      id="testimonials"
      ariaLabelledBy="testimonials-heading"
      className="bg-gray-50"
    >
      <SectionIntro
        eyebrow="Testimonials"
        title="What Our Students Say"
        description="Join thousands of successful learners who have transformed their careers with our courses."
        titleId="testimonials-heading"
      />
      <ul className="mx-auto grid max-w-6xl gap-6 py-12 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li key={testimonial.name}>
            <Card className="h-full border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={testimonial.avatarSrc}
                      alt=""
                    />
                    <AvatarFallback>{testimonial.avatarFallback}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <Rating value={5} />
              </CardHeader>
              <CardContent>
                <blockquote>
                  <p className="text-gray-600">{testimonial.quote}</p>
                </blockquote>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}
