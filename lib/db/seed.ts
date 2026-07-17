import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema";

const TAG_POOL = [
	"javascript",
	"typescript",
	"react",
	"nodejs",
	"postgres",
	"drizzle",
	"webdev",
	"tutorial",
	"news",
	"opinion",
];

function randomTags() {
	const count = 1 + Math.floor(Math.random() * 3); // 1-3 tags
	const shuffled = [...TAG_POOL].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
}

async function main() {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not set");
	}

	const client = neon(process.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	console.log("resetting db");
	await reset(db, schema);

	await seed(db, schema, { seed: Date.now() }).refine((f) => ({
		posts: {
			count: 4,
			columns: {
				title: f.loremIpsum({ sentencesCount: 1 }),
				slug: f.valuesFromArray({
					values: ["blog-post-1", "blog-post-2", "blog-post-3", "blog-post-4"],
					isUnique: true,
				}),
				body: f.loremIpsum({ sentencesCount: 5 }),
			},
			with: {
				comments: [
					{ weight: 0.5, count: [1, 2] },
					{ weight: 0.5, count: [3, 4] },
				],
			},
		},
		comments: {
			columns: {
				authorName: f.fullName(),
				body: f.loremIpsum({ sentencesCount: 2 }),
			},
		},
	}));

	const [post5] = await db
		.insert(schema.posts)
		.values({
			title: "manual post",
			slug: "blog-post-5",
			body: "this post is manually inserted instead of using drizzle's seeding for testing.",
		})
		.returning({ id: schema.posts.id });

	await db.insert(schema.comments).values({
		postId: post5.id,
		authorName: "Jane Doe",
		body: "test comment",
		approved: false,
	});

	console.log("assigning random tags");
	const allPosts = await db.select({ id: schema.posts.id }).from(schema.posts);
	for (const post of allPosts) {
		await db
			.update(schema.posts)
			.set({ tags: randomTags() })
			.where(eq(schema.posts.id, post.id));
	}

	console.log("seed complete");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("seed failed:", err);
		process.exit(1);
	});
