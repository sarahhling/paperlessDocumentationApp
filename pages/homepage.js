import { useRouter } from "next/router";

export default function Homepage(props) {
  const router = useRouter();
  const myData = router.loginData;
  return (
    <div>
      <h1>Welcome</h1>
      {console.log(myData)}
    </div>
  );
}
