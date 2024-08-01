import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  //   const auth_path = ;
  const token = req.cookies.get("token")?.value;

  if (!token && path === "/app") {
    return NextResponse.redirect(new URL("/login", req.nextUrl).toString());
  }
  if (token && path === ("/login" || "/register" || "/verify")) {
    return NextResponse.redirect(new URL("/app", req.nextUrl).toString());
  }
};
