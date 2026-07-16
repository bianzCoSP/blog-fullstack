import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/db/queries";

export default async function RecentPosts() {
	const allPosts = await getAllPosts();

	if (allPosts.length === 0) return null;

	const recentPosts = [...allPosts]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.slice(0, 3)
		.map((post) => ({ ...post, commentCount: post.comments.length }));

	return (
		<section className="relative border-border border-b">
			<div className="mx-auto max-w-5xl px-6 py-20">
				<div className="mb-10 flex items-end justify-between gap-4">
					<div>
						<span className="eyebrow">Recent arrivals</span>
						<h2 className="mt-2 text-3xl text-foreground">
							Bottles washed ashore
						</h2>
					</div>
					<Link
						href="/blog"
						className="hidden shrink-0 text-muted-foreground text-sm transition-colors hover:text-gold sm:block"
					>
						View the full log →
					</Link>
				</div>

				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{recentPosts.map((post, i) => (
						<Link
							key={post.id}
							href={`/blog/${post.slug}`}
							className="message-card group flex flex-col gap-4 p-6"
						>
							<div className="flex items-center justify-between">
								<div className="relative h-9 w-9 shrink-0 flex items-center justify-center">
									<Image
										src="/waxSeal.png"
										alt="wax seal"
										fill
										sizes="36px"
										className="object-contain"
									/>
									{/* Kept the dynamic post index layered on top */}
									<span className="absolute font-mono text-xs font-semibold text-gold-bright">
										{String(i + 1).padStart(2, "0")}
									</span>
								</div>
								<span className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
									{new Date(post.createdAt).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</span>
							</div>

							<h3 className="text-foreground text-xl transition-colors group-hover:text-gold-bright">
								{post.title}
							</h3>
							<p className="line-clamp-3 text-muted-foreground text-sm">
								{post.body}
							</p>

							{(post.tags.length > 0 ||
								typeof post.commentCount === "number") && (
								<div className="mt-auto flex items-center justify-between pt-2">
									<div className="flex flex-wrap gap-1.5">
										{post.tags.slice(0, 2).map((tag) => (
											<Badge key={tag} variant="secondary">
												{tag}
											</Badge>
										))}
									</div>
									{typeof post.commentCount === "number" && (
										<span className="text-muted-foreground text-xs">
											{post.commentCount}{" "}
											{post.commentCount === 1 ? "comment" : "comments"}
										</span>
									)}
								</div>
							)}
						</Link>
					))}
				</div>

				<div className="mt-8 sm:hidden">
					<Button
						variant="ghost"
						className="hidden shrink-0 text-muted-foreground text-sm hover:text-gold sm:inline-flex"
					>
						<Link href="/blog">View the full log →</Link>
					</Button>
				</div>
			</div>
		</section>
	);
}
