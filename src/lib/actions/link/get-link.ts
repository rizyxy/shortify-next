"use server";

import Link from "@/lib/types/link";
import { cookies } from "next/headers";

export async function getLinks(): Promise<Link[]> {
    try {

        const accessToken = (await cookies()).get("accessToken")?.value;

        const response = await fetch(`${process.env.EXPRESS_URL}/links`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch links : ${response.status} ${response.statusText}`);
        }

        const { data: { links } }: { data: { links: Link[] } } = await response.json();

        return links;
    } catch (error) {
        throw error;
    }
}
