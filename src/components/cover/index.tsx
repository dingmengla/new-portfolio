"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { heroTitle, listItem } from "@/lib/animations";

// 可选的独立 Cover 动画组件，供 cover/page.tsx 引入使用
export function CoverHero({ name = "Your Name" }: { name?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cover-line",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.3,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 px-6 text-center">
      <motion.p
        initial="hidden"
        animate="visible"
        variants={listItem}
        className="mb-6 font-mono text-xs tracking-[0.4em] text-neutral-500 uppercase"
      >
        Hello, I&apos;m
      </motion.p>

      <div className="overflow-hidden">
        <h1 className="cover-line font-display text-7xl font-bold tracking-tight text-neutral-50 md:text-[9rem] leading-none">
          {name}
        </h1>
      </div>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={heroTitle}
        transition={{ delay: 0.9 }}
        className="mt-8 text-lg text-neutral-400"
      >
        Frontend Engineer &nbsp;·&nbsp; Creative Developer &nbsp;·&nbsp; Open
        Source Enthusiast
      </motion.p>
    </div>
  );
}
