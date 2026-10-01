import type { NewsletterFormData } from '../schemas/newsletter';

export async function subscribeToNewsletter(
	data: NewsletterFormData
): Promise<void> {
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

	if (!apiBaseUrl) {
		throw new Error('NEXT_PUBLIC_API_URL er ikke konfigureret korrekt.');
	}

	const formData = new FormData();
	formData.append('email', data.email);

	const response = await fetch(`${apiBaseUrl}/api/v1/newsletter`, {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		throw new Error('Kunne ikke tilmelde nyhedsbrev.');
	}
}
