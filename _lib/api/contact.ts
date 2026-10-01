import type { ContactFormData } from '../schemas/contact';

export async function sendContactMessage(data: ContactFormData): Promise<void> {
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

	if (!apiBaseUrl) {
		throw new Error('NEXT_PUBLIC_API_URL er ikke konfigureret korrekt.');
	}

	const formData = new FormData();
	formData.append('name', data.name);
	formData.append('email', data.email);
	formData.append('message', data.content);

	const response = await fetch(`${apiBaseUrl}/api/v1/messages`, {
		method: 'POST',
		body: formData
	});

	if (!response.ok) {
		throw new Error('Kunne ikke sende besked.');
	}
}
