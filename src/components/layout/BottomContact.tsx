"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

const emails = [
  { address: "3461171465@qq.com", label: "3461171465@qq.com" },
  { address: "dingmenglai@gmail.com", label: "dingmenglai@gmail.com" },
] as const;

export function BottomContact() {
  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-neutral-800/80 bg-black/70 backdrop-blur-md"
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <span className="shrink-0 font-mono text-xs tracking-widest text-neutral-500 uppercase">
          Contact
        </span>

        <ul className="flex min-w-0 items-center gap-3 overflow-x-auto scrollbar-hidden md:gap-5">
          {emails.map(({ address, label }) => (
            <li key={address} className="shrink-0">
              <a
                href={`mailto:${address}`}
                className="font-mono text-xs tracking-wide text-neutral-500 transition-colors hover:text-neutral-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.footer>
  );
}
