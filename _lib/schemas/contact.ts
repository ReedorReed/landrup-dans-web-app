import { z } from 'zod';

export const contactSchema = z.object({
	name: z.string().trim().min(2, 'Navn skal have mindst 2 karakterer.'),
	email: z.email('Venligst indtast en gyldig email.'),
	content: z.string().trim().min(5, 'Beskeder skal have mindst 5 karakterer.')
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactFormData, string>>;
