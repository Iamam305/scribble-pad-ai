import { POST } from "@/db/schemas/post.model";
import { generate_linkedin_post } from "@/lib/server/functions/generate-linkedin-post";
import { transcribe } from "@/lib/server/functions/transcribe";
import { Hono } from "hono";

export const post_app = new Hono<{ Variables: { user: any } }>();

post_app.post("/linkedin", async (c) => {
  try {
    const { audio_file_key } = await c.req.json();
    const user = c.get("user");
    console.log(user);

    const [transcription_key, transcription_error] = await transcribe(
      audio_file_key
    );
    if (transcription_error || !transcription_key) {
      console.log(transcription_error);

      return c.json({ error: "Somethings went wrong" }, 500);
    }
    const [post, post_generation_error] = await generate_linkedin_post(
      transcription_key
    );

    if (post_generation_error) {
      console.log(post_generation_error);
      return c.json({ error: post_generation_error }, 500);
    }
    const new_post = await new POST({
      author: user._id,
      body: post,
      title: "LinkedIn Post",
      type: "linkedin-post",
    }).save();

    return c.json({ post, new_post });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Somethings went wrong" }, 500);
  }
});
