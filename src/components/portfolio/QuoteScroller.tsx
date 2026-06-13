"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Quote } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface QuoteScrollerProps {
  quotes: Quote[];
}

// 金句滚动区 — 每条引言随滚动依次淡入上移
export function QuoteScroller({ quotes }: QuoteScrollerProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      section.querySelectorAll<HTMLElement>(".quote-item").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="border-t border-neutral-800 bg-neutral-950 px-6 py-32"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-16 font-mono text-sm tracking-widest text-neutral-600 uppercase">
          Words that inspire
        </p>

        <div className="space-y-20">
          {quotes.map((quote, i) => (
            <blockquote key={i} className="quote-item">
              <p className="font-display text-2xl font-medium leading-relaxed text-neutral-200 md:text-3xl">
                &ldquo;{quote.text}&rdquo;
              </p>
              <footer className="mt-5 font-mono text-sm text-neutral-600">
                — {quote.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
