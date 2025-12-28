"use server";

import { LoginSchema } from "@/lib/schema/auth/login-schema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export default async function login(previousState: LoginFormState, formData: FormData): Promise<LoginFormState> {
    const { email, password } = Object.fromEntries(formData.entries());

    const validatedInput = LoginSchema.safeParse({ email, password });

    if (!validatedInput.success) {

        const tree = z.treeifyError(validatedInput.error);

        return {
            message: null,
            errors: {
                email: tree.properties?.email?.errors[0],
                password: tree.properties?.password?.errors[0]
            }
        }
    }

    const response = await fetch(`${process.env.EXPRESS_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return {
            message: "Login failed",
            errors: null
        }
    }

    const { data: { accessToken } } = await response.json();

    if (!accessToken) {
        return {
            message: "Login failed",
            errors: null
        }
    }

    (await cookies()).set("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60,
        path: "/",
    });

    redirect("/links");
}

interface LoginFormState {
    message?: string | null;
    errors?: Record<string, string | undefined> | null;
}