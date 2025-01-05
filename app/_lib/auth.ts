import NextAuth, { NextAuthConfig} from "next-auth";
import Google from "next-auth/providers/google";
import { createAppUser, getAppUser } from "./services/data-service";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({user}) {
      
     
      try {
        const existingGuest = await getAppUser(user.email as string);
        if (existingGuest === null) {
          await createAppUser({
            email: user.email as string,
            fullName: user.name as string,
            userCreatedAt: new Date().toISOString(),
            userModifiedAt: new Date().toISOString(),
            imageURL: user.image as string,
          })
        }
        return true;
      } catch  {   
        return false;
      }
    },
    async session({ session, user }) {
      const appUser = await getAppUser(session.user.email);
      const appUserId = appUser?.userId as number;
      session.user.id = appUserId.toString();
      return session;
    },
  },
  pages: {
    signIn: "/", // Not needed unless you want a dedicated page
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
