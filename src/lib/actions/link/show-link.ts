"use server";

export async function showLink(shorturl: string) {
    const response = await fetch(`${process.env.EXPRESS_URL}/${shorturl}/portal`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch link : ${response.status} ${response.statusText}`);
    }

    const { data: { url } } = await response.json();

    return url;
}