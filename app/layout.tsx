import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "LeetCode Clone",
    template: "%s | LeetCode Clone",
  },
  description:
    "A browser-based coding platform to solve programming problems, run code against test cases, and track your progress.",
  keywords: [
    "leetcode",
    "coding",
    "programming",
    "algorithms",
    "data structures",
    "code editor",
    "judge0",
  ],
  authors: [{ name: "Barmanji" }],
  openGraph: {
    title: "LeetCode Clone",
    description:
      "Solve coding problems, run code in-browser, and track your submission history.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LeetCode Clone",
    description:
      "Solve coding problems, run code in-browser, and track your submission history.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-mono",
        jetbrainsMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider telemetry={false}>
            <Toaster />
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
