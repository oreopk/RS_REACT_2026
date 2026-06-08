import { z } from 'zod';

const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

export const createFormSchema = (countries: string[]) =>
  z
    .object({
      name: z
        .string()
        .min(1, 'Name is required')
        .refine((v) => v[0] === v[0]?.toUpperCase(), 'Must start with uppercase'),

      age: z.number({ message: 'Must be a number' }).nonnegative('Must be non-negative'),

      email: z
        .string()
        .refine((v) => v.includes('@') && v.split('@')[1]?.includes('.'), 'Invalid email'),

      gender: z.enum(['male', 'female'], { message: 'Select gender' }),

      country: z.string().refine((v) => countries.includes(v), 'Country must be from the list'),

      password: z
        .string()
        .regex(
          passwordRegex,
          'Password must contain at least 8 characters, 1 number, 1 uppercase, 1 lowercase and 1 special character'
        ),

      confirmPassword: z.string().min(1, 'Confirm password is required'),

      acceptTerms: z.literal(true, { message: 'You must accept terms' }),
    })
    .refine((d) => d.password === d.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

export type FormData = z.infer<ReturnType<typeof createFormSchema>>;
