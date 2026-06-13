import type { Metadata } from "next";
import { ExploreWorld } from "@/components/explore/ExploreWorld";

export const metadata: Metadata = { title: "I Explore" };

export default function ExplorePage() {
  return (
    <main>
      <ExploreWorld />
    </main>
  );
}
