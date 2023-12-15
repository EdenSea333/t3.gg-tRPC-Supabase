import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req, res });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if user is on the signin page
  if (
    req.nextUrl.pathname === "/signin" ||
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname === "/signup"
  ) {
    return res;
  }
  // Check auth condition
  if (session) {
    // Authentication successful, forward request to protected route.
    
    const rolepath = "/"+session.user.role;
    console.log('middleware123123123123', rolepath);
    if(rolepath != req.nextUrl.pathname){
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = rolepath;
      return NextResponse.redirect(redirectUrl);
    }
    else{
      return res;
    }
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/signin";
  redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/admin/:path*",
    "/agent/:path*",
    "/user/:path*"
  ],
};
