type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary' | 'danger';
};

export default function Button({
	variant = 'primary',
	className = '',
	children,
	...props
}: ButtonProps) {
	const variants = {
		primary:
			'bg-[#E9E9E9] text-[#003147] hover:bg-[#003147] hover:text-[#E9E9E9]',
		secondary:
			'bg-[#003147] text-[#E9E9E9] hover:bg-[#E9E9E9] hover:text-[#003147]',
		danger: 'bg-red-600 text-[#E9E9E9] hover:bg-red-700'
	};
	return (
		<button
			className={`w-full rounded-2xl px-4 py-3 text-lg sm:px-6 sm:py-4 sm:text-xl md:text-2xl shadow-[0_5px_6px_rgba(0,0,0,0.25)] transition-colors focus:outline-none focus:ring-2 focus:ring-white disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
            {...props}
        >
			{children}
		</button>
	);
}
