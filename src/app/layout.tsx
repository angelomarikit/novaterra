import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const display = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Novaterra Circular Economy Inc.",
    template: "%s · Novaterra",
  },
  description:
    "From waste to progress: building circular-economy infrastructure through advanced pyrolysis and resource-recovery technologies.",
  metadataBase: new URL("https://novaterracircular.com"),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Novaterra Circular Economy Inc.",
    description:
      "From waste to progress: building a sustainable future through pyrolysis and circular-economy infrastructure.",
    type: "website",
    url: "https://novaterracircular.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
