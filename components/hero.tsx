import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
	return (
		<section className="lantern-glow grain relative overflow-hidden border-border border-b">
			<div className="relative z-10 mx-auto flex max-w-5xl flex-col items-start gap-8 px-6 py-24 sm:py-32">
				<span className="eyebrow">Adrift — a blog</span>
				<h1 className="max-w-2xl text-4xl text-foreground leading-[1.1] sm:text-6xl">
					A small world, sealed in glass and cork.
				</h1>
				<p className="max-w-xl text-lg text-muted-foreground">
					Set these messages adrift in the sea until they disappear along with
					the seaweed
				</p>
				<div className="flex flex-wrap items-center gap-3">
					<Button className="btn-wax text-gold rounded-full p-5 cursor-pointer">
						<Link href="/blog">Read the log</Link>
					</Button>
				</div>
			</div>
			<svg
				aria-label="divider"
				className="wave-divider absolute bottom-0 left-0 text-background"
				viewBox="0 0 1440 60"
				preserveAspectRatio="none"
				aria-hidden
			>
				<path
					d="M0 30c120-20 240-20 360 0s240 20 360 0 240-20 360 0 240 20 360 0V60H0Z"
					fill="currentColor"
				/>
			</svg>
		</section>
	);
}
