"use server";

import { CreateLinkSchema } from "@/lib/schema/link/create-link-schema";
import { cookies } from "next/headers";
import z from "zod";
import refresh from "../auth/refresh";
import { redirect } from "next/navigation";

export default async function createLink(previousState: CreateLinkFormState, formData: FormData) {
    try {
        const { url, shortUrl } = Object.fromEntries(formData.entries());

        const validatedInput = CreateLinkSchema.safeParse({
            url,
            shortUrl,
        });

        if (!validatedInput.success) {
            const tree = z.treeifyError(validatedInput.error);

            return {
                message: null,
                errors: {
                    url: tree.properties?.url?.errors[0],
                    shortUrl: tree.properties?.shortUrl?.errors[0],
                },
            };
        }

        let accessToken = (await cookies()).get("accessToken")?.value;

        const createLink = async (token: string | undefined) => await fetch(`${process.env.EXPRESS_URL}/links/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                url,
                shortUrl,
            }),
        });

        let response = await createLink(accessToken);

        if (response.status === 401 || response.status === 403) {
            const refreshSuccess = await refresh();
            if (refreshSuccess) {
                accessToken = (await cookies()).get("accessToken")?.value;
                response = await createLink(accessToken);
            } else {
                redirect("/auth/login");
            }
        }

        if (!response.ok) {
            const { error } = await response.json();

            return {
                message: error,
                errors: null
            };

        }
    } catch (error) {
        return {
            message: `Something went wrong ${error}`,
            errors: null
        };
    }

    redirect('/links');
}

interface CreateLinkFormState {
    message?: string | null;
    errors?: Record<string, string | undefined> | null;
}