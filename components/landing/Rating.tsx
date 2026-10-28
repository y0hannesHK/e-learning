import { Star } from 'lucide-react';

type RatingProps = {
  value: number;
  variant?: 'stars' | 'compact';
};

export function Rating({ value, variant = 'stars' }: RatingProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-1">
        <Star
          aria-hidden="true"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
        <span className="text-sm">{value}</span>
        <span className="sr-only"> out of 5 stars</span>
      </div>
    );
  }

  return (
    <div className="flex" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: value }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      ))}
    </div>
  );
}
