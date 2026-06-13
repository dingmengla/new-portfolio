import type { Metadata } from "next";

export const metadata: Metadata = { title: "I Set Sail" };

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
