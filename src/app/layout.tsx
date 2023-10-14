import { notoColorEmoji, ubuntu } from "@/config/fonts";
import { cn } from "@/utils/cn";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={cn(ubuntu.className, notoColorEmoji.variable)}
    >
      <body className="bg-gray-1 text-gray-12">{children}</body>
    </html>
  );
}
