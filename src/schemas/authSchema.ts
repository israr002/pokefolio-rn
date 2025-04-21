import {z} from 'zod';
import { APP_CONSTANTS } from 'constants/appConstants';

export const authSchema = z.object({
  email: z
    .string({
      required_error: APP_CONSTANTS.EMAIL_REQUIRED,
    })
    .email(APP_CONSTANTS.EMAIL_INVALID),
  password: z
    .string({
      required_error: APP_CONSTANTS.PASSWORD_REQUIRED,
    })
    .min(6, APP_CONSTANTS.PASSWORD_TOO_SHORT),
});

export const signupSchema = authSchema.extend({
  confirmPassword: z.string({required_error: APP_CONSTANTS.PASSWORD_REQUIRED}).min(1, APP_CONSTANTS.PASSWORD_REQUIRED),
  displayName: z
    .string({
      required_error: APP_CONSTANTS.DISPLAY_NAME_REQUIRED,
    })
    .min(1, APP_CONSTANTS.DISPLAY_NAME_REQUIRED)
    .min(2, APP_CONSTANTS.DISPLAY_NAME_TOO_SHORT)
    .regex(/^[A-Za-z\s]+$/, APP_CONSTANTS.DISPLAY_NAME_ALPHABET_ERROR),
}).refine((data) => data.password === data.confirmPassword, {
  message: APP_CONSTANTS.PASSWORDS_DONT_MATCH,
  path: ['confirmPassword'],
});

export type AuthFormData = z.infer<typeof authSchema>;
export type SignupFormData = z.infer<typeof signupSchema>; 
