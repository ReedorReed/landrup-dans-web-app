import type { Deltager } from '@/_types/deltagere';

export async function getDeltagere(
	userId: number,
	activityId: number,
	token: string
): Promise<Deltager[]> {
	const apiBaseUrl = process.env.API_URL;

	if (!apiBaseUrl) {
		throw new Error('API_URL er ikke konfigureret korrekt.');
	}

	const response = await fetch(
		`${apiBaseUrl}/api/v1/users/${userId}/roster/${activityId}`,
		{
			cache: 'no-store',
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);

	if (!response.ok) {
		throw new Error('Kunne ikke hente deltagerlisten.');
	}

	return response.json();
}
