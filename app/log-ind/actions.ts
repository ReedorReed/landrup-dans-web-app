'use server';

import { loginSchema, type LoginFormData } from '@/_lib/schemas/auth';
import type { LoginResponse } from '@/_types/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginUser(data: LoginFormData): Promise<void> {
	const validationResult = loginSchema.safeParse(data);

	if (!validationResult.success) {
		throw new Error('Ugyldig login data.');
	}

	const payload = {
		username: validationResult.data.username,
		password: validationResult.data.password
	};

	const apiBaseUrl = process.env.API_URL;

	if (!apiBaseUrl) {
		throw new Error('apiBaseUrl er ikke konfigureret korrekt.');
	}

	const response = await fetch(`${apiBaseUrl}/auth/token`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		throw new Error('Kunne ikke logge ind.');
	}

	const result = (await response.json()) as LoginResponse;

	if (!result.token || !result.userId || !result.role || !result.validUntil) {
		throw new Error('Login fejlede.');
	}

	const cookieStore = await cookies();

	cookieStore.set(
		'auth_session',
		JSON.stringify({
			token: result.token,
			userId: result.userId,
			role: result.role,
			validUntil: result.validUntil
		}),
		{
			httpOnly: true,
			sameSite: 'lax',
			secure: process.env.NODE_ENV === 'production',
			path: '/'
		}
	);
	redirect('/profil');
}
