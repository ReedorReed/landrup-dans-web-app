import ActivitySearch from '@/_components/activities/ActivitySearch';
import BottomMenu from '@/_components/ui/bottom-menu/BottomMenu';
import { getActivities } from '@/_lib/api/activities';

export default async function ActivitiesPage() {
	const activities = await getActivities();
	return (
		<main className="pb-28 px-4">
			<ActivitySearch activities={activities}>
				<h1 className="text-4xl text-[#E9E9E9] pb-4">Aktiviteter</h1>
			</ActivitySearch>
			<BottomMenu />
		</main>
	);
}
