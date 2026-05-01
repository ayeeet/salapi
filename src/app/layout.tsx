import type { Metadata } from "next";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
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
      <body className="min-h-full bg-slate-50 text-slate-900">
        {session ? (
          <div className="flex flex-col lg:flex-row min-h-screen">
            <AppSidebar user={session.user} />
            <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">
              {children}
            </main>
          </div>
        ) : (
          <div className="min-h-screen">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}

