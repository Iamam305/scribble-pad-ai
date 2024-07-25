import { Hono } from "hono";
import { file_upload_app } from "./file-upload";

export const main = new Hono();

main.route("/file-upload", file_upload_app);
