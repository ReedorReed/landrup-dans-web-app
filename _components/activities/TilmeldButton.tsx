'use client';

type TilmeldButtonProps = {
	action: () => Promise<void>;
	erTilmeldt: boolean;
};

export default function TilmeldButton({
	action,
	erTilmeldt
}: TilmeldButtonProps) {
	return (
		<form
			action={action}
			onSubmit={(event) => {
				if (
					erTilmeldt &&
					!window.confirm('Er du sikker på at du vil afmelde dig holdet?')
				) {
					event.preventDefault();
				}
			}}>
			<button
				type="submit"
				className="absolute bottom-7 left-5/12 z-10 w-50 rounded-xl bg-[#003147] py-3 text-xl text-[#E9E9E9]">
				{erTilmeldt ? 'Afmeld' : 'Tilmeld'}
			</button>
		</form>
	);
}
