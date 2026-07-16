import { getAllPosts } from "@/lib/db/queries";

import BlogListPage from "./blog-list-page";

export default async function BlogList() {
	const allPosts = await getAllPosts();

	if (allPosts.length === 0) {
		return <p className="text-muted-foreground">No posts yet.</p>;
	}

	return (
		<div>
			<h1 className="mb-6 text-3xl font-heading font-medium">Blog</h1>
			<BlogListPage
				posts={allPosts.map((post) => ({
					...post,
					commentCount: post.comments.length,
				}))}
			/>
		</div>
	);
}
