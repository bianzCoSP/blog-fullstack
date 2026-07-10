"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import type { CommentFormState } from "@/lib/actions/comment-actions";

type CommentFormAction = (
	prevState: CommentFormState,
	formData: FormData,
) => Promise<CommentFormState>;

const initialState: CommentFormState = {};

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className="self-start" disabled={pending}>
			{pending ? "Posting..." : "Post comment"}
		</Button>
	);
}

export default function CommentForm({ action }: { action: CommentFormAction }) {
	const formRef = useRef<HTMLFormElement>(null);
	const [state, formAction] = useActionState(action, initialState);

	useEffect(() => {
		if (state.success) {
			formRef.current?.reset();
		}
	}, [state.success]);

	return (
		<form
			ref={formRef}
			action={formAction}
			className="mt-8 flex flex-col gap-3"
			noValidate
		>
			<div className="flex flex-col gap-1">
				<input
					name="authorName"
					placeholder="Name"
					aria-invalid={!!state.errors?.authorName}
					className="rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:ring-3 aria-invalid:ring-destructive/30 aria-invalid:border-destructive"
				/>
				{state.errors?.authorName && (
					<p className="text-sm text-destructive">
						{state.errors.authorName[0]}
					</p>
				)}
			</div>

			<div className="flex flex-col gap-1">
				<textarea
					name="body"
					placeholder="Add a comment"
					rows={3}
					aria-invalid={!!state.errors?.body}
					className="rounded-lg border px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:ring-3 aria-invalid:ring-destructive/30 aria-invalid:border-destructive"
				/>
				{state.errors?.body && (
					<p className="text-sm text-destructive">{state.errors.body[0]}</p>
				)}
			</div>

			<SubmitButton />
		</form>
	);
}
