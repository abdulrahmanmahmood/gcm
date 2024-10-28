// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "./app/_utils/auth/validate";

const publicPaths = ["/login", "/resetpassword"];

// Middleware function
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("middleware");

  if (publicPaths.includes(pathname) || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token: any = request.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Validate the token using the external validate function
    const isValid = await validateToken(token);

    if (isValid) {
      console.log("Token is valid.");
      return NextResponse.next(); // Proceed with the request
    } else {
      console.log("Invalid token.");
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    console.log("Token validation error: ", error);
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

// Matcher configuration
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|login|resetpassword).*)",
  ],
};
