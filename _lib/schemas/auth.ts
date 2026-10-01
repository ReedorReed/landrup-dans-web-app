import { z } from 'zod';

export const loginSchema = z.object({
	username: z.string().trim().min(3, 'Venligst indtast et gyldigt brugernavn.'),
	password: z.string().min(4, 'Adgangskode skal være mindst 4 karakterer.')
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type LoginFieldErrors = Partial<Record<keyof LoginFormData, string>>;

export const registerSchema = z
	.object({
		firstname: z.string().trim().min(2, 'Navn skal have mindst 2 karakter.'),
		lastname: z
			.string()
			.trim()
			.min(2, 'Efternavn skal have mindst 2 karakter.'),
		username: z
			.string()
			.trim()
			.min(2, 'Brugernavn skal have mindst 2 karakter.'),
		age: z.number().max(110),
		password: z.string().min(4, 'Adgangskode skal være mindst 4 karakterer.'),
		confirmPassword: z.string().min(4, 'Venligst gentag adgangskode.')
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Adgangskoderne er ikke ens.',
		path: ['confirmPassword']
	});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type RegisterFieldErrors = Partial<
	Record<keyof RegisterFormData, string>
>;
