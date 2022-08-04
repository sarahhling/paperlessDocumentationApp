import { useRouter } from "next/router";

export default function Homepage(props) {
  const { data: session } = useSession();
  console.log("session", session);

  const router = useRouter();
  const myData = router.query.loginData;
  const welcomeTitle = { textAlign: "center" };
  return (
    <div>
      <h1 style={welcomeTitle}>Welcome {myData}</h1>
      {session ? (
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => signOut()}
        >
          Log Out
        </button>
      ) : (
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => {
            router.push("api/auth/signin");
          }}
        >
          Log In
        </button>
      )}
    </div>
  );
}
