import type { Metadata } from 'next';
import { Ubuntu, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/_lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const ubuntu = Ubuntu({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--font-ubuntu'
});

export const metadata: Metadata = {
	title: 'Landrup Dans',
	description: 'Find dansehold, tilmeld dig og administrer dine aktiviteter.'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="da"
			className={cn("h-full", "antialiased", ubuntu.variable, "font-sans", geist.variable)}>
			<body className="min-h-full flex flex-col bg-[#003147]">{children}</body>
		</html>
	);
}
