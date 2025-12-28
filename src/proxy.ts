"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function Proxy(req: NextRequest) {
    const isAuthenticated = (await cookies()).get("accessToken")?.value !== undefined;

    if (req.nextUrl.pathname.startsWith("/links") && !isAuthenticated) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    return NextResponse.next();
}