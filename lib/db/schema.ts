import { defineRelations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const posts = pgTable("posts", {
	id: uuid("id").primaryKey().defaultRandom(),
	title: text("title").notNull(),
	slug: text("slug").notNull().unique(),
	body: text("body").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const comments = pgTable("comments", {
	id: uuid("id").primaryKey().defaultRandom(),
	postId: uuid("post_id")
		.references(() => posts.id, { onDelete: "cascade" })
		.notNull(),
	authorName: text("author_name").notNull(),
	body: text("body").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const schema = { posts, comments };

export const relations = defineRelations(schema, (r) => ({
	posts: {
		comments: r.many.comments(),
	},
	comments: {
		post: r.one.posts({
			from: r.comments.postId,
			to: r.posts.id,
		}),
	},
}));
