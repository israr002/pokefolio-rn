import {z} from 'zod';

export const authSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  displayName: z
    .string()
    .min(1, 'Display name is required')
    .min(2, 'Display name must be at least 2 characters'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type AuthFormData = z.infer<typeof authSchema>;
export type SignupFormData = z.infer<typeof signupSchema>; 
