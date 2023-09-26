import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});
export const collections = {
  blog: blogCollection,
};
