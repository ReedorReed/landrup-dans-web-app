import type { Activity } from '@/_types/activity';

const apiBaseUrl = process.env.API_URL;

export async function getActivities(): Promise<Activity[]> {
	if (!apiBaseUrl) {
		throw new Error('API_URL er ikke konfigureret korrekt.');
	}

	const response = await fetch(`${apiBaseUrl}/api/v1/activities`, {
		next: { revalidate: 60 }
	});

	if (!response.ok) {
		throw new Error('Kunne ikke hente aktiviteter.');
	}

	return response.json();
}

export async function getActivity(id: number): Promise<Activity> {
	if (!apiBaseUrl) {
		throw new Error('API_URL er ikke konfigureret korrekt.');
	}

	const response = await fetch(`${apiBaseUrl}/api/v1/activities/${id}`, {
		cache: 'no-store'
	});

	if (!response.ok) {
		throw new Error('Kunne ikke hente aktivitet.');
	}

	return response.json();
}
