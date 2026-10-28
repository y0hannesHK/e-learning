import { BookOpen } from 'lucide-react';

type LearnHubMarkProps = {
  iconClassName?: string;
  textClassName?: string;
};

export function LearnHubMark({
  iconClassName = 'h-8 w-8 text-emerald-600',
  textClassName = 'ml-2 text-2xl font-bold text-gray-900',
}: LearnHubMarkProps) {
  return (
    <>
      <BookOpen aria-hidden="true" className={iconClassName} />
      <span className={textClassName}>LearnHub</span>
    </>
  );
}
