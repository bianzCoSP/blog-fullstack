import BlogList from "@/components/blog-list";

export default function BlogListPage() {
	return (
		<main className="mx-auto max-w-2xl px-4 py-8">
			<h1 className="mb-6 text-2xl font-heading font-medium">Blog</h1>
			<BlogList />
		</main>
	);
}
