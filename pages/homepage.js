import { useRouter } from "next/router";

export default function Homepage(props) {
  const router = useRouter();
  const myData = router.query.loginData;
  const welcomeTitle = { textAlign: "center" };
  return (
    <div>
      <h1 style={welcomeTitle}>Welcome {myData}</h1>
    </div>
  );
}
