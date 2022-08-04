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
        const { data, error } = await supabase.from("Users").select().match({
          username: credentials.username,
          pin: credentials.pin,
        });
        if (error || data.length == 0) {
          return null;
        } else {
          return {
            id: data[0].id,
            firstName: data[0].first_name,
            lastName: data[0].last_name,
            username: data[0].username,
            pin: data[0].pin,
          };
        }
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
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.user = token.user;
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});

async function authenticateLogin(enteredUsername, enteredPin) {
  const { data, error } = await supabase.from("Users").select().match({
    username: enteredUsername,
    pin: enteredPin,
  });
  if (error || data.length == 0) {
    return null;
  }
  const user = {
    id: data[0].id,
    firstName: data[0].first_name,
    lastName: data[0].last_name,
    username: data[0].username,
    pin: data[0].pin,
  };
  return user;
}
