import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register")

  if (!isLoggedIn && !isAuthRoute && !req.nextUrl.pathname.startsWith("/api/auth")) {
    return Response.redirect(new URL("/login", req.nextUrl))
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL("/dashboard", req.nextUrl))
  }
})

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
