import Image from "next/image";
import Link from "next/link";

export default function Logo({ pic }) {
  return (
    <div className="text-center">
      <Link href="/">
        <Image src={pic} width={100} height={100} />
      </Link>
    </div>
  );
}
