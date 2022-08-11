import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "../../../utils/supabaseClient.js";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        pin: { label: "PIN", type: "password" },
      },
      authorize: async (credentials) => {
        return authenticateLogin(credentials.username, credentials.pin);
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
  session: {
    maxAge: 7 * 24 * 60 * 60, //idle session expires in 7 days
  },
});

async function authenticateLogin(enteredUsername, enteredPin) {
  //write queries instead of supabase stuff
  const { data, error } = await supabase.from("Users").select().match({
    username: enteredUsername,
    pin: enteredPin,
  });
  if (error || data.length == 0) {
    throw new Error("Incorrect username and/or PIN!");
  }
  const user = {
    id: data[0].id,
    firstName: data[0].first_name,
    lastName: data[0].last_name,
    username: data[0].username,
    role: data[0].role,
  };
  return user;
}
