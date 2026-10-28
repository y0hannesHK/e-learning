import { stats } from './content';
import { LandingSection } from './LandingSection';

export function LandingStats() {
  return (
    <LandingSection
      ariaLabel="Platform highlights"
      className="border-y bg-white py-12 md:py-16 lg:py-16"
    >
      <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-emerald-600">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </li>
        ))}
      </ul>
    </LandingSection>
  );
}
