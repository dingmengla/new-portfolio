import type { Metadata } from "next";
import { PortfolioContent } from "@/components/portfolio/PortfolioContent";
import { QuoteScroller } from "@/components/portfolio/QuoteScroller";
import { projects, quotes } from "@/lib/data";

export const metadata: Metadata = { title: "Portfolio" };

export default function PortfolioPage() {
  return (
    <main className="min-h-screen">
      <PortfolioContent projects={projects} />
      <QuoteScroller quotes={quotes} />
    </main>
  );
}
