import z from "zod";

export const CreateLinkSchema = z.object({
    url: z.url(),
    shortUrl: z.string().min(3).max(15),
});