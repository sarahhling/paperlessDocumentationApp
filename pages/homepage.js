import { useAuth } from "../lib/auth";

export default function Homepage() {
  const { user, view, signOut } = useAuth();

  // ...

  return (
    <Layout>
      {user && (
        <>
          <h2>Hello {user.first_name}</h2>
          <button type="button" className="button-inverse" onClick={signOut}>
            Sign Out
          </button>
        </>
      )}
      {!user && <Auth view={view} supabaseClient={supabase} />}
    </Layout>
  );
}
