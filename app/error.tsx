"use client";

export default function ErrorPage({
	error,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			<h2>Something went wrong</h2>
			<p>{error.message}</p>
		</div>
	);
}
