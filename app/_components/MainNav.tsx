"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./clients/DarkMode";

type Props = {
  path: string;
  text: string;
};

const UINavLink: React.FC<Props> = ({ path, text }) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`text-sm font-medium transition-all hover:text-primary ${
        pathname === path ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {text}
    </Link>
  );
};

export default UINavLink;

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center w-full justify-around px-4", className)}
      {...props}
    >
      <div className="flex items-center space-x-4 lg:space-x-6">
        <UINavLink path="/" text="Home" />
        <UINavLink path="/play" text="Play" />
        <UINavLink path="/exemple" text="Explore" />
        <UINavLink path="/create" text="Create" />
        <UINavLink path="/faq" text="Faq" />
      </div>

      <div className="flex items-center space-x-4 lg:space-x-6">
        <ModeToggle />
        <UINavLink path="/account" text="Account" />
      </div>
    </nav>
  );
}
