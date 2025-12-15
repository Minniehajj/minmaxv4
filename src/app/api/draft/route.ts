import type { NextRequest } from "next/server";

import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

import { getPostAndMorePosts } from "@/lib/fetch/getPostAndMorePosts";

const PREVIEW_SECRET = process.env.CONTENTFUL_PREVIEW_SECRET;

const parseSlug = (searchParams: URLSearchParams): string => {
	const slug = searchParams.get("slug") ?? searchParams.get("path");

	if (!slug) {
		return "";
	}

	return slug.replace(/^\/+/, "");
};

export async function GET(request: NextRequest) {
	const { searchParams } = request.nextUrl;
	const secret = searchParams.get("secret");

	if (PREVIEW_SECRET && secret !== PREVIEW_SECRET) {
		return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
	}

	const parsedSlug = parseSlug(searchParams);

	if (!parsedSlug) {
		return NextResponse.json({ message: "Missing slug" }, { status: 400 });
	}

	const { post } = await getPostAndMorePosts(parsedSlug, true);

	if (!post) {
		return NextResponse.json({ message: "Invalid slug" }, { status: 404 });
	}

	draftMode().enable();

	return redirect(`/article/${post.slug}`);
}
