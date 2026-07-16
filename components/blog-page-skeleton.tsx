import { Skeleton } from "./ui/skeleton";

export default function BlogPageSkeleton() {
	return (
		<div>
			<Skeleton className="mx-auto w-2xl px-4 py-8 mt-9 bg-card" />
			<Skeleton className="mx-auto w-2xl h-100 px-4 py-8 mt-9 bg-card" />
			<Skeleton className="mx-auto w-2xl h-35 px-4 py-8 mt-9 bg-card" />
		</div>
	);
}
