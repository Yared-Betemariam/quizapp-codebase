"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "./Header";
import Logo from "./Logo";
import Separator from "./Separator";
import { Button } from "./ui/button";

const MobileNav = () => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(`#${window.location.href.split("#")[1]}`);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild className="px-0 lg:hidden">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="rounded-lg simpleborder drop-shadow hover:opacity-90 transition-all duration-200 flex flex-col items-center justify-center"
        >
          <Menu size={22} className="drop-shadow" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-transparent shadow-none border-none p-0 m-4">
        <div className="bg-white rounded-lg p-8 px-10 drop-shadow-md flex flex-col gap-6">
          <Logo />
          <Separator />
          <div className="flex flex-col gap-2 items-start">
            {navLinks.map((item) => (
              <SheetClose key={item.name} className="items-start justify-start">
                <a
                  href={item.path}
                  key={item.name}
                  onClick={() => setPathname(item.path)}
                  className={cn(
                    pathname === item.path
                      ? "font-semibold text-primary"
                      : "opacity-70"
                  )}
                >
                  {item.name}
                </a>
              </SheetClose>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNav;
