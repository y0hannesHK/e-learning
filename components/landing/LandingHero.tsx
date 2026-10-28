import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import heroImage from '@/public/images/hero_section_image.avif';
import { cn } from '@/lib/utils';
import { heroPerks } from './content';
import { LandingSection } from './LandingSection';
import { focusRing } from './styles';

export function LandingHero() {
  return (
    <LandingSection className="bg-gradient-to-br from-emerald-50 via-white to-teal-50">
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
              Join over 100,000 learners worldwide. Access premium courses, earn
              certificates, and advance your career with our comprehensive
              e-learning platform.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              className={cn(
                'inline-flex items-center rounded-sm bg-emerald-600 p-2 text-white hover:bg-emerald-700',
                focusRing,
              )}
              href="/api/auth/signin"
            >
              <Play className="mr-2 h-4 w-4" aria-hidden="true" />
              Start Learning Free
            </Link>
            <Button type="button" variant="outline" size="lg">
              Browse Courses
            </Button>
          </div>
          <ul className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {heroPerks.map((perk) => (
              <li key={perk} className="flex items-center gap-1">
                <CheckCircle
                  className="h-4 w-4 text-emerald-600"
                  aria-hidden="true"
                />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <Image
            alt="Students learning online"
            className="aspect-video overflow-hidden rounded-xl object-cover shadow-2xl"
            height={400}
            priority
            src={heroImage}
            width={600}
          />
        </div>
      </div>
    </LandingSection>
  );
}
