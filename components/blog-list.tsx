import { desc } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { posts } from "@/lib/db/schema";

import BlogCard from "./blog-card";

export default async function BlogList() {
	const allPosts = await db.query.posts.findMany({
		orderBy: desc(posts.createdAt),
		with: {
			comments: true,
		},
	});

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
