import Image from 'next/image';

export default function Footer() {
	return (
		<article>
			<figure className="flex flex-col items-center gap-4">
				<Image
					src="/assets/icon.png"
					alt="Landrup dans icon"
					width={64}
					height={62}
				/>
				<figcaption className="flex flex-col items-center gap-4">
					<h2 className="text-[#E9E9E9] font-medium text-2xl">Landrup Dans</h2>
					<div className="flex flex-col items-center">
						<p className="text-[#E9E9E9] font-normal text-sm">
							Pulsen 8. 4000 Roskilde
						</p>
						<p className="text-[#E9E9E9] font-normal text-sm">Tlf. 3540 4550</p>
					</div>
				</figcaption>
			</figure>
		</article>
	);
}
