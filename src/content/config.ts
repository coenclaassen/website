import { defineCollection, z } from "astro:content";

const coffee = defineCollection({
  type: "content",
  schema: z.object({
    id: z.number(),
    title: z.string(),
    name: z.string(),
    date: z.string(),
    website: z.string().optional(),
    location: z.string().optional(),

    paragraph1Title: z.string().optional(),
    paragraph1Body: z.string().optional(),
    paragraph2Title: z.string().optional(),
    paragraph2Body: z.string().optional(),
    paragraph3Title: z.string().optional(),
    paragraph3Body: z.string().optional(),
    paragraph4Title: z.string().optional(),
    paragraph4Body: z.string().optional()
  })
});

export const collections = { coffee };
