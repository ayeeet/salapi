import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Salapi | Simple Personal Finance",
  description: "Track your daily expenses and monitor monthly spending.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-50">
        {session && <AppHeader user={session.user} />}
        <div className="flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}

