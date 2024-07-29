import { connect_db } from "@/db";
import { main } from "@/server";
import { auth_app } from "@/server/auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";

// export const runtime = "edge";
connect_db();
const app = new Hono().basePath("/api");

app.route("/v1", main);
app.route("/auth", auth_app);

export const GET = handle(app);
export const POST = handle(app);
