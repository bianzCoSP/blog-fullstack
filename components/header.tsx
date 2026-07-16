"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [{ name: "blog", href: "/blog" }];

export const Header = () => {
	const [menuState, setMenuState] = React.useState(false);
	const [isScrolled, setIsScrolled] = React.useState(false);
	const pathname = usePathname();

	React.useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	React.useEffect(() => {
		if (pathname) setMenuState(false); // satisfy linter "hook specifies more dependencies than necessary"
	}, [pathname]);

	return (
		<header className="sticky top-0 z-50">
			<nav
				data-state={menuState && "active"}
				className={cn(
					"z-20 w-full font-mono transition-all duration-300",
					isScrolled &&
						"bg-background/85 border-b border-border backdrop-blur-lg",
				)}
			>
				<div className="mx-auto max-w-5xl px-6">
					<div className="relative flex flex-wrap items-center justify-between gap-6 py-6 lg:gap-0">
						<div className="flex w-full justify-between gap-6 lg:w-auto">
							<Link
								href="/"
								aria-label="home"
								className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
							>
								<div className="relative h-7 w-7 shrink-0 flex items-center justify-center">
									<Image
										src="/waxSeal.png"
										alt="wax seal"
										fill
										sizes="36px"
										className="object-contain"
										priority
									/>
								</div>
								<span className="text-base font-semibold tracking-[0.12em] text-foreground">
									Adrift
								</span>
							</Link>

							<button
								type="button"
								onClick={() => setMenuState(!menuState)}
								aria-label={menuState === true ? "Close Menu" : "Open Menu"}
								className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
							>
								<Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
								<X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
							</button>
						</div>

						{/*
						<div className="absolute inset-0 m-auto hidden size-fit lg:block">
							<ul className="flex gap-1">
								{menuItems.map((item) => (
									<li key={item.name}>
										<Button variant="ghost" size="sm">
											<Link href={item.href} className="text-sm">
												<span>{item.name}</span>
											</Link>
										</Button>
									</li>
								))}
							</ul>
						</div>
            */}

						<div className="bg-card in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-2xl border border-border p-6 shadow-2xl shadow-black/10 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
							<div className="lg:hidden">
								<ul className="space-y-6 text-sm">
									{menuItems.map((item) => (
										<li key={item.name}>
											<Link
												href={item.href}
												className="text-muted-foreground hover:text-core block duration-150"
											>
												<span>{item.name}</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};
