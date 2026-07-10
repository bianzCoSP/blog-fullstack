import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { addComment } from "@/lib/actions/comment-actions";
import { db } from "@/lib/db/drizzle";
import { posts } from "@/lib/db/schema";

import BlogContent from "./blog-content";
import CommentForm from "./comment-form";
import CommentList from "./comment-list";

export default async function BlogPage({ slug }: { slug: string }) {
	const post = await db.query.posts.findFirst({
		where: eq(posts.slug, slug),
		with: {
			comments: {
				orderBy: (comments, { asc }) => [asc(comments.createdAt)],
			},
		},
	});

	if (!post) {
		notFound();
	}

	const postComment = addComment.bind(null, post.id, post.slug);

	return (
		<article className="mx-auto max-w-2xl px-4 py-8">
			<BlogContent post={post} />
			<CommentForm action={postComment} />
			<CommentList comments={post.comments} />
		</article>
	);
}
