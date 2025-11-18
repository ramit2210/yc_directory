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
            try {
                if (!profile?.id || !profile?.login) {
                    console.error("Missing profile data:", { profile });
                    return false;
                }

                const { login, bio } = profile as Profile & {
                    id: string;
                    login: string;
                    bio?: string;
                };

                console.log("Checking for existing user:", login);
                const existing = await getAuthorByGithubId(login);

                if (!existing) {
                    console.log("Creating new user:", login);
                    // Generate a unique email if not provided (GitHub private email)
                    const userEmail =
                        email || `${login}@users.noreply.github.com`;

                    await db
                        .insert(author)
                        .values({
                            name: name || login,
                            username: login,
                            email: userEmail,
                            image: image || null,
                            bio: bio || null,
                        })
                        .returning();
                    console.log("User created successfully");
                }

                return true;
            } catch (error) {
                console.error("Error in signIn callback:", error);
                return false;
            }
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
