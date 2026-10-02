import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Pyrolysis technology, resource recovery by-products, and the Novaterra process model.",
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
