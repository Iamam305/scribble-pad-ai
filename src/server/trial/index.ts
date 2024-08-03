import { POST } from "@/db/schemas/post.model";
import { extract_string_between_tags } from "@/lib/server/functions/extract-string-bw-tags";
import { generate_blog_post } from "@/lib/server/functions/generate-blog-post";
import { generate_linkedin_post } from "@/lib/server/functions/generate-linkedin-post";
import { generate_twitter_thread } from "@/lib/server/functions/generate-twitter-thread";
import { transcribe } from "@/lib/server/functions/transcribe";
import { unauth_middleware } from "@/lib/server/middleware/unauth.middleware";
import { randomUUID } from "crypto";
import { Hono } from "hono";

export const trial_app = new Hono<{ Variables: any }>();
trial_app.use(unauth_middleware);

trial_app.post("/", async (c) => {
  try {
    const { audio_file_key, post_type } = await c.req.json();
    console.log(audio_file_key, post_type);
    const unauth_uuid = c.get("unauth_uuid");
    console.log(unauth_uuid);

    const posts_count = await POST.countDocuments({ unauth_uuid });
    console.log(posts_count);

    if (posts_count >= 10) {
      return c.json(
        { error: "You have reached your post limit sign up for more" },
        500
      );
    }
    const avilable_post_types = ["linkedin-post", "blog-post", "twitter-thread"];
    if (avilable_post_types.indexOf(post_type) === -1) {
      return c.json({ error: "Invalid post type" }, 500);
    }

    const [transcription_key, transcription_error] = await transcribe(
      audio_file_key
    );
    if (transcription_error || !transcription_key) {
      console.log(transcription_error);

      return c.json({ error: "Somethings went wrong" }, 500);
    }

    if (post_type === "linkedin-post") {
      const [post, post_generation_error] = await generate_linkedin_post(
        transcription_key
      );
      if (post_generation_error || !post) {
        console.log(post_generation_error);
        return c.json({ error: "Somethings went wrong" }, 500);
      }

      const title = extract_string_between_tags(post as string, "post_title");
      const linkedin_post = extract_string_between_tags(
        post as string,
        "linkedin_post"
      );
      const new_post = await new POST({
        title: title as string,
        body: linkedin_post as string,
        unauth_uuid,
        type: post_type,
      }).save();
      console.log(new_post);

      return c.json(new_post);
    }

    if (post_type === "blog-post") {
      const [post, post_generation_error] = await generate_blog_post(
        transcription_key
      );

      if (post_generation_error || !post) {
        console.log(post_generation_error);
        return c.json({ error: post_generation_error }, 500);
      }
      console.log(post);

      const title = extract_string_between_tags(post as string, "title");
      const blog_post = extract_string_between_tags(
        post as string,
        "blog_post"
      );
      const description = extract_string_between_tags(
        post as string,
        "description"
      );
      const tags = extract_string_between_tags(post as string, "tags");

      const new_post =await new POST({
        title: title as string,
        body: blog_post as string,
        unauth_uuid,
        type: post_type,
        extra_info: {
          description: description as string,
          tags: tags as string,
        },
      }).save();

      return c.json(new_post);
    }

    if (post_type === "twitter-thread") {
      const [post, post_generation_error] = await generate_twitter_thread(
        transcription_key
      );

      if (post_generation_error || !post) {
        console.log(post_generation_error);
        return c.json({ error: post_generation_error }, 500);
      }
      console.log(post);

      const title = extract_string_between_tags(post as string, "title");
      const twitter_thread = extract_string_between_tags(
        post as string,
        "twitter_thread"
      );
      const new_post =await new POST({
        title: title as string,
        body: twitter_thread as string,
        unauth_uuid,
        type: post_type,
      }).save();

      return c.json(new_post);
    }
  } catch (error) {
    console.log(error);
    return c.json({ error: "Somethings went wrong" }, 500);
  }
});
