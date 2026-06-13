"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  setTransitionRouter,
  useTransitionStore,
} from "@/store/transitionStore";
import { chapterTitleStyle, titleWordSpring } from "@/lib/typography";

// 图片停留 3s 后触发溶解与文字入场 (ms)
const DISSOLVE_DELAY = 3000;

const TITLE = "𝓗𝓲, 𝓘 𝓪𝓶 𝓓𝓲𝓷𝓰𝓶𝓮𝓷𝓰";
const TYPE_LINE_1 = "Master of HKU 、Journalist, Marketer & AIGC Creator";
const TYPE_LINE_2 =
  "A twenty-something girl, finding her little corner around the world.";

const typedLineStyles = [
  {
    className: "mt-4 text-xl font-bold text-white md:text-2xl",
    textShadow: "0 1px 6px rgba(0,0,0,0.8)",
  },
  {
    className:
      "mt-6 text-base italic leading-relaxed text-neutral-300 md:text-lg",
    textShadow: "0 1px 4px rgba(0,0,0,0.7)",
  },
];

function useTypewriter(start: boolean) {
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [showCursor, setShowCursor] = useState(false);

  const type = useCallback(
    (
      text: string,
      setter: (s: string) => void,
      speed: number,
      onDone: () => void
    ) => {
      const chars = Array.from(text);
      let i = 0;
      const tick = setInterval(() => {
        i++;
        setter(chars.slice(0, i).join(""));
        if (i >= chars.length) {
          clearInterval(tick);
          onDone();
        }
      }, speed);
      return () => clearInterval(tick);
    },
    []
  );

  useEffect(() => {
    if (!start) return;

    let cleanup: (() => void) | undefined;

    const startTimer = setTimeout(() => {
      setShowCursor(true);
      cleanup = type(TYPE_LINE_1, setTypedLine1, 55, () => {
        setTimeout(() => {
          cleanup = type(TYPE_LINE_2, setTypedLine2, 45, () => {
            setTimeout(() => setShowCursor(false), 800);
          });
        }, 500);
      });
    }, 600);

    return () => {
      clearTimeout(startTimer);
      cleanup?.();
    };
  }, [start, type]);

  return { typedLine1, typedLine2, showCursor };
}

function CoverCursor({
  glowRef,
  isMobile,
}: {
  glowRef: React.RefObject<HTMLDivElement | null>;
  isMobile: boolean;
}) {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    let mx = 0;
    let my = 0;
    let gx = 0;
    let gy = 0;
    let rafId: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", move);

    const tick = () => {
      gx += (mx - gx) * 0.1;
      gy += (my - gy) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${gx - 20}px, ${gy - 20}px)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(rafId);
    };
  }, [glowRef, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.9)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.4)",
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
          transition:
            "width 0.2s ease, height 0.2s ease, border-color 0.2s ease",
        }}
      />
    </>
  );
}

export function SandDissolve() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const trigger = useTransitionStore((s) => s.triggerTransition);

  const [textVisible, setTextVisible] = useState(false);
  const { typedLine1, typedLine2, showCursor } = useTypewriter(textVisible);
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setTransitionRouter(router);
  }, [router]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let triggerTimer: ReturnType<typeof setTimeout>;
    let textTimer: ReturnType<typeof setTimeout>;

    import("hover-effect").then(({ default: HoverEffect }) => {
      const ratio = window.innerHeight / window.innerWidth;

      const effect = new HoverEffect({
        parent: el,
        intensity: 0.1,
        image1: "/images/vision.jpg",
        image2: "/images/black.jpg",
        displacementImage: "/images/displacement.png",
        imagesRatio: ratio,
        speedIn: 10,
        speedOut: 2.5,
        easing: "power2.inOut",
        hover: false,
      });

      const canvas = el.querySelector("canvas");
      if (canvas) {
        canvas.style.display = "block";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
      }

      triggerTimer = setTimeout(() => effect.next(), DISSOLVE_DELAY);
      textTimer = setTimeout(() => setTextVisible(true), DISSOLVE_DELAY);
    });

    return () => {
      clearTimeout(triggerTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const glowShadow = [
    "0 0 20px rgba(255,255,255,0.95)",
    "0 0 40px rgba(255,255,255,0.6)",
    "0 0 80px rgba(255,255,255,0.3)",
    "0 0 120px rgba(200,220,255,0.2)",
  ].join(", ");

  const isLineGlowing = (i: number) =>
    isMobile ? activeLine === i : hoveredLine === i;

  const enlargeGlow = () => {
    if (glowRef.current) {
      glowRef.current.style.width = "64px";
      glowRef.current.style.height = "64px";
      glowRef.current.style.borderColor = "rgba(255,255,255,0.7)";
    }
  };

  const resetGlow = () => {
    if (glowRef.current) {
      glowRef.current.style.width = "40px";
      glowRef.current.style.height = "40px";
      glowRef.current.style.borderColor = "rgba(255,255,255,0.4)";
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <div
        ref={containerRef}
        style={{ width: "100%", height: "100%" }}
        aria-hidden
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
          pointerEvents: textVisible ? "auto" : "none",
          cursor: "pointer",
        }}
        onClick={() =>
          trigger("/experience", "/images/vision.jpg", "/images/home-bg.jpg")
        }
        onMouseEnter={enlargeGlow}
        onMouseLeave={resetGlow}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={textVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={titleWordSpring}
          onHoverStart={() => !isMobile && setHoveredLine(0)}
          onHoverEnd={() => !isMobile && setHoveredLine(null)}
          onTapStart={() => isMobile && setActiveLine(0)}
          onTap={() => isMobile && setActiveLine(null)}
          whileHover={
            !isMobile
              ? {
                  scale: 1.04,
                  transition: {
                    type: "spring",
                    stiffness: 320,
                    damping: 18,
                  },
                }
              : undefined
          }
          whileTap={{
            scale: 0.97,
            transition: { type: "spring", stiffness: 400, damping: 20 },
          }}
          style={{
            ...chapterTitleStyle,
            color: "#ffffff",
            marginBottom: "16px",
            textAlign: "center",
            userSelect: "none",
            maxWidth: "90vw",
            textShadow: isLineGlowing(0)
              ? glowShadow
              : "0 0 0px rgba(255,255,255,0)",
            transition: "text-shadow 0.35s ease, color 0.3s ease",
          }}
        >
          {TITLE}
        </motion.div>

        {typedLineStyles.map((line, i) => {
          const text = i === 0 ? typedLine1 : typedLine2;
          const lineIndex = i + 1;
          if (i === 0 && !typedLine1 && !showCursor) return null;
          if (i === 1 && typedLine2 === "") return null;

          return (
            <motion.div
              key={lineIndex}
              className={line.className}
              onHoverStart={() => !isMobile && setHoveredLine(lineIndex)}
              onHoverEnd={() => !isMobile && setHoveredLine(null)}
              onTapStart={() => isMobile && setActiveLine(lineIndex)}
              onTap={() => isMobile && setActiveLine(null)}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.04,
                      transition: {
                        type: "spring",
                        stiffness: 320,
                        damping: 18,
                      },
                    }
                  : undefined
              }
              whileTap={{
                scale: 0.97,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                },
              }}
              style={{
                textAlign: "center",
                userSelect: "none",
                maxWidth: "90vw",
                textShadow: isLineGlowing(lineIndex)
                  ? glowShadow
                  : line.textShadow,
                transition: "text-shadow 0.35s ease, color 0.3s ease",
              }}
            >
              {text}
              {showCursor &&
                ((i === 0 && typedLine2 === "") ||
                  (i === 1 && typedLine2 !== "")) && (
                  <span className="animate-blink">|</span>
                )}
            </motion.div>
          );
        })}

        <motion.p
          initial={{ opacity: 0 }}
          animate={textVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "10vh",
            fontSize: "11px",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {isMobile ? "tap anywhere to enter" : "click anywhere to enter"}
        </motion.p>
      </div>

      <CoverCursor glowRef={glowRef} isMobile={isMobile} />
    </div>
  );
}
