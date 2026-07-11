"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function Cursor() {
  const [variant, setVariant] = useState<"default" | "hover" | "view">(
    "default",
  );
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      if (el.closest("[data-cursor='view']")) setVariant("view");
      else if (el.closest("a, button, [data-cursor='hover']"))
        setVariant("hover");
      else setVariant("default");
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const size = variant === "view" ? 92 : variant === "hover" ? 56 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden mix-blend-difference [@media(pointer:fine)]:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{ width: size, height: size }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="flex items-center justify-center rounded-full bg-fg"
      >
        {variant === "view" && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bg">
            View
          </span>
        )}
      </motion.div>
    </motion.div>
  );
}
