import { getAllPosts } from "@/lib/db/queries";

import BlogCard from "./blog-card";

export default async function BlogList() {
	const allPosts = await getAllPosts();

	if (allPosts.length === 0) {
		return <p className="text-muted-foreground">No posts yet.</p>;
	}

	return (
		<div className="grid gap-4">
			{allPosts.map((post) => (
				<BlogCard
					key={post.id}
					post={{ ...post, commentCount: post.comments.length }}
				/>
			))}
		</div>
	);
}
