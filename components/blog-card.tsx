import Link from "next/link";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { posts } from "@/lib/db/schema";

type Post = typeof posts.$inferSelect & {
	commentCount?: number;
};

export default function BlogCard({ post }: { post: Post }) {
	return (
		<Link href={`/blog/${post.slug}`}>
			<Card>
				<CardHeader>
					<CardTitle>{post.title}</CardTitle>
					<CardDescription>
						{new Date(post.createdAt).toLocaleDateString()}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="line-clamp-3 text-muted-foreground">{post.body}</p>
				</CardContent>
				{typeof post.commentCount === "number" && (
					<CardFooter>
						<span className="text-xs text-muted-foreground">
							{post.commentCount}{" "}
							{post.commentCount === 1 ? "comment" : "comments"}
						</span>
					</CardFooter>
				)}
			</Card>
		</Link>
	);
}
