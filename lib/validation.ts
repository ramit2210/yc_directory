import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(3).max(20),
    link: z
        .string()
        .url()
        .refine(async (url) => {
            try {
                const res = await fetch("/api/validate-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ url }),
                });
                const data = await res.json();
                return data.valid;
            } catch {
                return false;
            }
        }),
    pitch: z.string().min(10),
});
