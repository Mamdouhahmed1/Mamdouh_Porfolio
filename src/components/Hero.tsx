"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { AnimatedHeading } from "./AnimatedHeading";
import { hero } from "@/lib/content";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* Monochrome base image */}
      <motion.div style={{ y: yImg, scale: scaleImg }} className="absolute inset-0">
        <Image
          src="/artwork/hero/cover.webp"
          alt="Cover artwork"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

    

      {/* Dark overlay for legibility */}
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/30 to-bg"
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-a3" />
          {hero.eyebrow}
        </motion.span>

        <h1 className="font-display text-[clamp(3.2rem,13vw,12rem)] font-bold leading-[0.9] tracking-[-0.03em]">
          <AnimatedHeading text={hero.titleLines[0]} />
          <span className="block text-white">
            <AnimatedHeading text={hero.titleLines[1]} stagger={0.12} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="mt-7 max-w-xl text-balance text-base text-fg/80 sm:text-lg"
        >
          {hero.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
        >
          {hero.role
  .split("—")[1]
  ?.trim()
  .split("·")
  .map((r, i) => (
    <span key={i} className="flex items-center gap-x-3 text-[#490f0f] font-bold">
      {i > 0 && <span className="text-a3/70">/</span>}
      {r.trim()}
    </span>
  ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#work"
        style={{ opacity: textOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
}
