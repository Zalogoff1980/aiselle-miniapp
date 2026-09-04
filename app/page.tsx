"use client";

import { useEffect, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

declare global {
  interface Window {
    Telegram?: any;
  }
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Привет. Я Айсель. Чем займёмся?",
    },
  ]);

  const [text, setText] = useState("");
  const [userName, setUserName] = useState("Гость");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand();

      setUserName(
        tg.initDataUnsafe?.user?.first_name ||
          tg.initDataUnsafe?.user?.username ||
          "Гость"
      );
    }
  }, []);

  async function sendMessage() {
    const value = text.trim();

    if (!value || loading) return;

    setMessages((current) => [
      ...current,
      {
        role: "user",
        text: value,
      },
    ]);

    setText("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
        }),
      });

      const data = await response.json();

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: data.reply || "Сейчас я не могу ответить.",
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: "Не удалось связаться с сервером.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="shell">
      <header className="top">
        <div className="avatar">А</div>

        <div>
          <div className="name">Айсель</div>
          <div className="status">
            онлайн · для {userName}
          </div>
        </div>

        <div className="stars">★ 0</div>
      </header>

      <section className="chat">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`row ${message.role}`}
          >
            <div className="bubble">
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="row assistant">
            <div className="bubble">
              Айсель печатает…
            </div>
          </div>
        )}
      </section>

      <nav className="actions">
        <button type="button">
          🎨 Изображение
        </button>

        <button type="button">
          🎵 Музыка
        </button>

        <button type="button">
          ⭐ Premium
        </button>
      </nav>

      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          sendMessage();
        }}
      >
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Напиши Айсель…"
        />

        <button type="submit">
          ➤
        </button>
      </form>
    </main>
  );
}
