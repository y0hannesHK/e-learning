import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Perfect for getting started and exploring the basics.',
    features: [
      'Access to free lessons',
      'Community support',
      'Basic progress tracking',
    ],
    buttonText: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19/mo',
    description: 'For dedicated learners who want access to premium content.',
    features: [
      'Everything in Basic',
      'Unlimited premium lessons',
      'Downloadable resources',
      'Certificate of completion',
    ],
    buttonText: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored learning solutions for teams and organizations.',
    features: [
      'Everything in Pro',
      'Team management tools',
      'Custom course creation',
      'Dedicated account manager',
    ],
    buttonText: 'Contact Sales',
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mb-6">
        <Link
          href="/home"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-500 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pricing Plans</h1>
        <p className="text-lg text-gray-600">
          Choose the plan that best fits your learning journey.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-xl shadow-lg overflow-hidden ${
              plan.highlighted
                ? 'border-2 border-emerald-500 bg-white'
                : 'bg-white'
            }`}
          >
            <div className="p-6 flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-3xl font-extrabold text-emerald-600 mb-4">
                {plan.price}
              </p>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-700">
                    <CheckCircle className="text-green-500 mr-2" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href="#"
                className={`mt-6 inline-block px-4 py-2 rounded-lg font-medium text-center ${
                  plan.highlighted
                    ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
