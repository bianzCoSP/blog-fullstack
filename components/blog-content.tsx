import { Badge } from "@/components/ui/badge";
import type { posts } from "@/lib/db/schema";

type Post = typeof posts.$inferSelect;

export default function BlogContent({ post }: { post: Post }) {
	return (
		<div className="mb-8">
			<h1 className="text-3xl font-heading font-medium">{post.title}</h1>
			<p className="mt-1 text-muted-foreground">
				{new Date(post.createdAt).toLocaleDateString()}
			</p>
			{post.tags.length > 0 && (
				<div className="mt-3 flex flex-wrap gap-1.5">
					{post.tags.map((tag) => (
						<Badge key={tag} variant="secondary">
							{tag}
						</Badge>
					))}
				</div>
			)}
			<div className="mt-6 whitespace-pre-wrap text-base">{post.body}</div>
		</div>
	);
}
