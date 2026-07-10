import BlogPage from "@/components/blog-page";

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	return <BlogPage slug={slug} />;
}
