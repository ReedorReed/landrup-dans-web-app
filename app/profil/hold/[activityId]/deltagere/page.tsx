import { getActivity } from '@/_lib/api/activities';
import { getAuthSession } from '@/_lib/auth/session';
import { redirect } from 'next/navigation';
import { getUser } from '@/_lib/api/users';
import BottomMenu from '@/_components/ui/bottom-menu/BottomMenu';
import { UserRound } from 'lucide-react';

type DeltagerPageProps = {
	params: Promise<{ activityId: string }>;
};

export default async function DeltagerListePage({ params }: DeltagerPageProps) {
	const session = await getAuthSession();

	if (!session || session.role !== 'instructor') {
		redirect('/profil');
	}

	const { activityId } = await params;
	const id = Number(activityId);

	const activity = await getActivity(id);

	if (activity.instructorId !== session.userId) {
		redirect('/profil');
	}

	const user = await getUser(session.userId, session.token);

	return (
		<main className="min-h-screen bg-[#003147] pb-28 text-[#E9E9E9]">
			<header className="px-6 py-12 text-center">
				<h1 className="text-3xl font-semibold">Min profil</h1>
			</header>

			<section className="bg-[#E9E9E9] px-6 py-10 text-center text-[#003147]">
				<UserRound className="mx-auto size-24" />

				<h2 className="mt-6 text-4xl font-semibold">
					{user.firstname} {user.lastname}
				</h2>

				<p className="mt-4 text-2xl">Instruktør</p>
			</section>

			<section className="px-7 py-12">
				<h2 className="text-4xl font-semibold">{activity.name}</h2>

				<h3 className="mt-10 text-3xl font-semibold">Deltagere:</h3>

				{activity.users.length === 0 ? (
					<p className="mt-6">Der er ingen tilmeldte deltagere endnu.</p>
				) : (
					<ul className="mt-8 space-y-4">
						{activity.users.map((deltager) => (
							<li
								key={`${deltager.id}`}
								className="flex items-center gap-4 rounded-2xl bg-white/70 px-5 py-4 text-[#003147]">
								<UserRound className="size-8" />

								<span className="text-2xl">
									{deltager.firstname} {deltager.lastname}
								</span>

								<span className="ml-auto text-xl">{deltager.age} år</span>
							</li>
						))}
					</ul>
				)}
			</section>

			<BottomMenu />
		</main>
	);
}
