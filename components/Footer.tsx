import Link from "next/link";

const FOOTER_LINKS = [
  { href: "https://github.com/jakhon37", label: "GitHub" },
  { href: "https://linkedin.com/in/jakhon-yokubov", label: "LinkedIn" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/20 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <p className="order-2 text-sm text-muted-foreground sm:order-1">
          © {year} Jakhon Yokubov. All rights reserved.
        </p>
        <nav
          className="order-1 flex flex-wrap items-center justify-center gap-4 sm:order-2 sm:gap-6"
          aria-label="Social and legal"
        >
          {FOOTER_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:min-h-0 sm:min-w-0 sm:px-0 sm:py-0"
            >
              {label}
            </a>
          ))}
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:min-h-0 sm:min-w-0 sm:px-0 sm:py-0"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
