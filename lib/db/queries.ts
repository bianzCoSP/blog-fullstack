import { asc, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import { db } from "@/lib/db/drizzle";
import { comments, posts } from "@/lib/db/schema";

export async function getAllPosts() {
	"use cache";
	cacheLife("hours");
	cacheTag("posts");

	return db.query.posts.findMany({
		orderBy: desc(posts.createdAt),
		with: {
			comments: {
				where: eq(comments.approved, true),
			},
		},
	});
}

export async function getPostBySlug(slug: string) {
	"use cache";
	cacheLife("hours");
	cacheTag("posts", `post-${slug}`);

	return db.query.posts.findFirst({
		where: eq(posts.slug, slug),
		with: {
			comments: {
				where: eq(comments.approved, true),
				orderBy: asc(comments.createdAt),
			},
		},
	});
}

export async function getUnapprovedComments() {
	return db.query.comments.findMany({
		where: eq(comments.approved, false),
		orderBy: asc(comments.createdAt),
		with: {
			post: true,
		},
	});
}
