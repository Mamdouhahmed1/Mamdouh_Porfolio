"use client";

import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { Marquee } from "./Marquee";
import { about } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left label */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                01 — About
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
                Build Worlds First.
                <br />
                <span className="spectrum-text">Add Details Second.</span>
              </h2>
            </Reveal>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6">
              {about.stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.06}>
                  <div>
                    <div className="font-display text-4xl font-bold tracking-tight">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs uppercase tracking-wider text-muted">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-8">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p
                  className={
                    i === 0
                      ? "font-display text-2xl font-medium leading-snug text-fg sm:text-3xl"
                      : "mt-6 text-base leading-relaxed text-muted sm:text-lg"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}

            {/* Software */}
            <Reveal delay={0.1}>
              <div className="mt-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                  Tools
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {about.software.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-surface px-4 py-2 text-sm"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Experience */}
            <Reveal delay={0.15}>
              <div className="mt-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                  Selected Experience
                </p>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {about.experience.map((e, i) => (
                    <li key={e.title}>
                      <motion.div
                        whileHover={{ x: 6 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex items-center justify-between gap-4 py-4"
                      >
                        <div className="flex items-baseline gap-3">
                          <span className="font-mono text-xs text-muted">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-display text-lg font-medium">
                            {e.title}
                          </span>
                        </div>
                        <div className="text-right text-xs text-muted">
                          <div className="uppercase tracking-wider">
                            {e.type}
                          </div>
                          <div className="text-fg/70">{e.role}</div>
                        </div>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Disciplines marquee */}
      <div className="mt-20 border-y border-line py-6">
        <Marquee items={about.disciplines} />
      </div>
      <div className="border-b border-line py-6">
        <Marquee items={[...about.disciplines].reverse()} reverse />
      </div>
    </section>
  );
}
