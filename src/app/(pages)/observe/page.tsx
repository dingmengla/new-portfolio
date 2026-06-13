import type { Metadata } from "next";
import { FloatingWall } from "@/components/observe/FloatingWall";

export const metadata: Metadata = { title: "I Observe" };

export default function ObservePage() {
  return (
    <main>
      <FloatingWall />
    </main>
  );
}
