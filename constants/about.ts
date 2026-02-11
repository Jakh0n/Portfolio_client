export const ABOUT = {
  name: "Jakhon Yokubov",
  role: "Full Stack Developer",
  location: "Seoul, South Korea",
  email: "yoqubjonovjahongir10@gmail.com",
  phone: "+82 010 4838 7177",
  summary:
    "Full-Stack Developer skilled in building end-to-end web applications. Proficient in Frontend technologies such as Next.js, React, TypeScript, and Tailwind CSS, and Backend development using Node.js, Express.js, MongoDB, Firebase, and REST APIs.",
  cta: "Have a project? Let's build it together.",
} as const;

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  subtitle: string;
  highlights: readonly string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Algebras.ai",
    role: "Fullstack Developer",
    period: "May 2025 — Present",
    subtitle: "Software Engineer — Algebras.ai",
    highlights: [
      "Joined the team mid-project to work on a Localization Compiler focused on i18n and Next.js internationalization.",
      "Took ownership of the feature and successfully completed it with guidance from the CTO.",
      "Built a compiler-based solution using Next.js and Babel AST to process and transform localized content, enabling scalable and maintainable internationalization.",
      "Improved localization workflow and ensured compatibility with modern Next.js architecture.",
    ],
  },
  {
    company: "Sammi.ac",
    role: "Fullstack Developer",
    period: "Jan 2024 — Dec 2024",
    subtitle: "Full-Stack Developer Intern — Sammi",
    highlights: [
      "Worked as a Full-Stack Developer Intern, building real-world web applications using modern technologies.",
      "Frontend: Developed responsive and user-friendly interfaces using Next.js, React, and TypeScript.",
      "Backend: Built RESTful APIs and backend services using Node.js, Express.js, and MongoDB.",
      "Contributed to multiple projects, including an eCommerce platform — implementing authentication, product management, and API integration.",
      "Collaborated with team members to deliver scalable, clean, and maintainable solutions.",
    ],
  },
];

export interface ProjectItem {
  title: string;
  subtitle: string;
  highlights: readonly string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    title: "Next.js Auto Intl",
    subtitle: "Next-Intl Localization Project",
    highlights: [
      "Developed an internationalization system using Next-Intl to support multi-language routing and content rendering in a Next.js application.",
      "Implemented locale-based navigation, message management, and dynamic translations while ensuring performance and scalability.",
      "Integrated the solution seamlessly with the existing Next.js architecture to deliver a smooth, localized user experience.",
    ],
  },
  {
    title: "Supply Chain Management",
    subtitle: "Turkish Restaurant Franchise — South Korea",
    highlights: [
      "Built a full-stack supply chain management platform for one of Korea's largest Turkish restaurant franchises.",
      "Implemented inventory tracking, supplier management, and order workflows to streamline daily operations across multiple locations.",
      "Delivered a production-ready solution using Next.js, Node.js, and MongoDB with a clean, intuitive interface.",
    ],
  },
  {
    title: "Workers Time Tracking App",
    subtitle: "Turkish Restaurant Franchise — South Korea",
    highlights: [
      "Developed a time-tracking application for restaurant staff to manage shifts, clock in/out, and track working hours.",
      "Built role-based access for managers and employees with real-time attendance monitoring and reporting.",
      "Successfully shipped and deployed — currently in active use across the franchise.",
    ],
  },
];

export interface StackItem {
  label: string;
  items: readonly string[];
}

export const TECH_STACK: StackItem[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    label: "Backend",
    items: ["Node.js", "MongoDB", "Express.js", "PostgreSQL", "Rest APIs"],
  },
  {
    label: "Mobile",
    items: ["React Native", "NativeWind"],
  },
];

export const EDUCATION = {
  school: "Sejong University",
  degree: "Bachelor — Business Administration",
  period: "May 2023 — Mar 2027",
} as const;

export interface LanguageItem {
  language: string;
  level: string;
}

export const LANGUAGES: LanguageItem[] = [
  { language: "English", level: "Advanced" },
  { language: "Russian", level: "Advanced" },
  { language: "Korean", level: "Intermediate" },
  { language: "Turkish", level: "Intermediate" },
];

export interface StatItem {
  value: string;
  label: string;
}

export const STATS: StatItem[] = [
  { value: "3+", label: "Years of experience" },
  { value: "20+", label: "Projects delivered" },
  { value: "10+", label: "Happy clients" },
  { value: "4", label: "Languages spoken" },
];
