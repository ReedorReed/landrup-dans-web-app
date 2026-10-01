import type { User } from './user';

export type Activity = {
	id: number;
	name: string;
	description: string;
	weekday: string;
	time: string;
	maxParticipants: number;
	minAge: number;
	maxAge: number;
	createdAt: string;
	updatedAt: string;
	instructorId: number;
	assetId: number;
	asset: {
		id: number;
		url: string;
	};
	users: User[];
};
