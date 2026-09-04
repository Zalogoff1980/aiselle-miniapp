import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Сообщение пустое" },
        { status: 400 }
      );
    }

    // Пока это тестовая заглушка.
    // Позже здесь подключим настоящий AI.
    const reply =
      `Я получила: «${message}». ` +
      `Мой AI пока не подключён, но канал связи уже работает.`;

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
