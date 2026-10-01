'use client';

import { useState, type SubmitEvent } from 'react';
import { contactSchema, type FieldErrors } from '@/_lib/schemas/contact';
import { sendContactMessage } from '@/_lib/api/contact';

export default function ContactForm() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

	async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);

		const rawData = {
			name: formData.get('name')?.toString() ?? '',
			email: formData.get('email')?.toString() ?? '',
			content: formData.get('content')?.toString() ?? ''
		};

		setSuccessMessage('');
		setErrorMessage('');
		setFieldErrors({});

		const valdationsResult = contactSchema.safeParse(rawData);

		if (!valdationsResult.success) {
			const nextFieldErrors: FieldErrors = {};

			for (const issue of valdationsResult.error.issues) {
				const field = issue.path[0];

				if (field === 'name' || field === 'email' || field === 'content') {
					nextFieldErrors[field] ??= issue.message;
				}
			}

			setFieldErrors(nextFieldErrors);
			setErrorMessage('Ret venligst felterne med rødt.');

			return;
		}

		const validData = valdationsResult.data;

		try {
			setIsSubmitting(true);

			await sendContactMessage(validData);

			form.reset();
			setSuccessMessage('Din besked er sendt.');
		} catch {
			setErrorMessage('Noget gik galt. Prøv venligst senere.');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div>
			<form
				noValidate
				onSubmit={handleSubmit}
				className="mx-auto flex flex-col w-full max-w-xl gap-4 sm:items-end sm:gap-8">
				<label htmlFor="name" className="sr-only">
					Navn
				</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Navn"
					required
					className="w-full bg-[#E9E9E9] p-2 text-lg text-[#003147] placeholder:text-[#999999] outline-none sm:px-7 sm:py-5 sm:text-xl md:text-2xl focus:ring-2 focus:ring-white"
				/>
				{fieldErrors.name && (
					<p id="name-error" className="text-xs text-red-400">
						{fieldErrors.name}
					</p>
				)}
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
				{fieldErrors.email && (
					<p id="email-error" className="text-xs text-red-400">
						{fieldErrors.email}
					</p>
				)}
				<label htmlFor="content" className="sr-only">
					Besked
				</label>
				<textarea
					id="content"
					name="content"
					placeholder="Besked"
					required
					minLength={5}
					className="w-full bg-[#E9E9E9] p-2 text-lg text-[#003147] placeholder:text-[#999999] outline-none sm:px-7 sm:py-5 sm:text-xl md:text-2xl focus:ring-2 focus:ring-white"
				/>
				{fieldErrors.content && (
					<p id="content-error" className="text-xs text-red-400">
						{fieldErrors.content}
					</p>
				)}
				{errorMessage && (
					<p
						role="alert"
						className="mx-auto mt-5 max-w-xl text-center text-sm text-red-400">
						{errorMessage}
					</p>
				)}

				{successMessage && (
					<p
						role="status"
						className="mx-auto mt-5 max-w-xl text-center text-sm text-green-400">
						{successMessage}
					</p>
				)}
				<button
					type="submit"
					disabled={isSubmitting}
					className="bg-[#E9E9E9] text-[#003147] hover:bg-[#003147] hover:text-[#E9E9E9] w-60 self-center rounded-xl p-4 text-xs sm:p-6 md:text-2xl shadow-[0_5px_6px_rgba(0,0,0,0.25)] transition-colors focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50">
					{isSubmitting ? 'Sender besked...' : 'Send besked'}
				</button>
			</form>
		</div>
	);
}
