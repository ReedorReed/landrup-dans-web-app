'use server';

import { getAuthSession } from '../auth/session';
import { getActivity } from '../api/activities';
import { getUser } from '../api/users';
import { redirect } from 'next/navigation';

const apiBaseUrl = process.env.API_URL;

export async function tilmeldAktivitet(activityId: number) {
	const session = await getAuthSession();

	if (!session || session.role !== 'default') {
		redirect(
			`/aktiviteter/${activityId}?error=Du skal være logget ind for at kunne tilmelde dig.`
		);
	}

	const [activity, user] = await Promise.all([
		getActivity(activityId),
		getUser(session.userId, session.token)
	]);

	const erTilmeldt = activity.users.some(
		(participant) => participant.id === session.userId
	);

	if (erTilmeldt) {
		redirect(
			`/aktiviteter/${activityId}?error=Du er allerede tilmeldt dette hold.`
		);
	}

	const tilmeldtSammeDag = user.activities.some(
		(tilmeldtAktivitet) => tilmeldtAktivitet.weekday === activity.weekday
	);

	if (tilmeldtSammeDag) {
		redirect(
			`/aktiviteter/${activityId}?error=Du er allerede tilmeldt et hold denne dag.`
		);
	}

	const isAgeAllowed =
		user.age >= activity.minAge && user.age <= activity.maxAge;

	if (!isAgeAllowed) {
		redirect(
			`/aktiviteter/${activityId}?error=Din alder passer ikke til dette hold.`
		);
	}

	const isFull = activity.users.length >= activity.maxParticipants;

	if (isFull) {
		redirect(`/aktiviteter/${activityId}?error=Holdet er desværre fyldt.`);
	}

	if (!apiBaseUrl) {
		throw new Error('API_URL er ikke konfigureret korrekt.');
	}

	const response = await fetch(
		`${apiBaseUrl}/api/v1/users/${session.userId}/activities/${activityId}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${session.token}`
			}
		}
	);

	if (!response.ok) {
		redirect(
			`/aktiviteter/${activityId}?error=Kunne ikke tilmelde dig holdet.`
		);
	}

	redirect(`/aktiviteter/${activityId}?success=Du er nu tilmeldt holdet.`);
}

export async function afmeldAktivitet(activityId: number) {
	const session = await getAuthSession();
	if (!session || session.role !== 'default') {
		redirect(
			`/aktiviteter/${activityId}?error=Du skal være logget ind for at afmelde dig.`
		);
	}

	if (!apiBaseUrl) {
		throw new Error('API_URL er ikke konfigureret korrekt.');
	}

	const response = await fetch(
		`${apiBaseUrl}/api/v1/users/${session.userId}/activities/${activityId}`,
		{
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${session.token}`
			}
		}
	);

	if (!response.ok) {
		redirect(`/aktiviteter/${activityId}?error=Kunne ikke afmelde dig holdet.`);
	}

	redirect(`/aktiviteter/${activityId}?success=Du er nu afmeldt holdet.`);
}
