import { getActivities } from '@/_lib/api/activities';
import { getUser } from '@/_lib/api/users';
import { getAuthSession } from '@/_lib/auth/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { UserRound } from 'lucide-react';
import BottomMenu from '@/_components/ui/bottom-menu/BottomMenu';

export default async function ProfilePage() {
	const session = await getAuthSession();

	if (!session) {
		redirect('/log-ind');
	}

	const user = await getUser(session.userId, session.token);

	const activities =
		session.role === 'instructor'
			? (await getActivities()).filter(
					(activity) => activity.instructorId === session.userId
				)
			: user.activities;

	return (
		<main className="min-h-screen bg-[#003147] pb-28 ">
			<header className="bg-[#003147] px-6 py-12 text-center text-[#E9E9E9]">
				<h1 className="text-3xl font-semibold">Min profil</h1>
			</header>

			<section className="bg-[#E9E9E9] px-6 py-10 text-center text-[#003147]">
				<UserRound className="mx-auto size-24" />
				<h2 className="mt-6 text-4xl font-semibold">
					{user.firstname} {user.lastname}
				</h2>
				<p className="mt-4 text-2xl">
					{session.role === 'instructor' ? 'Instruktør' : 'Medlem'}
				</p>
			</section>

			<section className="px-6 py-12 text-[#E9E9E9]">
				<h2 className="text-4xl font-semibold">
					{session.role === 'instructor' ? 'Mine hold' : 'Tilmeldte hold'}
				</h2>

				{activities.length === 0 ? (
					<p className="mt-6">
						{session.role === 'instructor'
							? 'Du har ikke oprettet nogle hold endnu.'
							: 'Du er ikke tilmeldt nogle hold endnu.'}
					</p>
				) : (
					<ul className="mt-6 space-y-6">
						{activities.map((activity) => (
							<li
								key={activity.id}
								className="rounded-[1.5rem] bg-white/70 p-6 text-[#003147]">
								<h3 className="text-3xl font-semibold">{activity.name}</h3>
								<p className="mt-5 text-2xl capitalize">
									{activity.weekday} kl. {activity.time}
								</p>

								{session.role === 'instructor' && (
									<p className="mt-5 text-xl">
										Max. deltagere: {activity.maxParticipants} <br /> Tilmeldte:{' '}
										{activity.users.length}
									</p>
								)}

								<Link
									href={
										session.role === 'instructor'
											? `/profil/hold/${activity.id}/deltagere`
											: `/aktiviteter/${activity.id}`
									}
									className="mt-6 inline-block rounded-xl bg-[#003147] px-8 py-3 text-2xl text-[#E9E9E9]">
									{session.role === 'instructor' ? 'Deltagerliste' : 'Vis hold'}
								</Link>
							</li>
						))}
					</ul>
				)}
			</section>
			<BottomMenu />
		</main>
	);
}
