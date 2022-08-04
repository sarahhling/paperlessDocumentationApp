import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "../utils/supabaseClient.js";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        pin: { label: "PIN", type: "text" },
      },
      authorize: (credentials) => {
        return authenticateLogin(credentials.username, credentials.pin);
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ token, session }) => {
      if (token) {
        session.id = token.id;
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


function authenticateLogin({enteredUsername, enteredPin}) {
    const { data, error } = await supabase
        .from("Users")
        .select()
        .match({
            username: enteredUsername,
            pin: enteredPin,
        });
        if (error || data.length == 0){
            return null;
        } else {
            return {
                id :data.id,
                firstName: data.first_name,
                lastName : data.last_name,
                username : data.username,
                pin : data.pin
            }
        }
}