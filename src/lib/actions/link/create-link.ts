"use server";

import { CreateLinkSchema } from "@/lib/schema/link/create-link-schema";
import { cookies } from "next/headers";
import z from "zod";

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

        const accessToken = (await cookies()).get("accessToken")?.value;

        const response = await fetch(`${process.env.EXPRESS_URL}/links/create`, {
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

        const { error } = await response.json();

        if (response.ok) {
            return {
                message: null,
                errors: null,
            };
        }

        return {
            message: error,
            errors: null
        };
    } catch (error) {
        return {
            message: `Something went wrong`,
            errors: null
        };
    }
}

interface CreateLinkFormState {
    message?: string | null;
    errors?: Record<string, string | undefined> | null;
}