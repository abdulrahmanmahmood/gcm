import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const publicPaths = ["/login", "/resetpassword"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const pathnam = request.nextUrl.pathname;

  if (publicPaths.includes(pathnam) || pathnam.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get("token")?.value;
  if (token) {
    console.log("token in middleware", token);
  }

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Validate the token with your backend
    const response = await fetch(
      "http://localhost:8090/api/v1/authentication/validate-jwt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );
    console.log("response in middleware is ", response);
    // Token is valid - allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.log("error", error);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public paths defined above
     */
    "/((?!_next/static|_next/image|favicon.ico|public|login|resetpassword).*)",
  ],
};
