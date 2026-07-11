"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { AnimatedHeading } from "./AnimatedHeading";
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
} from "@/lib/content";

type Filter = GalleryCategory | "all";

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === "all"
        ? gallery
        : gallery.filter((g) => g.category === filter),
    [filter],
  );

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + items.length) % items.length,
      ),
    [items.length],
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
    <section id="work" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                02 — Selected Work
              </p>
            </Reveal>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              <AnimatedHeading text="The Gallery" />
            </h2>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              A cross-section of Backgrounds, Conecpt Arts, Character Design and Personal Projects. Filter by discipline, click any piece to view it full-screen.
            </p>
          </Reveal>
        </div>

        {/* Filters */}
        <div className="mt-12 flex flex-wrap gap-2">
          {galleryCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id as Filter)}
              className={cn(
                "relative rounded-full border px-4 py-2 text-sm transition-colors",
                filter === c.id
                  ? "border-transparent text-bg"
                  : "border-line text-muted hover:text-fg",
              )}
            >
              {filter === c.id && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => {
              const featured = i % 7 === 0;
              return (
                <motion.button
                  key={item.id}
                  layout
                  data-cursor="view"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "group relative block overflow-hidden rounded-xl border border-line bg-surface",
                    featured && "col-span-2 row-span-2",
                  )}
                  style={{ aspectRatio: featured ? "16 / 9" : "16 / 11" }}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    loading="lazy"
                    quality={90}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-a3">
                        {item.category.replace("-", " ")}
                      </div>
                      <div className="font-display text-sm font-medium">
                        {item.title}
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-fg" />
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && items[active] && (
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
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/50 backdrop-blur sm:left-6"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-bg/50 backdrop-blur sm:right-6"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>

            <motion.figure
              key={items[active].id}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl border border-line"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
              />
              <figcaption className="absolute bottom-0 left-0 flex w-full items-center justify-between bg-gradient-to-t from-bg/90 to-transparent p-5">
                <span className="font-display text-lg font-medium">
                  {items[active].title}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  {active + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
