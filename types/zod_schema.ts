import z from 'zod';

// course schema
export const createCourseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnialUrl: z.string().optional(),
  instructorId: z.string(),
  isPaid: z.boolean().optional(),
  price: z.number().nonnegative().optional(), // Optional if isPaid is false
});

export const updateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  thumbnialUrl: z.string().optional(),
  isPaid: z.boolean().optional(),
  price: z.number().nonnegative().optional(),
});

// lesson schema
export const createLessonSchema = z.object({
  courseId: z.string(),
  title: z.string().min(1),
  videoUrl: z.string().optional(),
  /** content
   * is array of objects as the content attribute in lesson table of db is an array
   * tracking its index is bit tricky, so before putting it in db, the its order would be
   * reorganized with this
   */
  contents: z
    .object({
      contentIndex: z.number().int().nonnegative(),
      content: z.string().min(1),
    })
    .array()
    .min(1),
  orderIndex: z.number().int().nonnegative(),
});

export const updateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  videoUrl: z.string().optional(),
  contents: z
    .object({
      contentIndex: z.number().int().nonnegative(),
      content: z.string().min(1),
    })
    .array()
    .optional(),
  orderIndex: z.number().int().nonnegative().optional(),
});

// quiz schema
export const createQuizSchema = z.object({
  courseId: z.string(),
  lessonId: z.string(),
  title: z.string().min(1),
});

export const updateQuizSchema = z.object({
  courseId: z.string().optional(),
  lessonId: z.string().optional(),
  title: z.string().min(1).optional(),
});

// QuizQuestionSchema
export const createQuizQuestionSchema = z.object({
  quizId: z.string(),
  question: z.string().min(1),
  choices: z
    .object({
      choiceIndex: z.number().int().nonnegative(),
      choice: z.string().min(1),
    })
    .array()
    .min(2),
  correctChoice: z.number().int().nonnegative(),
});

export const updateQuizQuestionSchema = z.object({
  question: z.string().min(1).optional(),
  choices: z
    .object({
      choiceIndex: z.number().int().nonnegative(),
      choice: z.string().min(1),
    })
    .array()
    .min(2)
    .optional(),
  correctChoice: z.number().int().nonnegative().optional(),
});

// subscription schmea
export const createSubscriptionSchema = z.object({
  userId: z.string(),
  stripeSubscriptionId: z.string(),
  stripeCustomerId: z.string(),
  status: z.string(),
  currentPeriodEnd: z.date(),
});

export const updateSubscriptionSchema = z.object({
  status: z.string().optional(),
  currentPeriodEnd: z.date().optional(),
});

// progress schema
export const createProgressSchema = z.object({
  studentId: z.string(),
  lessonId: z.string(),
  isCompleted: z.boolean(),
});

export const updateProgressSchema = z.object({
  lessonId: z.string(),
  isCompleted: z.boolean().optional(),
  completedAt: z.date().optional(),
});

// review schema
export const createReviewSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional(),
});

export const updateReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  comment: z.string().optional(),
});

// cerificate schema
export const createCertificateSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
  certificateUrl: z.string(),
});

export const updateCertificateSchema = z.object({
  certificateUrl: z.string().optional(),
});

// enrollment schema
export const createEnrollmentSchema = z.object({
  studentId: z.string(),
  courseId: z.string(),
});

// export const updateEnrollmentSchema = z.object({}); // No update fields (unique constraint)

// ENUM for role
export const roleEnum = z.enum(['student', 'instructor', 'admin']);

// user schema
export const createUserSchema = z.object({
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email(),
  emailVerified: z.date().optional(),
  password: z.string().min(6).optional(),
  image: z.string().optional(),
  role: roleEnum.optional(), // defaults to 'student'
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.email().optional(),
  emailVerified: z.date().optional(),
  password: z.string().min(6).optional(),
  image: z.string().optional(),
  role: roleEnum.optional(),
});
