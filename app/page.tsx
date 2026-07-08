import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Blog",
	description: "Blog Description",
	openGraph: {
		title: "Blog",
		description: "Blog Description",
	},
};

export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			Hello World!
		</div>
	);
}
