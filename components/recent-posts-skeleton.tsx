import { Skeleton } from "@/components/ui/skeleton";

export default function RecentPostsSkeleton() {
	return (
		<section className="border-border border-b">
			<div className="mx-auto max-w-5xl px-6 py-20">
				<Skeleton className="h-6 w-40" />
				<Skeleton className="mt-4 h-8 w-72" />
				<div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{[0, 1, 2].map((i) => (
						<Skeleton
							key={i}
							className="h-48 rounded-lg border border-border bg-card"
						/>
					))}
				</div>
			</div>
		</section>
	);
}
