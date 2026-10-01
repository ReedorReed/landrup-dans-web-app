'use client';

import { ReactNode, useState } from 'react';
import { Search } from 'lucide-react';
import type { Activity } from '@/_types/activity';
import ActivityCard from './ActivityCard';

type ActivitySearchProps = {
	activities: Activity[];
	children: ReactNode;
};

export default function ActivitySearch({
	activities,
	children
}: ActivitySearchProps) {
	const [query, setQuery] = useState('');

	const searchQuery = query.toLowerCase();

	const filteredActivities = activities.filter((activity) => {
		return (
			activity.name.toLowerCase().includes(searchQuery) ||
			activity.weekday.toLowerCase().includes(searchQuery)
		);
	});

	return (
		<>
			<header className="h-18 px-6 pt-6">
				<div className="relative">
					<input
						type="search"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						className="h-12 w-full rounded-xl bg-transparent px-4 pr-14 text-[#E9E9E9] outline-none transition-colors focus:bg-[#456b7a] "
					/>
					<Search className="pointer-events-none absolute right-4 top-1/2 size-6 -translate-y-1/2 text-[#E9E9E9]" />
				</div>
			</header>
			{children}
			<section>
				{filteredActivities.length === 0 ? (
					<p>
						Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget
						andet.
					</p>
				) : (
					filteredActivities.map((activity) => (
						<ActivityCard key={activity.id} activity={activity} />
					))
				)}
			</section>
		</>
	);
}
