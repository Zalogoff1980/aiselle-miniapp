import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();

  // MVP-заглушка.
  // Здесь подключается выбранный AI API.
  const reply =
    `Я получила: «${message}». ` +
    `AI-модель пока не подключена — этот endpoint готов для интеграции.`;

  return NextResponse.json({ reply });
}