"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorTest() {
	const [errorActive, setErrorActive] = useState(false);

	if (errorActive) {
		throw new Error("Test Error: Thrown intentionally for testing");
	}

	return (
		<div className="flex flex-col flex-1 items-center justify-center">
			<Button onClick={() => setErrorActive(true)}>Test Button</Button>
		</div>
	);
}
