import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  async session({ session }) {
    try {
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sessionUser._id.toString();
      return session;
    } catch (error) {
      console.error("Error fetching user session:", error);
      throw error; // Rethrow the error to indicate a failed session
    }
  },

  async signIn({ profile }) {
    try {
      const userExist = await User.findOne({ email: profile.email });

      if (!userExist) {
        // Create a new user
        await User.create({
          email: profile.email,
          userName: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
      }

      // Return true to indicate successful sign-in
      return true;
    } catch (error) {
      console.error("Error during sign-in:", error);
      return false; // Return false to indicate a failed sign-in
    }
  },
});

export { handler as GET, handler as POST };
