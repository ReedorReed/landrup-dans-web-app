export type LoginResponse = {
	token: string;
	userId: number;
	role: 'default' | 'instructor';
	validUntil: number;
};
