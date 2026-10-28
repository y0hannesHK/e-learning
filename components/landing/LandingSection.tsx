import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type LandingSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
};

export function LandingSection({
  id,
  className,
  children,
  ariaLabel,
  ariaLabelledBy,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn('w-full py-12 md:py-24 lg:py-32', className)}
    >
      <div className="container px-4 md:px-6">{children}</div>
    </section>
  );
}
