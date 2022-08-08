import Image from "next/image";
import Link from "next/link";

export default function Logo({ pic }) {
  return (
    <div className="text-center pt-5">
      <Link href="/">
        <a className="pe-auto">
          <Image src={pic} width={100} height={100} alt="logo" />
        </a>
      </Link>
    </div>
  );
}
