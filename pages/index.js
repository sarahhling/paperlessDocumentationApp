import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Login } from "../components/login.js";

export function Title() {
  const titleStyle = { color: "rgb(95, 188, 255)" };
  return (
    <h1 className="text-center pt-5" style={titleStyle}>
      Login Page
    </h1>
  );
}

export default function Home() {
  return (
    <div>
      <Title />
      <Login />
    </div>
  );
}
