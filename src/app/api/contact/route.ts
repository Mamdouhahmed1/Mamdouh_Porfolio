import { NextResponse } from "next/server";

export const runtime = "edge";

const WEB3FORMS_KEY = "b920f58e-358a-43ea-8c0f-4b7cd32408e7";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, projectType, message } = payload as Record<string, string>;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 422 });
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        name,
        email,
        projectType,
        message,
        subject: `New enquiry — ${projectType} (${name})`,
        from_name: "Portfolio Contact",
      }),
    });

    const json = await res.json();

    if (!json.success) {
      throw new Error(json?.message || "Web3Forms submission failed.");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] submission failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Could not send your message. Please try again." },
      { status: 500 },
    );
  }
}
