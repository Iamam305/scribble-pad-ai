import { User } from "@/db/schemas/user.model";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import jwt from "jsonwebtoken";
export const auth_middleware = createMiddleware(async (c, next) => {
  const token = getCookie(c, "token");
  if (!token) {
    return c.json(
      {
        msg: "Access Denied",
      },
      401
    );
  }

  const decoded = (await jwt.verify(token, process.env.TOKEN_SECRET!)) as any;
  console.log(decoded);

  const user = await User.findOne({
    email: decoded.email,
  });
  c.set("user", user);
  await next();
});
