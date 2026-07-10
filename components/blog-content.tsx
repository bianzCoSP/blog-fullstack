import type { posts } from "@/lib/db/schema";

type Post = typeof posts.$inferSelect;

export default function BlogContent({ post }: { post: Post }) {
	return (
		<div className="mb-8">
			<h1 className="text-2xl font-heading font-medium">{post.title}</h1>
			<p className="mt-1 text-sm text-muted-foreground">
				{new Date(post.createdAt).toLocaleDateString()}
			</p>
			<div className="mt-6 whitespace-pre-wrap text-sm">{post.body}</div>
		</div>
	);
}
