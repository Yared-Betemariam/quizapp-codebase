"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";

export const navLinks = [
  {
    name: "Features",
    path: "#features",
  },
];

const Header = () => {
  return (
    <header className="absolute z-50 top-0 inset-x-0">
      <section className="wrapper h-[5rem] gap-6 flex justify-between items-center">
        <Logo />
        <nav className="hidden ml-auto lg:flex items-center gap-10 pt-1">
          {navLinks.map((item) => (
            <Link key={item.name} href={item.path} className={"opacity-80"}>
              {item.name}
            </Link>
          ))}
        </nav>
        <Button
          variant={"outline"}
          size={"sm"}
          className="border-primary/50 text-primary brightness-50 bg-transparent hover:bg-gray-100/10"
        >
          Download
        </Button>
        <MobileNav />
      </section>
    </header>
  );
};
export default Header;