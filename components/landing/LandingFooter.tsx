import Link from 'next/link';
import { cn } from '@/lib/utils';
import { footerNav } from './content';
import { LearnHubMark } from './LearnHubMark';
import { focusRing } from './styles';

export function LandingFooter() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-gray-50 px-4 py-6 sm:flex-row md:px-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <LearnHubMark
            iconClassName="h-6 w-6 text-emerald-600"
            textClassName="text-lg font-bold"
          />
        </div>
        <p className="text-xs text-gray-500">
          © 2025 LearnHub. All rights reserved.
        </p>
        <nav aria-label="Footer" className="flex gap-4 sm:gap-6">
          <ul className="flex gap-4 sm:gap-6">
            {footerNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    'rounded-sm text-xs hover:underline underline-offset-4',
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
