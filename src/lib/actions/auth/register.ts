"use server";

import { RegisterSchema } from "@/lib/schema/auth/register-schema";
import z from "zod";

export default async function register(previousState: RegisterFormState, formData: FormData): Promise<RegisterFormState> {
    try {
        const { email, password, confirmPassword } = Object.fromEntries(formData.entries());

        const validatedInput = RegisterSchema.safeParse({
            email,
            password,
            confirmPassword,
        });

        if (!validatedInput.success) {
            const tree = z.treeifyError(validatedInput.error);

            return {
                message: null,
                errors: {
                    email: tree.properties?.email?.errors[0],
                    password: tree.properties?.password?.errors[0],
                    confirmPassword: tree.properties?.confirmPassword?.errors[0],
                },
            };
        }

        const response = await fetch(`${process.env.EXPRESS_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const { message } = await response.json();

        if (response.ok) {
            return {
                message: message,
                errors: null,
            };
        }

        return {
            message: `${message}`,
            errors: null
        };
    } catch (error) {
        return {
            message: `Something went wrong ${error}`,
            errors: null
        };
    }
}

interface RegisterFormState {
    message?: string | null;
    errors?: Record<string, string | undefined> | null;
}