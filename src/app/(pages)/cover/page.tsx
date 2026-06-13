import type { Metadata } from "next";
import { SandDissolve } from "@/components/cover/SandDissolve";

export const metadata: Metadata = { title: "Cover" };

export default function CoverPage() {
  return (
    <main
      className="w-screen h-screen overflow-hidden bg-black"
      style={{ cursor: "none" }}
    >
      <SandDissolve />
    </main>
  );
}
