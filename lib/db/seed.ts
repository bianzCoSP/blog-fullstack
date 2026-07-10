import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { reset, seed } from "drizzle-seed";
import * as schema from "./schema";

async function main() {
	if (!process.env.DATABASE_URL) {
		throw new Error("DATABASE_URL is not set");
	}

	const client = neon(process.env.DATABASE_URL);
	const db = drizzle(client, { schema });

	console.log("resetting db");
	await reset(db, schema);

	await seed(db, schema).refine((f) => ({
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

	console.log("seed complete");
}

main()
	.then(() => process.exit(0))
	.catch((err) => {
		console.error("seed failed:", err);
		process.exit(1);
	});
