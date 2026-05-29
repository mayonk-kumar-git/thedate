import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "@/components/Loading";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Doodles } from "@/components/sections/Doodles";
import { Confession } from "@/components/sections/Confession";
import { Decision } from "@/components/sections/Decision";
import { Success } from "@/components/sections/Success";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "A First Date Request · for the most wonderful person" },
      { name: "description", content: "A cinematic, interactive love letter — carefully designed after an unreasonable amount of overthinking." },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@300;400;500;600&family=Caveat:wght@400;600&display=swap" },
    ],
  }),
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("hero");
  const [showSuccess, setShowSuccess] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;
    const container = scrollRef.current;
    if (!container) return;
    const sections = container.querySelectorAll<HTMLElement>("[data-section]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            setActive(e.target.getAttribute("data-section") || "hero");
          }
        });
      },
      { root: container, threshold: [0.5, 0.75] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [loading, showSuccess]);

  const jumpTo = (id: string) => {
    setActive(id);
    const target = document.querySelector<HTMLElement>(`[data-section="${id}"]`);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleYes = () => {
    setShowSuccess(true);
    requestAnimationFrame(() => {
      setTimeout(() => jumpTo("final"), 80);
    });
  };

  const backgrounds: Record<string, string> = {
    hero: "linear-gradient(180deg, oklch(0.18 0.05 260) 0%, oklch(0.2 0.07 290) 50%, oklch(0.16 0.05 300) 100%)",
    doodles: "linear-gradient(180deg, oklch(0.18 0.05 260) 0%, oklch(0.2 0.07 290) 50%, oklch(0.16 0.05 300) 100%)",
    confession: "linear-gradient(180deg, oklch(0.18 0.05 260) 0%, oklch(0.2 0.07 290) 50%, oklch(0.16 0.05 300) 100%)",
    decision: "linear-gradient(180deg, oklch(0.18 0.05 260) 0%, oklch(0.2 0.07 290) 50%, oklch(0.16 0.05 300) 100%)",
    final: "linear-gradient(180deg, oklch(0.18 0.05 260) 0%, oklch(0.2 0.07 290) 50%, oklch(0.16 0.05 300) 100%)",
  };

  return (
    <div className="relative w-full h-dvh">
      {/* Fixed background that crossfades */}
      {Object.entries(backgrounds).map(([id, bg]) => (
        <motion.div
          key={id}
          animate={{ opacity: active === id ? 1 : 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ background: bg }}
        />
      ))}
      <div className="fixed inset-0 z-0 pointer-events-none grain" />

      <div ref={scrollRef} className="relative z-10 w-full h-dvh overflow-y-auto overflow-x-hidden snap-y snap-mandatory text-foreground scrollbar-hide">
        <AnimatePresence>
          {loading && <Loading onDone={() => setLoading(false)} />}
        </AnimatePresence>

        <Navbar active={active} onJump={jumpTo} />

        <Hero />
        <Doodles />
        <Confession />
        <Decision onYes={handleYes} />
        {showSuccess && <Success />}
      </div>
    </div>
  );
}
