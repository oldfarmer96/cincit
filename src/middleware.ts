import { defineMiddleware } from "astro:middleware";
import { JWT_SECRET, REGISTER_COOKIE_NAME } from "astro:env/server";
import * as jose from "jose";

const jwtSecret = new TextEncoder().encode(JWT_SECRET);

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith("/complete-register")) {
    const token = context.cookies.get(REGISTER_COOKIE_NAME)?.value;

    if (!token) {
      return context.redirect("/register");
    }

    try {
      const { payload } = await jose.jwtVerify(token, jwtSecret);

      if (typeof payload.email !== "string") {
        throw new Error("El token no contiene un email válido.");
      }

      context.locals.email = payload.email;
    } catch (error) {
      console.error("Error de token:", error);
      context.cookies.delete(REGISTER_COOKIE_NAME, { path: "/" });
      return context.redirect("/register");
    }
  }

  return next();
});
