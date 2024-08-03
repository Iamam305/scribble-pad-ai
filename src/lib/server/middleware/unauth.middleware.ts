import { User } from "@/db/schemas/user.model";
import { randomUUID } from "crypto";
import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import jwt from "jsonwebtoken";
export const unauth_middleware = createMiddleware(async (c, next) => {
  const unauth_uuid = getCookie(c, "unauth_uuid");
  if (!unauth_uuid) {
    const new_unauth_uuid = randomUUID();
    setCookie(c, "unauth_uuid", new_unauth_uuid, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,
    });
    c.set("unauth_uuid", new_unauth_uuid);
    await next();
  } else {
    c.set("unauth_uuid", unauth_uuid);
    await next();
  }
});
