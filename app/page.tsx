import type { Metadata } from "next";
import { Suspense } from "react";

import Hero from "@/components/hero";
import RecentPosts from "@/components/recent-posts";
import RecentPostsSkeleton from "@/components/recent-posts-skeleton";

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
		<div className="flex flex-1 flex-col">
			<Hero />
			<Suspense fallback={<RecentPostsSkeleton />}>
				<RecentPosts />
			</Suspense>
		</div>
	);
}
