import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import img1 from "@/images/confession/confession_1.png";
import img2 from "@/images/confession/confession_2.png";
import img3 from "@/images/confession/confession_3.png";
import img4 from "@/images/confession/confession_4.png";
import img5 from "@/images/confession/confession_5.png";
import img6 from "@/images/confession/confession_6.png";

const slides = [
  { lines: ["We met when neither of us was searching."], image: img1 },
  { lines: ["And somehow, after eight years of becoming who we were meant to be…", "two completely different journeys found their way to the same destination."], image: img2 },
  { lines: ["Maybe that's what magic looks like."], image: img3 },
  { lines: ["You started feeling like home so naturally", "that I didn't even notice when it happened."], image: img4 },
  { lines: ["Same soul.", "Different bodies."], image: img5 },
  { lines: ["And if life becomes difficult someday…", "I still want it to be with you."], image: img6 },
];

const rotations = [-2, 1.5, -1, 2, -1.5, 1];

export function Confession() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const w = el.clientWidth;
      setActive(Math.round(el.scrollLeft / (w * 0.82)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="confession" data-section="confession" className="min-h-[85dvh] relative flex flex-col justify-end snap-start pb-28 pt-12">

      <div className="relative z-10 pt-8 px-6 text-center">
        <p className="hand text-2xl text-[var(--cream)]/90">confessions</p>
        <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mt-1">scroll sideways →</p>
      </div>

      <div
        ref={scrollerRef}
        className="snap-x-cards relative z-10 mt-6 flex gap-4 px-[9vw] py-8"
      >
        {slides.map((slide, i) => {
          const isActive = i === active;
          return (
            <motion.article
              key={i}
              className="snap-card shrink-0 w-[82vw] max-w-[360px] h-[62vh] max-h-[520px] rounded-2xl overflow-hidden relative flex flex-col justify-center items-center shadow-[0_4px_50px_-12px_rgba(0,0,0,0.6),0_0_30px_-8px_rgba(0,0,0,0.4)]"
              animate={{
                scale: isActive ? 1 : 0.94,
                rotate: isActive ? 0 : i < active ? -4 : 4,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              {/* Background image */}
              <img
                src={slide.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark overlay for text readability */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Text content */}
              <div className="relative z-10 p-6 text-center">
                {slide.lines.map((line, j) => (
                  <p
                    key={j}
                    className="serif italic leading-[1.3] text-cream text-lg sm:text-xl mt-2"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.article>
          );
        })}
        <div className="shrink-0 w-[8vw]" />
      </div>

      <div className="relative z-10 flex justify-center gap-1.5 pb-6">
        {slides.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-white/25"}`} />
        ))}
      </div>
    </section>
  );
}
