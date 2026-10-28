import { Badge } from '@/components/ui/badge';

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  titleId: string;
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  titleId,
}: SectionIntroProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <Badge className="bg-emerald-100 text-emerald-800">{eyebrow}</Badge>
        <h2
          id={titleId}
          className="text-3xl font-bold tracking-tighter sm:text-5xl"
        >
          {title}
        </h2>
        <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
