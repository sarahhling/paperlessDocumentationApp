import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.admin;
      }
      return !!token;
    },
  },
});

//all paths requiring login, will redirect to login page
export const config = { matcher: ["/admin", "/form", "/retrieve", "/secret"] };
