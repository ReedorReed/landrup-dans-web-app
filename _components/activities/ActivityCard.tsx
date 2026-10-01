import type { Activity } from '@/_types/activity';
import Image from 'next/image';
import Link from 'next/link';

type ActivityCardProps = {
	activity: Activity;
};

export default function ActivityCard({ activity }: ActivityCardProps) {
	return (
		<Link href={`/aktiviteter/${activity.id}`} className="block">
			<article className="relative h-86 overflow-hidden rounded-[2rem] mb-4">
				<Image
					src={activity.asset.url}
					alt={activity.name}
					fill
					unoptimized
					sizes="(max-width: 640px) calc(100vw - 48px), 360px"
					className="object-cover"
				/>
				<div className="absolute inset-x-0 bottom-0 bg-[#003147]/75 px-6 py-5 text-[#E9E9E9]">
					<h2 className="text-2xl font-bold">{activity.name}</h2>
					<p>
						{activity.minAge} - {activity.maxAge} år
					</p>
				</div>
			</article>
		</Link>
	);
}
