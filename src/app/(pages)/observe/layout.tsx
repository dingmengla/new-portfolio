import type { Metadata } from "next";

export const metadata: Metadata = { title: "I Observe" };

export default function ObserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
