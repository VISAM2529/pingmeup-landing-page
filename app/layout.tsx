import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "PingMeUp - Never Miss a Birthday or Passport Expiry Again",
  description: "Automate customer reminders via WhatsApp. PingMeUp helps travel agencies send timely reminders for birthdays, passport expiries, and visa renewals.",
  keywords: ["reminder app", "whatsapp automation", "travel agency", "passport expiry", "birthday reminders"],
  openGraph: {
    title: "PingMeUp - Smart Customer Reminder Platform",
    description: "Automate customer reminders via WhatsApp. Never miss important dates.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakarta.variable} font-sans antialiased bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
