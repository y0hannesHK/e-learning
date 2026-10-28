import {
  Award,
  Clock,
  Globe,
  Smartphone,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type CourseBadge = {
  label: string;
  className: string;
};

export type Course = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  badge?: CourseBadge;
  category: string;
  rating: number;
  price: string;
  meta: string;
};

export type Testimonial = {
  name: string;
  role: string;
  avatarSrc: string;
  avatarFallback: string;
  quote: string;
};

export const primaryNav: NavLink[] = [
  { href: '/login', label: 'Courses' },
  { href: '/home/pricing', label: 'Pricing' },
  { href: '/home/about', label: 'About' },
];

export const footerNav: NavLink[] = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Contact' },
  { href: '#', label: 'Help Center' },
];

export const heroPerks = [
  'Free trial',
  'No credit card required',
  'Cancel anytime',
];

export const stats: Stat[] = [
  { value: '100K+', label: 'Active Learners' },
  { value: '500+', label: 'Expert Courses' },
  { value: '50K+', label: 'Certificates Earned' },
  { value: '4.8★', label: 'Average Rating' },
];

export const features: Feature[] = [
  {
    title: 'Learn Anywhere',
    description:
      'Access your courses from any device, anywhere in the world. Learn at your own pace with offline downloads.',
    icon: Globe,
  },
  {
    title: 'Expert Instructors',
    description:
      'Learn from industry professionals and subject matter experts with years of real-world experience.',
    icon: Users,
  },
  {
    title: 'Certificates',
    description:
      'Earn verified certificates upon completion to showcase your new skills to employers and peers.',
    icon: Award,
  },
  {
    title: 'Self-Paced Learning',
    description:
      'Study on your schedule with lifetime access to course materials and regular content updates.',
    icon: Clock,
  },
  {
    title: 'Mobile Learning',
    description:
      'Optimized mobile apps for iOS and Android. Learn during commutes or whenever you have spare time.',
    icon: Smartphone,
  },
  {
    title: 'Progress Tracking',
    description:
      'Monitor your learning journey with detailed analytics, achievements, and personalized recommendations.',
    icon: Trophy,
  },
];

export const courses: Course[] = [
  {
    title: 'Complete Web Development Bootcamp',
    description:
      'Master HTML, CSS, JavaScript, React, and Node.js in this comprehensive course.',
    imageSrc: '/blog-web-development.png',
    imageAlt: 'Web Development Course',
    badge: { label: 'Bestseller', className: 'bg-emerald-600' },
    category: 'Development',
    rating: 4.9,
    price: '$89',
    meta: '40 hours • 1,234 students',
  },
  {
    title: 'Data Science & Machine Learning',
    description:
      'Learn Python, pandas, scikit-learn, and build real-world ML projects.',
    imageSrc: '/-zhp9k.png',
    imageAlt: 'Data Science Course',
    badge: { label: 'New', className: 'bg-orange-600' },
    category: 'Data Science',
    rating: 4.8,
    price: '$129',
    meta: '60 hours • 856 students',
  },
  {
    title: 'Digital Marketing Mastery',
    description:
      'Master SEO, social media, PPC, and content marketing strategies.',
    imageSrc: '/placeholder-82kie.png',
    imageAlt: 'Digital Marketing Course',
    category: 'Marketing',
    rating: 4.7,
    price: '$79',
    meta: '25 hours • 2,156 students',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    avatarSrc: '/professional-woman-smiling.png',
    avatarFallback: 'SJ',
    quote:
      '"The web development course completely changed my career. The instructors are amazing and the content is always up-to-date. I landed my dream job within 3 months!"',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Data Analyst',
    avatarSrc: '/professional-man-smiling.png',
    avatarFallback: 'MR',
    quote:
      '"I was able to transition from marketing to data science thanks to the comprehensive courses here. The hands-on projects really prepared me for real-world challenges."',
  },
  {
    name: 'Emily Liu',
    role: 'Marketing Manager',
    avatarSrc: '/professional-woman-entrepreneur.png',
    avatarFallback: 'EL',
    quote:
      '"The digital marketing course gave me the skills I needed to grow my business. The ROI strategies I learned increased our revenue by 200% in just 6 months!"',
  },
];
