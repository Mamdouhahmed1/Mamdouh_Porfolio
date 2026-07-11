"use client";

import { ArrowUp } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";
import { site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
              Available for work
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-3 block font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {site.email}
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <a href="#work" className="text-muted transition-colors hover:text-fg">
              Work
            </a>
            <a href="#project" className="text-muted transition-colors hover:text-fg">
              Project
            </a>
            <a href="#about" className="text-muted transition-colors hover:text-fg">
              About
            </a>
            <a href="#contact" className="text-muted transition-colors hover:text-fg">
              Contact
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-muted transition-colors hover:text-fg"
            >
              Instagram
            </a>
          </nav>
        </div>
      </div>

      <div className="border-y border-line py-5">
        <Marquee
          items={[
            "Background Art",
            "Concept Art",
            "Character Design",
            "Storyboard",
            "Visual Development",
          ]}
        />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <p
          suppressHydrationWarning
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
        >
          © {year} {site.name}. All rights reserved.           Website Designed by{" "}
          <a
            href="https://eliaamir.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-colors hover:text-fg"
          >
            Elia Yacoub
          </a>
          .
        </p>
        <Magnetic strength={0.5}>
          <a
            href="#top"
            className="grid h-11 w-11 place-items-center rounded-full border border-line transition-colors hover:bg-bg"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
