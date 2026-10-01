import { z } from 'zod';

export const newsletterSchema = z.object({
	email: z.email('Venligst indtast en gyldig email adresse.')
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
