"use server";

import { cookies } from "next/headers";

export default async function refresh() {
    try {

        const refreshToken = (await cookies()).get("refreshToken")?.value;

        const response = await fetch(`${process.env.EXPRESS_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: refreshToken
            }),
        });

        if (!response.ok) {
            return false;
        }

        const { data: { accessToken } } = await response.json();

        if (!accessToken) {
            return false;
        }

        (await cookies()).set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60,
            path: "/",
        });

        return true;
    } catch (error) {
        return false;
    }
}