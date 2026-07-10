"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db/drizzle";
import { comments } from "@/lib/db/schema";

const commentSchema = z.object({
	authorName: z
		.string()
		.trim()
		.min(1, "Name is required")
		.max(80, "Name must be 80 characters or fewer"),
	body: z
		.string()
		.trim()
		.min(10, "Comment must be 10 characters or longer")
		.max(2000, "Comment must be 2000 characters or fewer"),
});

export type CommentFormState = {
	errors?: {
		authorName?: string[];
		body?: string[];
	};
	success?: boolean;
};

export async function addComment(
	postId: string,
	slug: string,
	_prevState: CommentFormState,
	formData: FormData,
): Promise<CommentFormState> {
	const result = commentSchema.safeParse({
		authorName: formData.get("authorName"),
		body: formData.get("body"),
	});

	if (!result.success) {
		return { errors: z.flattenError(result.error).fieldErrors };
	}

	await db.insert(comments).values({ postId, ...result.data });

	revalidatePath(`/blog/${slug}`);

	return { success: true };
}
