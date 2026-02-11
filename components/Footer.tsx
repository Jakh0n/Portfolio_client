import Link from "next/link";

const FOOTER_LINKS = [
  { href: "https://github.com/jakhon37", label: "GitHub" },
  { href: "https://linkedin.com/in/jakhon-yokubov", label: "LinkedIn" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/20 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {year} Jakhon Yokubov. All rights reserved.
        </p>
        <nav className="flex items-center gap-6" aria-label="Social and legal">
          {FOOTER_LINKS.map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <Link
            href="/contact"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
