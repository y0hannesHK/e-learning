import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { features } from './content';
import { LandingSection } from './LandingSection';
import { SectionIntro } from './SectionIntro';

export function LandingFeatures() {
  return (
    <LandingSection
      id="features"
      ariaLabelledBy="features-heading"
      className="bg-gray-50"
    >
      <SectionIntro
        eyebrow="Features"
        title="Everything You Need to Succeed"
        description="Our platform provides all the tools and resources you need to learn effectively and achieve your goals."
        titleId="features-heading"
      />
      <ul className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <li key={feature.title}>
              <Card className="border-0 shadow-lg">
                <CardHeader className="text-center">
                  <Icon
                    className="mx-auto h-12 w-12 text-emerald-600"
                    aria-hidden="true"
                  />
                  <h3 className="font-semibold leading-none">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </li>
          );
        })}
      </ul>
    </LandingSection>
  );
}
