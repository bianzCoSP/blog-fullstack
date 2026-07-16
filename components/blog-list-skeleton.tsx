import { Skeleton } from "./ui/skeleton";

export default function BlogListSkeleton() {
	return (
		<div>
			{Array.from({ length: 5 }).map((_, i) => (
				<Skeleton
					// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
					key={i}
					className="mx-auto w-2xl h-40 px-4 py-2 mt-5 mb-5 bg-card"
				/>
			))}
		</div>
	);
}
