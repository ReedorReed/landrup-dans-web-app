'use client';

import type { Testimonial } from '@/_types/testimonial';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from '../ui/carousel';

type TestimonialCarouselProps = {
	testimonials: Testimonial[];
};

export default function TestimonialCarousel({
	testimonials
}: TestimonialCarouselProps) {
	return (
		<article className="relative w-full bg-[#003147] px-8 py-12">
			<div className="absolute inset-0 bg-[url(/assets/heroimg.jpg)] opacity-5 bg-cover bg-center"></div>
			<h2 id="testimonials-heading" className="sr-only">
				Det siger vores kunder om os
			</h2>

			<Carousel
				opts={{ loop: true, align: 'center' }}
				className="mx-auto w-full max-w-[356px]">
				<CarouselContent>
					{testimonials.map((testimonial) => (
						<CarouselItem key={testimonial.id}>
							<article className="flex min-h-[296px] flex-col items-center justify-center px-7 text-center text-[#E9E9E9]">
								<h3 className="text-2xl font-semibold leading-6">
									Det siger vores
									<br />
									kunder om os
								</h3>

								<blockquote className="mt-8 text-sm leading-4">
									{testimonial.content}
								</blockquote>

								<p className="mt-4 font-bold">{testimonial.name}</p>
								<p className="text-xs text-[#E9E9E9]/70 mb-10">
									{testimonial.occupation}
								</p>
							</article>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className="mt-[-48px] flex justify-center gap-3">
					<CarouselPrevious className="static size-10 translate-y-0 border-[#E9E9E9] bg-transparent text-[#E9E9E9] hover:bg-white/10 hover:text-[#E9E9E9]" />
					<CarouselNext className="static size-10 translate-y-0 border-[#E9E9E9] bg-transparent text-[#E9E9E9] hover:bg-white/10 hover:text-[#E9E9E9]" />
				</div>
			</Carousel>
		</article>
	);
}
