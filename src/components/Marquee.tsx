"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex shrink-0 items-center gap-10 pr-10",
          reverse ? "animate-marquee-rev" : "animate-marquee",
        )}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-2xl font-medium text-fg/80 sm:text-3xl">
              {item}
            </span>
            <span className="text-a3" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
