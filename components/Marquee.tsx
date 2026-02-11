"use client";

import { motion } from "framer-motion";

const PHRASES = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "MongoDB",
  "Tailwind",
  "Design Systems",
  "APIs",
  "•",
];

const DURATION = 25;

function MarqueeContent() {
  return (
    <>
      {PHRASES.map((phrase, i) => (
        <span
          key={`${phrase}-${i}`}
          className="shrink-0 text-sm font-medium uppercase tracking-widest text-muted-foreground"
        >
          {phrase}
        </span>
      ))}
    </>
  );
}

export function Marquee() {
  return (
    <div
      className="relative overflow-hidden border-y border-border/40 bg-muted/30 py-3"
      aria-hidden
    >
      <motion.div
        className="flex w-max gap-12 px-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: DURATION,
            ease: "linear",
          },
        }}
      >
        <div className="flex shrink-0 gap-12">
          <MarqueeContent />
        </div>
        <div className="flex shrink-0 gap-12">
          <MarqueeContent />
        </div>
      </motion.div>
    </div>
  );
}
