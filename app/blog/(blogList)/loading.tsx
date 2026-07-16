import BlogListSkeleton from "@/components/blog-list-skeleton";

export default function BlogListLoading() {
	return (
		<main className="mx-auto max-w-2xl px-4 py-8">
			<BlogListSkeleton />
		</main>
	);
}
