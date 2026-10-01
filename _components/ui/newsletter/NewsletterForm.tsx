'use client';

import { SubmitEvent, useState } from 'react';
import { newsletterSchema } from '@/_lib/schemas/newsletter';
import { subscribeToNewsletter } from '@/_lib/api/newsletter';

export default function NewsletterForm() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		setError('');
		setSuccess('');

		const values = {
			email: formData.get('email')
		};

		const result = newsletterSchema.safeParse(values);

		if (!result.success) {
			setError(result.error.issues[0]?.message ?? 'Ugyldig email');
			return;
		}

		try {
			setIsSubmitting(true);

			await subscribeToNewsletter(result.data);

			setSuccess('Tillykke. Du er nu tilmeldt vores nyhedsbrev.');
			form.reset();
		} catch {
			setError('Kunne ikke tilmelde nyhedsbrev.');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="">
			<form
				noValidate
				onSubmit={handleSubmit}
				className="mx-auto flex w-full max-w-xl gap-4 sm:items-end sm:gap-8">
				<label htmlFor="email" className="sr-only">
					Email address
				</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					required
					className="w-full bg-[#E9E9E9] p-2 text-lg text-[#003147] placeholder:text-[#999999] outline-none sm:px-7 sm:py-5 sm:text-xl md:text-2xl focus:ring-2 focus:ring-white"
				/>
				<button
					type="submit"
					disabled={isSubmitting}
					className="bg-[#E9E9E9] text-[#003147] hover:bg-[#003147] hover:text-[#E9E9E9] w-20 rounded-xl p-2 text-xs sm:p-6 md:text-xl lg:w-30 shadow-[0_5px_6px_rgba(0,0,0,0.25)] transition-colors focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50">
					{isSubmitting ? 'Tilmelder...' : 'Tilmeld'}
				</button>
			</form>
			{error && (
				<p
					role="alert"
					className="mx-auto mt-5 max-w-xl text-center text-sm text-red-400">
					{error}
				</p>
			)}

			{success && (
				<p
					role="status"
					className="mx-auto mt-5 max-w-xl text-center text-sm text-green-400">
					{success}
				</p>
			)}
		</div>
	);
}
