"use server";

import Link from "@/lib/types/link";
import { cookies } from "next/headers";
import refresh from "../auth/refresh";
import { redirect } from "next/navigation";

export async function getLinks(): Promise<Link[]> {
    try {

        let accessToken = (await cookies()).get("accessToken")?.value;

        const getAllLinks = async (token: string | undefined) => {
            return await fetch(`${process.env.EXPRESS_URL}/links`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });
        }

        let response = await getAllLinks(accessToken);

        if (response.status === 401 || response.status === 403) {
            const refreshSuccess = await refresh();
            if (refreshSuccess) {
                accessToken = (await cookies()).get("accessToken")?.value;
                response = await getAllLinks(accessToken);
            } else {
                redirect("/auth/login");
            }
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch links : ${response.status} ${response.statusText}`);
        }

        const { data: { links } }: { data: { links: Link[] } } = await response.json();

        return links;
    } catch (error) {
        throw error;
    }
}
