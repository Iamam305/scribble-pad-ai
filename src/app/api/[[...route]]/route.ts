import { main } from "@/server";
import { Hono } from "hono";
import { handle } from "hono/vercel";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

app.route("/v1", main);

export const GET = handle(app);
export const POST = handle(app);
