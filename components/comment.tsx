import type { comments } from "@/lib/db/schema";

type CommentType = typeof comments.$inferSelect;

export default function Comment({ comment }: { comment: CommentType }) {
	return (
		<div className="border-b py-3 last:border-b-0">
			<div className="flex items-baseline justify-between">
				<span className="text-sm font-medium">{comment.authorName}</span>
				<span className="text-xs text-muted-foreground">
					{new Date(comment.createdAt).toLocaleDateString()}
				</span>
			</div>
			<p className="mt-1 text-sm text-muted-foreground">{comment.body}</p>
		</div>
	);
}
