import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ large }: { large?: boolean }) => {
  return (
    <Link href="/">
      <Image
        src={"/full.png"}
        alt="logo"
        className={cn(large ? "w-64 md:w-80" : "w-20 md:w-36")}
        width={200}
        height={200}
      />
    </Link>
  );
};
export default Logo;
