"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props {
  href: string;
}

export default function NavbarLink({
  href,
  children,
}: PropsWithChildren<Props>) {
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        currentPath === href ? "text-foreground" : "text-foreground/60"
      )}
    >
      {children}
    </Link>
  );
}
