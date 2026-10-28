import type { Metadata } from 'next';
import { LandingCourses } from '@/components/landing/LandingCourses';
import { LandingCta } from '@/components/landing/LandingCta';
import { LandingFeatures } from '@/components/landing/LandingFeatures';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { LandingHero } from '@/components/landing/LandingHero';
import { LandingStats } from '@/components/landing/LandingStats';
import { LandingTestimonials } from '@/components/landing/LandingTestimonials';
import { focusRing } from '@/components/landing/styles';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'LearnHub',
  description:
    'Join over 100,000 learners worldwide. Access premium courses, earn certificates, and advance your career with our comprehensive e-learning platform.',
};

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className={cn(
          'sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-emerald-700',
          focusRing,
        )}
      >
        Skip to content
      </a>
      <LandingHeader />
      <main id="main-content" className="flex-1">
        <LandingHero />
        <LandingStats />
        <LandingFeatures />
        <LandingCourses />
        <LandingTestimonials />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
