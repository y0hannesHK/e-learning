'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { primaryNav } from './content';
import { LearnHubMark } from './LearnHubMark';
import { focusRing } from './styles';

const authLinkClassName = cn(
  'inline-flex shrink-0 items-center whitespace-nowrap rounded-sm bg-emerald-600 p-1.5 text-white hover:bg-emerald-700',
  focusRing,
);

export function LandingHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="flex h-16 items-center border-b bg-white/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/60 lg:px-6">
        <Link
          href="/home"
          aria-current="page"
          className={cn('flex items-center justify-center rounded-sm', focusRing)}
        >
          <LearnHubMark />
        </Link>
        <nav className="ml-auto hidden md:block" aria-label="Primary">
          <ul className="flex gap-6">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-emerald-600',
                    focusRing,
                    'rounded-sm',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-4">
          <Link href="/login" className={authLinkClassName}>
            Sign In
          </Link>
          <Link href="/register" className={authLinkClassName}>
            Sign Up
          </Link>
          <Button
            ref={menuButtonRef}
            type="button"
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="mobile-primary-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </Button>
        </div>
      </div>
      <nav
        id="mobile-primary-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-b bg-white px-4 py-2 md:hidden"
      >
        <ul className="flex flex-col">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'block rounded-sm py-2 text-sm font-medium transition-colors hover:text-emerald-600',
                  focusRing,
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
