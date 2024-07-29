import { Hono } from "hono";
import { file_upload_app } from "./file-upload";
import { transcription_app } from "./transcription";
import { generate_post_app } from "./generate-post";
import { auth_middleware } from "@/lib/server/middleware/auth.middleware";
import { post_app } from "./post";

export const main = new Hono<{
  Variables: {
    user: {
      email: string;
      id: string;
      user_name: string;
    };
  };
}>();
main.use(auth_middleware);
main.route("/file-upload", file_upload_app);
main.route("/transcription", transcription_app);
main.route("/post", post_app);
