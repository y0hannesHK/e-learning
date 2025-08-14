export type Role = 'student' | 'instructor' | 'admin';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  isPaid: boolean;
  price: number;
  createdAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string | null;
  contents: string[];
  orderIndex: number;
  createdAt: Date;
}

export interface Quiz {
  id: string;
  courseId?: string | null;
  lessonId?: string | null;
  title: string;
  createdAt: Date;
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  choices: string[];
  correctChoice: number;
  createdAt: Date;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripeCustomerId: string;
  status: string;
  currentPeriodEnd: Date;
  createdAt: Date;
}

export interface ProgressTracking {
  id: string;
  studentId: string;
  lessonId: string;
  isCompleted: boolean;
  completedAt?: Date | null;
}

export interface Review {
  id: string;
  studentId: string;
  courseId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface Certificate {
  id: string;
  studentId: string;
  courseId: string;
  issuedAt: Date;
  certificateUrl: string;
}

export interface User {
  id: string;
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  emailVerified?: Date | null;
  //  hashedPassword?: string | null;  - sensetive data
  image?: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
