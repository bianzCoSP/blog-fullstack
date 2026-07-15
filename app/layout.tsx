import type { Metadata } from "next";
import "./globals.css";

import { JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import { Header } from "@/components/header";
import HeaderSkeleton from "@/components/header-skeleton";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
	variable: "--font-mono-terminal",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		template: "%s | Blog",
		default: "Blog",
	},
	description: "Blog Description",
	openGraph: {
		title: {
			template: "%s | Blog",
			default: "Blog",
		},
		description: "Blog Description",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			suppressHydrationWarning
			lang="en"
			className={cn("h-full", "antialiased", jetbrainsMono.variable)}
		>
			<body className="min-h-full flex flex-col bg-background text-foreground">
				<ThemeProvider attribute="class" enableSystem defaultTheme="system">
					<Suspense fallback={<HeaderSkeleton />}>
						<Header />
					</Suspense>
					<main className="flex flex-1 flex-col">{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
