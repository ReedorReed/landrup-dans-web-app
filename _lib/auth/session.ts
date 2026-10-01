import { cookies } from 'next/headers';
import type { LoginResponse } from '@/_types/auth';

export async function getAuthSession(): Promise<LoginResponse | null> {
	const cookieStore = await cookies();
	const sessionCookie = cookieStore.get('auth_session');

	if (!sessionCookie) {
		return null;
	}

	return JSON.parse(sessionCookie.value) as LoginResponse;
}
