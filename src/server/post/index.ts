import { POST } from "@/db/schemas/post.model";
import { extract_string_between_tags } from "@/lib/server/functions/extract-string-bw-tags";
import { generate_blog_post } from "@/lib/server/functions/generate-blog-post";
import { generate_linkedin_post } from "@/lib/server/functions/generate-linkedin-post";
import { generate_twitter_thread } from "@/lib/server/functions/generate-twitter-thread";
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
    console.log(post);

    const title = extract_string_between_tags(post as string, "post_title");
    const linkedin_post = extract_string_between_tags(
      post as string,
      "linkedin_post"
    );
    console.log(title, linkedin_post);

    const new_post = await new POST({
      author: user._id,
      body: linkedin_post,
      title: title,
      type: "linkedin-post",
      audio_file_key: audio_file_key,
      transcription_key: transcription_key,
    }).save();

    return c.json({ post, new_post });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Somethings went wrong" }, 500);
  }
});

post_app.post("/blog-post", async (c) => {
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
    const [post, post_generation_error] = await generate_blog_post(
      transcription_key
    );

    if (post_generation_error) {
      console.log(post_generation_error);
      return c.json({ error: post_generation_error }, 500);
    }
    console.log(post);

    const title = extract_string_between_tags(post as string, "title");
    const blog_post = extract_string_between_tags(post as string, "blog_post");
    const description = extract_string_between_tags(
      post as string,
      "description"
    );
    const tags = extract_string_between_tags(post as string, "tags");
    // console.log(title, blog_post);

    const new_post = await new POST({
      author: user._id,
      body: blog_post,
      title: title,
      type: "blog-post",
      audio_file_key: audio_file_key,
      transcription_key: transcription_key,
      extra_info: {
        description: description,
        tags: tags,
      },
    }).save();

    return c.json({ post, new_post });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Somethings went wrong" }, 500);
  }
});

post_app.post("/twitter-thread", async (c) => {
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
    const [post, post_generation_error] = await generate_twitter_thread(
      transcription_key
    );

    if (post_generation_error) {
      console.log(post_generation_error);
      return c.json({ error: post_generation_error }, 500);
    }
    console.log(post);

    const title = extract_string_between_tags(post as string, "title");
    const twitter_thread = extract_string_between_tags(
      post as string,
      "twitter_thread"
    );

    // console.log(title, blog_post);

    const new_post = await new POST({
      author: user._id,
      body: twitter_thread,
      title: title,
      type: "twitter-thread",
      audio_file_key: audio_file_key,
      transcription_key: transcription_key,
    }).save();

    return c.json({ post, new_post });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Somethings went wrong" }, 500);
  }
});

post_app.get("/", async (c) => {
  try {
    const user = c.get("user");
    const limit = 10;
    const page = c.req.query("page") || 1;
    const post_type = c.req.query("post_type");

    const query_fileter = post_type
      ? { type: post_type, author: user._id }
      : { author: user._id };
    const posts = await POST.find(query_fileter)
      .skip((+page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    return c.json({ posts });
  } catch (error) {
    console.log(error);
    return c.json({ error: "Somethings went wrong" }, 500);
  }
});
