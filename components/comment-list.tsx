import type { comments } from "@/lib/db/schema";

import Comment from "./comment";

type CommentType = typeof comments.$inferSelect;

export default function CommentList({ comments }: { comments: CommentType[] }) {
	if (comments.length === 0) {
		return (
			<p className="mt-4 text-sm text-muted-foreground">No comments yet.</p>
		);
	}

	return (
		<div className="mt-4">
			{comments.map((comment) => (
				<Comment key={comment.id} comment={comment} />
			))}
		</div>
	);
}
