"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

const child: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export function AnimatedHeading({
  text,
  className,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  stagger?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={stagger}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-flex overflow-hidden align-bottom pb-[0.12em]"
        >
          <motion.span
            variants={child}
            className="inline-block will-change-transform"
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
