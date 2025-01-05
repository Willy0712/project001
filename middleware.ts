import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account/:path*"], // Protects /account and all subroutes like /account/settings, /account/profile
};
