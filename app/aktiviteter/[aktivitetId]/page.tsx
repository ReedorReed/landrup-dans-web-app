import { getActivity } from '@/_lib/api/activities';
import Image from 'next/image';
import { getAuthSession } from '@/_lib/auth/session';
import TilmeldButton from '@/_components/activities/TilmeldButton';
import { afmeldAktivitet, tilmeldAktivitet } from '@/_lib/actions/tilmelding';
import BottomMenu from '@/_components/ui/bottom-menu/BottomMenu';

type ActivityPageProps = {
	params: Promise<{ aktivitetId: string }>;
	searchParams: Promise<{
		error?: string;
		success?: string;
	}>;
};

export default async function Activity({
	params,
	searchParams
}: ActivityPageProps) {
	const { aktivitetId } = await params;
	const { error, success } = await searchParams;
	const activityId = Number(aktivitetId);
	const activity = await getActivity(activityId);
	const session = await getAuthSession();

	const erTilmeldt =
		session?.role === 'default' &&
		activity.users.some((user) => user.id === session.userId);

	const activityAction = erTilmeldt
		? afmeldAktivitet.bind(null, activityId)
		: tilmeldAktivitet.bind(null, activityId);

	return (
		<section>
			<div className="relative h-120.5">
				<Image
					src={activity.asset.url}
					alt={activity.name}
					fill
					unoptimized
					sizes="100vw"
					className="object-cover"
				/>

				{session?.role === 'default' && (
					<TilmeldButton
						action={activityAction}
						erTilmeldt={Boolean(erTilmeldt)}
					/>
				)}
			</div>

			<article className="bg-[#003147] px-7 py-6 text-[#E9E9E9]">
				<h1 className="text-2xl font-medium">{activity.name}</h1>
				{error && <p className="mb-4 rounded-lg bg-red-700 p-3">{error}</p>}
				{success && (
					<p className="mb-4 rounded-lg bg-green-700 p-3">{success}</p>
				)}
				<p>{activity.minAge}+ år</p>
				<p>{activity.description}</p>
            </article>
            <BottomMenu />
		</section>
	);
}
