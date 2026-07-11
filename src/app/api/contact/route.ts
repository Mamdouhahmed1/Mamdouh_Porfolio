import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email."),
  projectType: z.string().trim().min(1).max(80),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a little more about your project.")
    .max(5000),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Invalid input.", fields: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    receivedAt: new Date().toISOString(),
    ...parsed.data,
  };

  try {
    await persist(entry);
  } catch (err) {
    console.error("[contact] persistence failed", err);
    return NextResponse.json(
      { error: "Could not deliver your message right now. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, id: entry.id });
}

async function persist(entry: Record<string, unknown>) {
  const { promises: fs } = await import("node:fs");
  const path = await import("node:path");
  const dir = path.join(process.cwd(), "data");
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, "messages.json");

  let items: unknown[] = [];
  try {
    const raw = await fs.readFile(file, "utf8");
    items = JSON.parse(raw);
    if (!Array.isArray(items)) items = [];
  } catch {
    // file doesn't exist yet — start fresh
  }

  items.push(entry);
  // keep the store from growing without bound
  if (items.length > 1000) items = items.slice(-1000);

  await fs.writeFile(file, JSON.stringify(items, null, 2), "utf8");

  // Optional email forwarding — enable by providing SMTP_* env vars.
  await maybeSendEmail(entry).catch((e) =>
    console.warn("[contact] email forwarding skipped", e),
  );
}

async function maybeSendEmail(entry: Record<string, unknown>) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_EMAIL;
  if (!host || !user || !pass || !to) return; // not configured — skip silently

  // Lazy import so the dependency is only needed when configured.
  const { default: nodemailer } = await import("nodemailer");
  const transport = nodemailer.createTransport({ host, port: 465, secure: true, auth: { user, pass } });
  await transport.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to,
    replyTo: String(entry.email),
    subject: `New enquiry — ${entry.projectType} (${entry.name})`,
    text: [
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Project type: ${entry.projectType}`,
      "",
      "Message:",
      String(entry.message),
    ].join("\n"),
  });
}
