"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { AnimatedHeading } from "./AnimatedHeading";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

function InstagramGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function UpworkGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.0425 7.6424C15.4625 7.6424 14.1812 8.2706 13.1925 9.5265L15.1138 10.9831C15.7825 10.0881 16.7838 9.6349 17.9675 9.6349C19.0413 9.6349 19.6475 10.1262 19.6475 10.8681C19.6475 11.4506 19.1562 11.8169 17.9938 12.3619C16.5825 13.0112 15.1712 13.785 15.1712 15.7594C15.1712 17.4919 16.4275 18.6281 18.2312 18.6281C19.9638 18.6281 21.22 17.7094 21.8756 16.3219L19.9544 15.1631C19.515 16.0581 18.7662 16.5494 17.9675 16.5494C17.0425 16.5494 16.5238 16.0069 16.5238 15.3331C16.5238 14.7506 16.9912 14.3606 18.2575 13.7781C19.6475 13.14 21.0038 12.3619 21.0038 10.7156C21.0038 9.15875 19.6738 7.6424 17.0425 7.6424ZM8.14875 7.7125C6.27875 7.7125 4.77375 9.20375 4.77375 11.0875V18.275H7.40375V11.465C7.40375 10.4875 8.1975 9.7325 9.1875 9.7325C10.1525 9.7325 10.92 10.4875 10.92 11.465V18.275H13.55V11.0875C13.55 9.20375 12.0525 7.7125 10.17 7.7125H8.14875Z" />
    </svg>
  );
}

function WhatsAppGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type Status = "idle" | "loading" | "success" | "error";

const projectTypes = [
  "Background / Concept Art",
  "Character Design",
  "Storyboard",
  "Comic / Illustration",
  "Other",
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: b920f58e-358a-43ea-8c0f-4b7cd32408e7,
          subject: `New enquiry — ${data.projectType} (${data.name})`,
          from_name: "Portfolio Contact",
        }),
      });
      const json = await res.json();
      if (!json.success) {
        throw new Error(json?.message || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send.");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 sm:py-32">
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[50vh] w-[80vw] -translate-x-1/2 rounded-full bg-a1/10 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
                03 — Contact
              </p>
            </Reveal>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em]">
              <AnimatedHeading text="Let's build" />
              <span className="block spectrum-text">
                <AnimatedHeading text="a world." stagger={0.1} />
              </span>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-md text-base leading-relaxed text-muted">
              Have an animation, film, comic or commercial that needs a world?
              I&apos;m open to freelance commissions and studio collaborations.
              </p>
            </Reveal>

            <div className="mt-10 flex flex-col gap-3">
              {[
                {
                  icon: Mail,
                  label: site.email,
                  href: `mailto:${site.email}`,
                },
                {
                  icon: WhatsAppGlyph,
                  label: site.phone,
                  href: `https://wa.me/201014422530`,
                },
              ].map((c, i) => (
                <Reveal key={c.label} delay={0.15 + i * 0.06}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-fg/30"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-lg bg-bg">
                      <c.icon size={18} />
                    </span>
                    <span className="text-sm sm:text-base">{c.label}</span>
                    <ArrowRight
                      size={16}
                      className="ml-auto -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </a>
                </Reveal>
              ))}
              <Reveal delay={0.27}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: LinkedInGlyph, label: "LinkedIn", href: site.linkedin },
                    { icon: UpworkGlyph, label: "Upwork", href: site.upwork },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-fg/30"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bg">
                        <c.icon size={16} />
                      </span>
                      <span className="text-sm">{c.label}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.33}>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: InstagramGlyph, label: "Instagram", href: site.instagram },
                    { icon: FacebookGlyph, label: "Facebook", href: site.facebook },
                  ].map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-line bg-surface/50 p-4 transition-colors hover:border-fg/30"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bg">
                        <c.icon size={16} />
                      </span>
                      <span className="text-sm">{c.label}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface/40 p-6 backdrop-blur sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, delay: 0.1 }}
                      className="grid h-16 w-16 place-items-center rounded-full spectrum-bg text-bg"
                    >
                      <Check size={28} />
                    </motion.span>
                    <h3 className="mt-6 font-display text-2xl font-semibold">
                      Message sent.
                    </h3>
                    <p className="mt-2 max-w-xs text-sm text-muted">
                      Thanks for reaching out — I&apos;ll get back to you soon.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 rounded-full border border-line px-5 py-2.5 text-sm transition-colors hover:bg-bg"
                    >
                      Send another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col gap-5"
                  >
                    <Field label="Your name" name="name" placeholder="Jane Doe" required />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="jane@studio.com"
                      required
                    />
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        Project type
                      </label>
                      <select
                        name="projectType"
                        defaultValue=""
                        className="rounded-lg border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-a3"
                      >
                        <option value="" disabled>
                          Select one…
                        </option>
                        {projectTypes.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project, timeline and scope…"
                        className="resize-none rounded-lg border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-a3"
                      />
                    </div>

                    {status === "error" && (
                      <p className="rounded-lg border border-a1/40 bg-a1/10 px-4 py-2.5 text-sm text-a1">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-fg py-3.5 text-sm font-medium text-bg transition-transform hover:scale-[1.01] disabled:opacity-60"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className={cn(
          "rounded-lg border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors",
          "focus:border-a3 placeholder:text-muted/60",
        )}
      />
    </div>
  );
}
