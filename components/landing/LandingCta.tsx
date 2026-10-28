import Link from 'next/link';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LandingSection } from './LandingSection';
import { focusRing } from './styles';
import { cn } from '@/lib/utils';

export function LandingCta() {
  return (
    <LandingSection className="bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
        <div className="space-y-2">
          <h2
            id="get-started-heading"
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            Ready to Start Your Learning Journey?
          </h2>
          <p className="max-w-[600px] text-emerald-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join over 100,000 students worldwide and start building the skills
            you need to succeed in your career.
          </p>
        </div>
        <div className="w-full max-w-sm space-y-2">
          <form className="flex gap-2" aria-labelledby="get-started-heading">
            <label htmlFor="get-started-email" className="sr-only">
              Email address
            </label>
            <Input
              id="get-started-email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              className="max-w-lg flex-1 border-white/20 bg-white/10 text-white placeholder:text-emerald-100"
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
            <Link
              href="/terms"
              className={cn(
                'rounded-sm underline underline-offset-2',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-600',
              )}
            >
              Terms & Conditions
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-4 pt-4 sm:flex-row">
          <Button
            type="button"
            size="lg"
            className="bg-white text-emerald-600 hover:bg-gray-100"
          >
            <Play className="mr-2 h-4 w-4" aria-hidden="true" />
            Start Free Trial
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className={cn(
              'border-white bg-transparent text-white hover:bg-white/10 hover:text-white',
              focusRing,
            )}
          >
            Browse Courses
          </Button>
        </div>
      </div>
    </LandingSection>
  );
}
