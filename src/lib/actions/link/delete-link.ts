"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import refresh from "../auth/refresh";

export default async function deleteLink(previousState: DeleteLinkFormState, formData: FormData): Promise<DeleteLinkFormState> {
    try {
        const { id } = Object.fromEntries(formData.entries());

        let accessToken = (await cookies()).get("accessToken")?.value;

        const deleteLink = async (token: string | undefined) => await fetch(`${process.env.EXPRESS_URL}/links/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });

        let response = await deleteLink(accessToken);

        if (response.status === 401 || response.status === 403) {
            const refreshSuccess = await refresh();
            if (refreshSuccess) {
                accessToken = (await cookies()).get("accessToken")?.value;
                response = await deleteLink(accessToken);
            } else {
                redirect("/auth/login");
            }
        }

        if (!response.ok) {
            throw new Error(`Failed to delete link : ${response.status} ${response.statusText}`);
        }

        return { message: "Link deleted successfully" };
    } catch (error) {
        return { message: `Failed to delete link ${error}` };
    }
}

interface DeleteLinkFormState {
    message?: string | null;
}
