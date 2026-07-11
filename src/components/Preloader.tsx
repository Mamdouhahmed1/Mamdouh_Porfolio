"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      initial={{ y: 0 }}
      animate={done ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-display text-5xl font-bold tracking-tight sm:text-7xl"
      >
        Mamdouh<span className="spectrum-text">.</span>
      </motion.div>
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
        <span>Portfolio 2026</span>
        <span>{count}%</span>
      </div>
    </motion.div>
  );
}
