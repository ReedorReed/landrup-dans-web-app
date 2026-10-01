import Image from 'next/image';
import Link from 'next/link';
import LoginForm from './LoginForm';

export default function LoginPage() {
	return (
		<main className="min-h-svh bg-[#003147]">
			<header className="mx-auto w-full max-w-105 px-7 pt-16 bg-[#003147]">
				<Image
					src="/assets/logo.png"
					alt="Landrup dans logo"
					width={366}
					height={170}
					priority
					className="h-auto max-w-full"
				/>
			</header>

			<section className="mx-auto w-full max-w-89 pt-20">
				<article>
					<h1 className="text-[#E9E9E9] text-4xl font-normal">Log ind</h1>

					<div className="mt-8">
						<LoginForm />
					</div>

					<p className="text-[#E9E9E9] mt-8 text-center">
						Er du ikke bruger?{' '}
						<Link href="/register" className="underline">
							Opret dig her.
						</Link>
					</p>
				</article>
			</section>
		</main>
	);
}
