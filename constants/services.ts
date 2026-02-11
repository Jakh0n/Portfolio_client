export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "build",
    title: "Build",
    tagline: "Web apps that scale",
    description:
      "From idea to production. Full-stack web applications with modern stack, clean architecture, and deployment that just works.",
  },
  {
    id: "ship",
    title: "Ship",
    tagline: "Mobile, one codebase",
    description:
      "Cross-platform apps with React Native or Flutter. Design, build, and get to App Store and Play Store—without maintaining two codebases.",
  },
  {
    id: "connect",
    title: "Connect",
    tagline: "APIs, bots, integrations",
    description:
      "Backends, REST or GraphQL APIs, Telegram bots, and integrations. Your product connected to the tools and platforms you use.",
  },
  {
    id: "rescue",
    title: "Rescue",
    tagline: "Refactor & modernize",
    description:
      "Existing codebase holding you back? I take over, untangle, and modernize so you can ship again—without starting from zero.",
  },
  {
    id: "advise",
    title: "Advise",
    tagline: "Architecture & direction",
    description:
      "Technical sparring: architecture reviews, stack decisions, and hands-on guidance. Short-term or ongoing—your call.",
  },
];
