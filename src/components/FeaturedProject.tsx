"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { AnimatedHeading } from "./AnimatedHeading";
import { featuredProject, type ProjectChapter } from "@/lib/content";

function Chapter({ chapter, index, onImageClick }: { chapter: ProjectChapter; index: number; onImageClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const grayscale = useTransform(scrollYProgress, [0.05, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const filter = useTransform(grayscale, (g) => `grayscale(${g}) saturate(${1 + (1 - g) * 0.25})`);

  const reversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      {/* Image */}
      <div className={`lg:col-span-8 ${reversed ? "lg:order-2" : ""}`}>
        <div
          data-cursor="view"
          className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface cursor-pointer"
          onClick={onImageClick}
        >
          <motion.img
            src={chapter.image}
            alt={chapter.title}
            style={{ scale, y, filter }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent opacity-60" />
          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-bg/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
            {chapter.kicker}
          </span>
        </div>
      </div>

      {/* Text */}
      <div className={`lg:col-span-4 ${reversed ? "lg:order-1" : ""}`}>
        <Reveal>
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-a3">
            Chapter 0{index + 1}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h3 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight">
            {chapter.title}
          </h3>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {chapter.body}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export function FeaturedProject() {
  const [active, setActive] = useState<number | null>(null);
  const chapters = featuredProject.chapters;

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % chapters.length)),
    [chapters.length],
  );
  const prev = useCallback(
    () => setActive((i) => (i === null ? i : (i - 1 + chapters.length) % chapters.length)),
    [chapters.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);
  return (
    <section
      id="project"
      className="relative overflow-hidden border-t border-line py-24 sm:py-32"
    >
      {/* ambient color wash */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-a4/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              {featuredProject.kicker}
            </p>
          </Reveal>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            <AnimatedHeading text="The Color" />
            <span className="block spectrum-text">
              <AnimatedHeading text="of Zahian" stagger={0.1} />
            </span>
          </h2>

          <div className="mt-6 flex flex-wrap gap-2">
            {featuredProject.meta.map((m, i) => (
              <Reveal key={m} delay={0.1 + i * 0.05}>
                <span className="rounded-full border border-line px-3.5 py-1.5 text-xs text-muted">
                  {m}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-balance font-display text-xl font-medium leading-snug text-fg/90 sm:text-2xl">
              {featuredProject.synopsis}
            </p>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col gap-28">
          {featuredProject.chapters.map((chapter, i) => (
            <Chapter key={chapter.id} chapter={chapter} index={i} onImageClick={() => setActive(i)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && chapters[active] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
            data-lenis-prevent
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-line bg-bg/50 backdrop-blur"
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/50 backdrop-blur sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/50 backdrop-blur sm:right-6"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>

            <motion.figure
              key={chapters[active].id}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl border border-line"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={chapters[active].image}
                alt={chapters[active].title}
                className="h-full w-full object-contain"
              />
              <figcaption className="absolute bottom-0 left-0 flex w-full items-center justify-between bg-gradient-to-t from-bg/90 to-transparent p-5">
                <span className="font-display text-lg font-medium">
                  {chapters[active].title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {active + 1} / {chapters.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
