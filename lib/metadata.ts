import type { Metadata } from "next";

const SITE_NAME = "Jakhon Yokubov";
const DEFAULT_TITLE = `${SITE_NAME} | Full Stack & Mobile Developer`;
const DEFAULT_DESCRIPTION =
  "Full stack and mobile developer—web apps, native apps, and APIs with clean code and thoughtful design.";
const DEFAULT_IMAGE = "/J.jpeg";

function safeUrl(raw: string | undefined): URL | null {
  if (!raw) return null;
  try {
    return new URL(raw);
  } catch {
    return null;
  }
}

export function getSiteUrl(): URL {
  // Prefer a public URL for proper canonical + OG/Twitter links.
  // Example: https://yourdomain.com
  return (
    safeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    safeUrl(process.env.SITE_URL) ??
    new URL("http://localhost:3000")
  );
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, getSiteUrl()).toString();
}

type PageMetadataOptions = {
  /** Page title (without the site name). */
  title?: string;
  description?: string;
  pathname: string;
  /** Absolute or relative image URL for social cards. */
  image?: string;
  noIndex?: boolean;
};

function normalizeImageUrl(image: string | undefined): string | undefined {
  if (!image) return undefined;
  // Already absolute:
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  // Relative:
  return absoluteUrl(image.startsWith("/") ? image : `/${image}`);
}

export function createPageMetadata({
  title,
  description,
  pathname,
  image,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(pathname);
  const resolvedTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  const resolvedImage = normalizeImageUrl(image ?? DEFAULT_IMAGE);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImage ? [{ url: resolvedImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: resolvedImage ? [{ url: resolvedImage }] : undefined,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const baseSiteMetadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/J.jpeg",
    apple: "/J.jpeg",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_IMAGE],
  },
};
