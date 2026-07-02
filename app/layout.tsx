import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Cross } from "lucide-react";
import { BridgeProvider } from "@/components/bridge-provider";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SupportButton } from "@/components/support-button";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const appName = "Одигитрия";
const appNameFull = "Одигитрия. Путешествия по святым местам России";

export const metadata: Metadata = {
  title: appName,
  description: appNameFull,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("font-sans", geist.variable)}>
      <body className="antialiased min-h-screen bg-background flex flex-col">
        <BridgeProvider />
        <LanguageProvider>
          <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-14 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold tracking-tight"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Cross className="h-4 w-4" />
                </div>
                {appNameFull}
              </Link>
              <LanguageSwitcher />
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t">
            <div className="container mx-auto px-4 py-6 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} {appNameFull}
            </div>
          </footer>
        </LanguageProvider>
        <Toaster richColors position="top-right" />
        <SupportButton />
      </body>
    </html>
  );
}
