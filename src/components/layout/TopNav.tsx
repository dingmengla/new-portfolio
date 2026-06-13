"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { usePageNavigation } from "@/hooks/usePageNavigation";
import { cn } from "@/lib/utils";

const chapters = [
  { href: "/experience", label: "I Set Sail" },
  { href: "/observe", label: "I Observe" },
  { href: "/explore", label: "I Explore" },
] as const;

export function TopNav() {
  const pathname = usePathname();
  const { navigateTo } = usePageNavigation();

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="fixed inset-x-0 top-0 z-[100] border-b border-neutral-800/80 bg-black/70 backdrop-blur-md"
    >
      <nav
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-6"
        aria-label="Site chapters"
      >
        <button
          type="button"
          onClick={() => navigateTo("/cover")}
          className="font-mono text-xs tracking-widest text-neutral-500 uppercase transition-colors hover:text-neutral-200"
        >
          Portfolio
        </button>

        <ul className="flex items-center gap-1 md:gap-2">
          {chapters.map(({ href, label }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <li key={href}>
                <motion.button
                  type="button"
                  onClick={() => navigateTo(href)}
                  whileHover={{
                    opacity: 1,
                    transition: { type: "spring", stiffness: 400, damping: 20 },
                  }}
                  className={cn(
                    "rounded-full px-3 py-1.5 font-mono text-xs tracking-wide transition-colors md:px-4",
                    isActive
                      ? "bg-neutral-800 text-neutral-100"
                      : "text-neutral-500 hover:text-neutral-200"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
