import Link from "next/link";
import { FEATURED_ITEMS } from "@/constants/index";
function FeaturedCard({
  title,
  description,
  tags,
  href,
  size,
  index,
}: {
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  size: "default" | "large";
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5 sm:p-8"
    >
      {size === "large" && (
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-chart-1/10 blur-3xl transition-opacity group-hover:opacity-80"
          aria-hidden
        />
      )}
      <span className="absolute right-4 top-4 text-4xl font-bold text-muted/30 transition-colors group-hover:text-primary/20">
        0{index + 1}
      </span>
      <h3 className="relative font-semibold text-foreground transition-colors group-hover:text-primary">
        {title}
      </h3>
      <p className="relative mt-2 text-sm text-muted-foreground">
        {description}
      </p>
      <ul className="relative mt-4 flex flex-wrap gap-2" role="list">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md bg-muted/80 px-2.5 py-1 text-xs font-medium text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export function FeaturedWork() {
  return (
    <section className="border-b border-border/40 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured work
            </h2>
            <p className="mt-2 text-muted-foreground">
              Selected projects I&apos;ve shipped recently.
            </p>
          </div>
          <Link
            href="/work"
            className="shrink-0 text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            View all →
          </Link>
        </div>
        <ul
          className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
          role="list"
        >
          <li className="sm:col-span-2 lg:row-span-2">
            <FeaturedCard
              title={FEATURED_ITEMS[0].title}
              description={FEATURED_ITEMS[0].description}
              tags={FEATURED_ITEMS[0].tags}
              href={FEATURED_ITEMS[0].href}
              size="large"
              index={0}
            />
          </li>
          {FEATURED_ITEMS.slice(1).map((item, i) => (
            <li key={item.title}>
              <FeaturedCard
                title={item.title}
                description={item.description}
                tags={item.tags}
                href={item.href}
                size="default"
                index={i + 1}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
