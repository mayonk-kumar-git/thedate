import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Loading } from "@/components/Loading";
import { SideNav } from "@/components/SideNav";
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

  useEffect(() => {
    if (loading) return;
    const sections = document.querySelectorAll<HTMLElement>("[data-section]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            setActive(e.target.getAttribute("data-section") || "hero");
          }
        });
      },
      { threshold: [0.5, 0.75] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [loading, showSuccess]);

  const jumpTo = (id: string) => {
    const target = document.querySelector<HTMLElement>(`[data-section="${id}"]`);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const handleYes = () => {
    setShowSuccess(true);
    requestAnimationFrame(() => {
      setTimeout(() => jumpTo("final"), 80);
    });
  };

  return (
    <div className="relative w-full bg-background text-foreground">
      <AnimatePresence>
        {loading && <Loading onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && <SideNav active={active} onJump={jumpTo} />}

      <Hero />
      <Doodles />
      <Confession />
      <Decision onYes={handleYes} />
      {showSuccess && <Success />}
    </div>
  );
}
