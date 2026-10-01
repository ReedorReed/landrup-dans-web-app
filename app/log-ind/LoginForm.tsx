'use client';
import { useState, type SubmitEvent } from 'react';
import { loginSchema, type LoginFieldErrors } from '@/_lib/schemas/auth';
import { loginUser } from './actions';
import Button from '@/_components/ui/button/Button';

export default function LoginForm() {
	const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
	const [errorMessage, setErrorMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);

		const rawData = {
			username: formData.get('username')?.toString() ?? '',
			password: formData.get('password')?.toString() ?? ''
		};

		setErrorMessage('');
		setFieldErrors({});

		const validationResult = loginSchema.safeParse(rawData);

		if (!validationResult.success) {
			const nextFieldErrors: LoginFieldErrors = {};

			for (const issue of validationResult.error.issues) {
				const field = issue.path[0];

				if (field === 'username' || field === 'password') {
					nextFieldErrors[field] ??= issue.message;
				}
			}

			setFieldErrors(nextFieldErrors);
			setErrorMessage('Ret venligst felterne med rødt.');

			return;
		}

		try {
			setIsSubmitting(true);

			await loginUser(validationResult.data);
		} catch {
			setErrorMessage('Forkert brugernavn eller adgangskode.');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<form
			noValidate
			onSubmit={handleSubmit}
			className="mx-auto flex flex-col w-full max-w-xl gap-4 sm:items-end sm:gap-8">
			<label htmlFor="username" className="sr-only">
				Brugernavn
			</label>
			<input
				type="text"
				name="username"
				id="username"
				placeholder="Brugernavn"
				required
				className="w-full bg-[#E9E9E9] p-2 text-lg text-[#003147] placeholder:text-[#999999] outline-none sm:px-7 sm:py-5 sm:text-xl md:text-2xl focus:ring-2 focus:ring-white"
			/>
			{fieldErrors.username && (
				<p id="username-error" className="text-xs text-red-400">
					{fieldErrors.username}
				</p>
			)}
			<label htmlFor="password" className="sr-only">
				Adgangskode
			</label>
			<input
				type="password"
				name="password"
				id="password"
				placeholder="Adgangskode"
				required
				className="w-full bg-[#E9E9E9] p-2 text-lg text-[#003147] placeholder:text-[#999999] outline-none sm:px-7 sm:py-5 sm:text-xl md:text-2xl focus:ring-2 focus:ring-white"
			/>
			{fieldErrors.password && (
				<p id="password-error" className="text-xs text-red-400">
					{fieldErrors.password}
				</p>
			)}
			{errorMessage && (
				<p
					role="alert"
					className="mx-auto mt-5 max-w-xl text-center text-sm text-red-400">
					{errorMessage}
				</p>
			)}
			<Button type="submit" variant="primary" disabled={isSubmitting}>
				{isSubmitting ? 'Logger ind...' : 'Log ind'}
			</Button>
		</form>
	);
}
