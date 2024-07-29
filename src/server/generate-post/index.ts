import { generate_linkedin_post } from "@/lib/server/functions/generate-linkedin-post";
import { Hono } from "hono";

export const generate_post_app = new Hono();

generate_post_app.post("/linkedin", async (c) => {
  try {
    const { transcription_key } = await c.req.json();

    const [post, post_generation_error] = await generate_linkedin_post(
      transcription_key
    );

    if (post_generation_error) {
      console.log(post_generation_error);
      return c.json({ error: post_generation_error }, 500);
    }

    return c.json({ post });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Somethings went wrong" }, 500);
  }
});
