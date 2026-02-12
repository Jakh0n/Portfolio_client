"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants/index";
import { ModeToggle } from "./toggle-mode";
import Logo from "./logo";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="relative font-semibold tracking-tight text-foreground transition-opacity hover:opacity-90 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-[width] after:duration-200 hover:after:w-full"
        >
          <Logo />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
