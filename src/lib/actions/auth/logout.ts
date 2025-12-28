"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    try {
        await fetch(`${process.env.EXPRESS_URL}/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                accessToken,
                refreshToken
            }),
        });
    } catch (error) {
        console.error("Backend logout failed", error);
    }

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    redirect("/auth/login");
}