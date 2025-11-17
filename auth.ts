import NextAuth, { Profile } from "next-auth";
import GitHub from "next-auth/providers/github";
import { getAuthorByGithubId } from "./lib/queries";
import { author } from "./db/schema";
import { db } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [GitHub],
    callbacks: {
        // 1. SIGN-IN: ensure user exists
        async signIn({ user: { name, email, image }, profile }) {
            if (!profile?.id || !profile?.login) return false;

            const { login, bio } = profile as Profile & {
                id: string;
                login: string;
                bio?: string;
            };
            const existing = await getAuthorByGithubId(login);

            if (!existing) {
                await db
                    .insert(author)
                    .values({
                        name: name || login,
                        username: login,
                        email: email || "",
                        image: image || "",
                        bio: bio || "",
                    })
                    .returning();
            }

            return true;
        },

        // 2. JWT: attach our internal _id from DB
        async jwt({ token, account, profile }) {
            // Only fetch user on initial sign-in when account is present
            if (account && profile?.login) {
                const user = await getAuthorByGithubId(profile.login as string);
                if (user) {
                    token.id = user.id;
                }
            }
            return token;
        },

        // 3. SESSION: expose token.id
        async session({ session, token }) {
            Object.assign(session, { id: token.id });
            return session;
        },
    },
});
