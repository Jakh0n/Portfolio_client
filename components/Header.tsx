"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants/index";
import { ModeToggle } from "./toggle-mode";
import Logo from "./logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-transparent backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="relative shrink-0 font-semibold tracking-tight text-foreground transition-opacity"
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 md:flex md:gap-2"
          aria-label="Main"
        >
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

        <div className="flex items-center gap-1 sm:gap-2">
          <ModeToggle />

          {/* Mobile: compact Sheet */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground md:hidden"
                aria-expanded={mobileOpen}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              compact
              className="flex flex-col overflow-hidden border-border/30 bg-secondary backdrop-blur-md px-0"
              showCloseButton={true}
            >
              <SheetHeader className="border-b border-border/40 px-4 pb-3 pt-2 text-left">
                <SheetTitle className="text-lg font-semibold tracking-tight">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <nav
                className="flex flex-col gap-0.5 overflow-y-auto px-3 py-4"
                aria-label="Main"
              >
                {NAV_LINKS.map(({ href, label }) => {
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block rounded-lg border border-transparent px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "border-teal-500/40 bg-teal-500/10 text-teal-600 dark:text-teal-400 shadow-[0_0_14px_rgba(20,184,166,0.25)]"
                          : "text-foreground hover:border-teal-500/30 hover:bg-teal-500/5 hover:shadow-[0_0_14px_rgba(20,184,166,0.2)]",
                      )}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
