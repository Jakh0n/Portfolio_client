import { NextResponse } from "next/server";

const TELEGRAM_API = "https://api.telegram.org";

export interface ContactBody {
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
}

function escapeTelegram(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function formatMessage(body: ContactBody): string {
  const n = escapeTelegram;
  return [
    "🆕 <b>New contact form submission</b>",
    "",
    `<b>Name:</b> ${n(body.name)}`,
    `<b>Email:</b> ${n(body.email)}`,
    `<b>Service:</b> ${n(body.service)}`,
    `<b>Budget:</b> ${n(body.budget || "—")}`,
    "",
    `<b>Message:</b>`,
    n(body.message),
  ].join("\n");
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Contact API: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing");
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 }
    );
  }

  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { name, email, service, message } = body;
  if (!name?.trim() || !email?.trim() || !service?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Missing required fields: name, email, service, message." },
      { status: 400 }
    );
  }

  const text = formatMessage(body);

  try {
    const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    });

    const data = (await res.json()) as { ok?: boolean; description?: string };
    if (!res.ok || !data.ok) {
      console.error("Telegram API error:", data);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}
