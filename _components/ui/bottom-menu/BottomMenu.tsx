'use client';

import { House, List, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
	{
		href: '/',
		label: 'Home',
		icon: House
	},
	{
		href: '/aktiviteter',
		label: 'Aktiviteter',
		icon: List
	},
	{
		href: '/profil',
		label: 'Profil',
		icon: UserRound
	}
];

export default function BottomMenu() {
	const pathname = usePathname();
	return (
		<nav className="fixed inset-x-0 bottom-0 z-50 h-24 bg-[#E9E9E9]">
			<ul className="flex h-full items-center justify-around">
				{navigationItems.map(({ href, label, icon: Icon }) => {
					const isActive =
						href === '/' ? pathname === '/' : pathname.startsWith(href);

					return (
						<li key={href}>
							<Link
								href={href}
								className={`flex flex-col items-center gap-1 text-sm ${isActive ? ' text-black' : 'text-[#757575]'}`}>
								<Icon size={30} strokeWidth={isActive ? 2.5 : 2} />
								<span>{label}</span>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
