export type WorkCategory = "WEBSITE" | "MOBILE APP" | "TELEGRAM BOT";

export const WORK_ACCENT: Record<WorkCategory, string> = {
  WEBSITE: "#7eb8f7",
  "MOBILE APP": "#f7a96a",
  "TELEGRAM BOT": "#7af7b8",
} as const;

export interface WorkProject {
  id: string;
  title: string;
  category: WorkCategory;
  description: string;
  tags: readonly string[];
  href: string;
  image: string;
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "dom-stroy",
    title: "Dom Stroy",
    category: "WEBSITE",
    description:
      "A digital storefront for builders — where every nail, beam, and finish finds its buyer.",
    tags: ["Next.js", "MongoDB", "Tailwind"],
    href: "/work/dom-stroy",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: "uzbekistans-club",
    title: "Uzbekistan's Club",
    category: "WEBSITE",
    description:
      "A stage for stories untold. Where culture meets its audience.",
    tags: ["React", "Node.js", "REST API"],
    href: "/work/uzbekistans-club",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
  },
  {
    id: "anatomica",
    title: "Anatomica",
    category: "WEBSITE",
    description:
      "Healthcare, redesigned for clarity. Where patients find answers before they need a doctor.",
    tags: ["Next.js", "TypeScript"],
    href: "/work/anatomica",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    id: "anatomica-app",
    title: "Anatomica App",
    category: "MOBILE APP",
    description:
      "Your health, in your pocket. Appointments, records, and care — one tap away.",
    tags: ["React Native", "Node.js"],
    href: "/work/anatomica-app",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
  {
    id: "express24",
    title: "Express24",
    category: "MOBILE APP",
    description:
      "Speed is the product. Every order tracked, every minute accounted for.",
    tags: ["Flutter", "Telegram Bot API"],
    href: "/work/express24",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80",
  },
];

export function getProjectById(id: string): WorkProject | undefined {
  return WORK_PROJECTS.find((p) => p.id === id);
}
