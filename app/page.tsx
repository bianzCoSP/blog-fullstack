import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to my Portfolio!",
	openGraph: {
		title: "Home",
		description: "Welcome to my Portfolio!",
	},
};

// hello from bianz!

export default function Page() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			Hello World!
		</div>
	);
}
