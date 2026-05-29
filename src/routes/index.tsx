import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "@/components/Loading";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Doodles } from "@/components/sections/Doodles";
import { Confession } from "@/components/sections/Confession";
import { Memories } from "@/components/sections/Memories";
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
    const container = scrollRef.current;
    if (!container) return;

    const updateActive = () => {
      const sections = container.querySelectorAll<HTMLElement>("[data-section]");
      const containerTop = container.getBoundingClientRect().top;
      const containerHeight = container.clientHeight;
      const center = containerTop + containerHeight / 2;

      let closest: string | null = null;
      let closestDist = Infinity;

      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const dist = Math.abs(sectionCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = s.getAttribute("data-section");
        }
      });

      if (closest) setActive(closest);
    };

    container.addEventListener("scrollend", updateActive, { passive: true });
    container.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
    return () => {
      container.removeEventListener("scrollend", updateActive);
      container.removeEventListener("scroll", updateActive);
    };
  }, [showSuccess]);

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
    hero: "radial-gradient(circle at 50% 20%, rgba(119, 93, 255, 0.12) 0%, transparent 40%), radial-gradient(circle at top, #1A1238 0%, #070A16 50%, #03040A 100%)",
    doodles: "linear-gradient(180deg, var(--paper) 0%, var(--paper) 100%)",
    confession: "radial-gradient(circle at 50% 20%, rgba(119, 93, 255, 0.08) 0%, transparent 40%), linear-gradient(180deg, #010208 0%, #050816 50%, #0B0F26 100%)",
    memories: "radial-gradient(circle at 50% 20%, rgba(119, 93, 255, 0.1) 0%, transparent 40%), linear-gradient(180deg, #02030A 0%, #060A1A 50%, #101633 100%)",
    decision: "radial-gradient(circle at 50% 20%, rgba(119, 93, 255, 0.12) 0%, transparent 40%), linear-gradient(180deg, #03030B 0%, #090D1D 50%, #161238 100%)",
    final: "radial-gradient(circle at 50% 20%, rgba(119, 93, 255, 0.12) 0%, transparent 40%), linear-gradient(180deg, #03030B 0%, #090D1D 50%, #161238 100%)",
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
        <Memories />
        <Decision onYes={handleYes} />
        {showSuccess && <Success />}
      </div>
    </div>
  );
}
