import type { Testimonial } from '@/_types/testimonial';

export async function getTestimonials(): Promise<Testimonial[]> {
	const apiBaseUrl = process.env.API_URL;

	if (!apiBaseUrl) {
		throw new Error('API_URL er ikke konfigureret korrekt.');
	}

	const response = await fetch(`${apiBaseUrl}/api/v1/testimonials`, {
		next: { revalidate: 3600 }
	});

	if (!response.ok) {
		throw new Error('Kunne ikke hente anbefalinger.');
	}

	return response.json();
}
