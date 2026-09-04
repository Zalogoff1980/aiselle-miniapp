import "./globals.css";

export const metadata = {
  title: "Айсель",
  description: "Aiselle — Telegram Mini App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}