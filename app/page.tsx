import Button from '@/_components/ui/button/Button';
import NewsletterForm from '@/_components/ui/newsletter/NewsletterForm';
import Image from 'next/image';
import Link from 'next/link';
import TestimonialCarousel from '@/_components/testimonials/TestimonialCarousel';
import { getTestimonials } from '@/_lib/api/testimonial';
import ContactForm from '@/_components/ui/contact-form/ContactForm';
import Footer from '@/_components/ui/footer/Footer';

export default async function Home() {
	const testimonials = await getTestimonials();
	return (
		<main className="flex flex-col flex-1 items-center justify-center bg-[#003147] font-sans">
			<section className="min-h-svh w-full bg-[url(/assets/heroimg.jpg)] bg-cover bg-center py-16 flex flex-col justify-between items-center">
				<div className="flex flex-col w-full gap-1.5 items-center">
					<Image
						src="/assets/logo.png"
						alt="landrup dans logo"
						width={290}
						height={158}
						className="h-auto w-full px-12"
					/>
					<div className="bg-[#E9E9E9] h-1 w-[90%] self-start"></div>
				</div>
				<div className="flex flex-col items-center gap-8 w-full">
					<Link href="/log-ind" className="w-60">
						<Button
							type="button"
							variant="primary"
							className="w-full shadow-2xs">
							Log ind her
						</Button>{' '}
					</Link>
					<div>
						<Image
							src="/assets/arrows.svg"
							alt="pile der peger ned"
							width={48}
							height={48}
						/>
					</div>
				</div>
			</section>
			<section className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-8 px-8 sm:items-start">
				<article className="flex flex-col gap-4">
					<h2 className="text-[#E9E9E9] font-normal text-4xl">
						Vores holdtyper
					</h2>
					<ul className="flex flex-col gap-10">
						<li>
							<article className="flex flex-col gap-2">
								<h3 className="text-[#E9E9E9] font-medium text-2xl">
									Børnehold
								</h3>
								<figure className="flex flex-col gap-2">
									<Image
										src="/assets/boernedans.jpg"
										alt="børn der danser"
										width={356}
										height={216}
									/>
									<figcaption className="text-[#E9E9E9] font-normal text-sm/5">
										På børneholdene leger vi os ind i dansens verden gennem
										musik, bevægelse og fantasi. Undervisningen styrker motorik,
										rytme og kropsbevidsthed i trygge rammer. Fokus er på
										danseglæde, fællesskab og aktiv bevægelse, hvor alle kan
										være med.
									</figcaption>
								</figure>
							</article>
						</li>
						<li>
							<article className="flex flex-col gap-2">
								<h3 className="text-[#E9E9E9] font-medium text-2xl">
									Selskabs- og seniordans
								</h3>
								<figure className="flex flex-col gap-2">
									<Image
										src="/assets/seniordans.jpg"
										alt="senior danse"
										width={356}
										height={216}
									/>
									<figcaption className="text-[#E9E9E9] font-normal text-sm/5">
										Selskabs- og seniordans kombinerer hyggeligt samvær med
										skånsom motion. Vi danser klassiske pardanse i et tempo,
										hvor alle kan følge med. Undervisningen styrker balance,
										koordination og kondition, samtidig med at fællesskabet og
										danseglæden er i centrum.
									</figcaption>
								</figure>
							</article>
						</li>
						<li>
							<article className="flex flex-col gap-2">
								<h3 className="text-[#E9E9E9] font-medium text-2xl">
									Moderne dans og ballet
								</h3>
								<figure className="flex flex-col gap-2">
									<Image
										src="/assets/modernedans.jpg"
										alt="moderne danse artister"
										width={356}
										height={216}
									/>
									<figcaption className="text-[#E9E9E9] font-normal text-sm/5">
										Moderne dans og ballet forener teknik, kropskontrol og
										musikalsk udtryk. Træningen forbedrer styrke, smidighed og
										holdning gennem varierede øvelser. Undervisningen foregår i
										en positiv atmosfære, hvor bevægelsesglæde og koncentration
										skaber både fordybelse og effektiv motion.
									</figcaption>
								</figure>
							</article>
						</li>
						<li>
							<article className="flex flex-col gap-2">
								<h3 className="text-[#E9E9E9] font-medium text-2xl">
									Streetdance og hiphop
								</h3>
								<figure className="flex flex-col gap-2">
									<Image
										src="/assets/streethiphop.jpg"
										alt="street hiphop artister"
										width={356}
										height={216}
									/>
									<figcaption className="text-[#E9E9E9] font-normal text-sm/5">
										Streetdance og hiphop er energifyldt træning med fokus på
										rytme, attitude og fællesskab. Vi arbejder med grooves,
										koreografier og grundtrin, der styrker kondition og
										koordination. Stemningen er uformel og motiverende, så
										motion og danseglæde går hånd i hånd.
									</figcaption>
								</figure>
							</article>
						</li>
					</ul>
				</article>
			</section>
			<section className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-4 px-8 sm:items-start">
				<article className="flex flex-col gap-4">
					<h2 className="text-[#E9E9E9] font-normal text-4xl">Nyhedsbrev</h2>
					<p className="text-[#E9E9E9] font-normal text-sm/5">
						Få direkte besked når vi har sæsonstart eller afholder
						arrangementer.
					</p>
					<NewsletterForm />
				</article>
			</section>
			<section>
				<TestimonialCarousel testimonials={testimonials} />
			</section>
			<section className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-4 px-8 sm:items-start">
				<article className="flex flex-col gap-4 w-full">
					<h2 className="text-[#E9E9E9] font-normal text-4xl">Kontakt os</h2>
					<ContactForm />
				</article>
			</section>
			<footer className="flex flex-1 w-full max-w-3xl flex-col py-8 px-8">
				<Footer />
			</footer>
		</main>
	);
}
