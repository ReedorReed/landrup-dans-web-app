import type { Activity } from '@/_types/activity';
import type { User } from '@/_types/user';

export type UserWithActivities = User & {
	activities: Activity[];
};

export async function getUser(
	id: number,
	token: string
): Promise<UserWithActivities> {
	const apiBaseUrl = process.env.API_URL;
	if (!apiBaseUrl) {
		throw new Error('API_URL er ikke konfigureret korrekt.');
	}

	const response = await fetch(`${apiBaseUrl}/api/v1/users/${id}`, {
		cache: 'no-store',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		throw new Error('Kunne ikke hente bruger.');
	}

	return response.json();
}
