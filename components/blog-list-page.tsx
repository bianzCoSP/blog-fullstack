"use client";

import { Check, Search, Tags, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { posts } from "@/lib/db/schema";

import BlogCard from "./blog-card";

type Post = typeof posts.$inferSelect & {
	commentCount?: number;
};

export default function BlogListPage({ posts }: { posts: Post[] }) {
	const [query, setQuery] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [tagPopoverOpen, setTagPopoverOpen] = useState(false);

	const allTags = useMemo(() => {
		const tagSet = new Set<string>();
		for (const post of posts) {
			for (const tag of post.tags) tagSet.add(tag);
		}
		return Array.from(tagSet).sort();
	}, [posts]);

	const filteredPosts = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return posts.filter((post) => {
			if (selectedTags.length > 0) {
				const hasSelectedTag = selectedTags.some((tag) =>
					post.tags.includes(tag),
				);
				if (!hasSelectedTag) return false;
			}

			if (normalizedQuery.length === 0) return true;

			if (post.title.toLowerCase().includes(normalizedQuery)) return true;

			const createdAt = new Date(post.createdAt);
			const dateVariants = [
				createdAt.toLocaleDateString(),
				createdAt.toISOString().slice(0, 10),
				createdAt.toLocaleDateString("en-US", {
					month: "long",
					year: "numeric",
				}),
				createdAt.toLocaleDateString("en-US", { month: "short" }),
			].join(" ");

			return dateVariants.toLowerCase().includes(normalizedQuery);
		});
	}, [posts, query, selectedTags]);

	function toggleTag(tag: string) {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
		);
	}

	function clearFilters() {
		setQuery("");
		setSelectedTags([]);
	}

	const hasActiveFilters = query.length > 0 || selectedTags.length > 0;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
				<div className="relative flex-1">
					<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
					<Input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search by title or date..."
						className="pl-9"
					/>
				</div>

				<Popover open={tagPopoverOpen} onOpenChange={setTagPopoverOpen}>
					<PopoverTrigger
						render={
							<Button
								variant="outline"
								className="justify-between sm:w-48"
								disabled={allTags.length === 0}
							/>
						}
					>
						<span className="flex items-center gap-2">
							<Tags className="h-4 w-4" />
							{selectedTags.length > 0
								? `${selectedTags.length} tag${selectedTags.length === 1 ? "" : "s"}`
								: "Filter by tag"}
						</span>
					</PopoverTrigger>
					<PopoverContent className="w-56 p-0" align="end">
						<Command>
							<CommandList>
								<CommandEmpty>No tags found.</CommandEmpty>
								<CommandGroup>
									{allTags.map((tag) => {
										const isSelected = selectedTags.includes(tag);
										return (
											<CommandItem
												key={tag}
												onSelect={() => toggleTag(tag)}
												className="cursor-pointer"
											>
												<Check
													className={`mr-2 h-4 w-4 ${
														isSelected ? "opacity-100" : "opacity-0"
													}`}
												/>
												{tag}
											</CommandItem>
										);
									})}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>

				{hasActiveFilters && (
					<Button variant="ghost" size="sm" onClick={clearFilters}>
						<X className="h-4 w-4" />
						Clear
					</Button>
				)}
			</div>

			{selectedTags.length > 0 && (
				<div className="flex flex-wrap gap-1.5">
					{selectedTags.map((tag) => (
						<Badge
							key={tag}
							variant="secondary"
							className="cursor-pointer gap-1"
							onClick={() => toggleTag(tag)}
						>
							{tag}
							<X className="h-3 w-3" />
						</Badge>
					))}
				</div>
			)}

			{filteredPosts.length === 0 ? (
				<p className="text-muted-foreground">
					No posts match your search or filters.
				</p>
			) : (
				<div className="grid gap-4">
					{filteredPosts.map((post) => (
						<BlogCard key={post.id} post={post} />
					))}
				</div>
			)}
		</div>
	);
}
