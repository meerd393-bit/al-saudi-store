import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ال سعودي | Al Saudi Store",
  description: "متجر ال سعودي - الوجهة الأولى لأحدث الجوالات والإكسسوارات الفاخرة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}
