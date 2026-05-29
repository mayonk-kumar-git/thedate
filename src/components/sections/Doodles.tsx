import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Card = {
  title: string;
  doodle: React.ReactNode;
  body: string;
  footer: string;
  rotate: number;
  tone?: "warm" | "soft" | "deep";
};

// hand-drawn SVG doodles
const Fries = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M30 80 L25 35 M40 80 L38 28 M50 80 L52 25 M60 80 L62 30 M70 80 L73 35"
      stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <path d="M22 78 Q50 92 78 78 L75 88 Q50 98 25 88 Z" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
  </svg>
);
const Coffee = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M22 35 L78 35 L72 80 Q50 88 28 80 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M78 45 Q92 48 88 65 Q84 72 75 70" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M35 22 Q38 28 35 32 M48 18 Q51 26 48 32 M61 22 Q64 28 61 32" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);
const Moon = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M65 22 Q38 30 38 55 Q38 80 70 82 Q48 70 48 50 Q48 32 65 22 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <circle cx="80" cy="35" r="1.5" fill="currentColor"/>
    <circle cx="20" cy="70" r="1.5" fill="currentColor"/>
  </svg>
);
const Rocket = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M50 15 Q62 35 62 60 L38 60 Q38 35 50 15 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <circle cx="50" cy="40" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M38 60 L28 75 L42 68 M62 60 L72 75 L58 68" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round"/>
    <path d="M46 80 Q50 90 54 80" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);
const Heart = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M50 78 C20 58 18 32 35 28 Q46 26 50 40 Q54 26 65 28 C82 32 80 58 50 78 Z"
      stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
  </svg>
);
const Spinner = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="2.2" fill="none" strokeDasharray="6 6"/>
    <path d="M50 22 Q72 28 75 50" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);
const Sticky = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M20 20 L80 22 L78 78 L22 80 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M30 38 L70 40 M30 50 L65 52 M30 62 L60 63" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M15 50 Q40 30 80 52" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    <path d="M80 52 L70 44 M80 52 L72 60" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
  </svg>
);
const Star = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M50 18 L58 42 L84 44 L63 60 L70 84 L50 70 L30 84 L37 60 L16 44 L42 42 Z"
      stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
  </svg>
);
const Calendar = () => (
  <svg viewBox="0 0 100 100" className="h-24 w-24 text-ink">
    <path d="M20 28 L80 28 L80 80 L20 80 Z" stroke="currentColor" strokeWidth="2.2" fill="none"/>
    <path d="M20 42 L80 42" stroke="currentColor" strokeWidth="2.2"/>
    <path d="M32 20 L32 36 M68 20 L68 36" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <circle cx="50" cy="60" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

const cards: Card[] = [
  { title: "Article I — Snacks", doodle: <Fries/>, body: "Fries must be shared. No 'I don't want any' and then stealing five.", footer: "binding by paper napkin", rotate: -2 },
  { title: "Article II — Caffeine", doodle: <Coffee/>, body: "Coffee orders may be judged but never denied.", footer: "extra shot if needed", rotate: 1.5 },
  { title: "Article III — Time", doodle: <Calendar/>, body: "Date duration: as long as it takes. We will lose track on purpose.", footer: "watches optional", rotate: -1 },
  { title: "Article IV — Silence", doodle: <Moon/>, body: "Quiet moments count as conversation. Maybe the best kind.", footer: "no awkward fillers", rotate: 2 },
  { title: "Article V — Plans", doodle: <Rocket/>, body: "Plans may collapse mid-evening. We pivot. We over-engineer.", footer: "spontaneity > spreadsheets", rotate: -1.5, tone: "warm" },
  { title: "Article VI — Loading", doodle: <Spinner/>, body: "You're allowed to take your time deciding things. Always.", footer: "no pressure, ever", rotate: 1, tone: "warm" },
  { title: "Article VII — Notes", doodle: <Sticky/>, body: "I will remember the small things. Even the ones you forget telling me.", footer: "kept in a real notebook", rotate: -2, tone: "warm" },
  { title: "Article VIII — Direction", doodle: <Arrow/>, body: "We're allowed to take the long way home. Especially if there's music.", footer: "GPS overruled", rotate: 2.5, tone: "soft" },
  { title: "Article IX — Light", doodle: <Star/>, body: "If the evening is good, we stay till the streets are quiet.", footer: "no curfews in love", rotate: -1, tone: "soft" },
  { title: "Article X — Us", doodle: <Heart/>, body: "Above all: you get to be entirely yourself. That's the only real clause.", footer: "signed, sincerely", rotate: 0, tone: "deep" },
];

export function Doodles() {
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
    <section id="doodles" data-section="doodles" className="min-h-screen relative flex flex-col justify-center"
      style={{ background: "linear-gradient(180deg, oklch(0.18 0.03 270) 0%, oklch(0.22 0.04 60) 50%, oklch(0.16 0.03 280) 100%)" }}>
      <div className="grain absolute inset-0" />

      <div className="relative z-10 pt-8 px-6 text-center">
        <p className="hand text-2xl text-[var(--cream)]/90">terms &amp; conditions</p>
        <p className="text-[11px] tracking-[0.3em] text-white/40 uppercase mt-1">scroll sideways →</p>
      </div>

      <div
        ref={scrollerRef}
        className="snap-x-cards relative z-10 mt-6 flex gap-4 px-[9vw] py-8"
      >
        {cards.map((c, i) => {
          const isActive = i === active;
          const isDeep = c.tone === "deep";
          return (
            <motion.article
              key={i}
              className="snap-card paper-card wobble-border shrink-0 w-[82vw] max-w-[360px] h-[62vh] max-h-[520px] p-6 flex flex-col"
              style={{
                transform: `rotate(${c.rotate}deg)`,
                ...(isDeep ? { background: "oklch(0.18 0.03 270)", color: "var(--cream)", borderColor: "oklch(0.4 0.05 80 / 0.6)" } : {}),
              }}
              animate={{
                scale: isActive ? 1 : 0.94,
                rotate: isActive ? 0 : c.rotate,
                opacity: isActive ? 1 : 0.7,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              <header className="flex items-start justify-between">
                <h3 className={`serif text-2xl ${isDeep ? "text-[var(--gold)]" : ""}`}>{c.title}</h3>
                <span className="hand text-sm opacity-50">{String(i+1).padStart(2,'0')}</span>
              </header>

              <div className="flex-1 flex items-center justify-center my-4">
                <div className={isDeep ? "opacity-80" : ""} style={isDeep ? { filter: "invert(1)" } : {}}>
                  {c.doodle}
                </div>
              </div>

              <p className={`serif text-lg leading-snug ${isDeep ? "text-cream/90 italic" : ""}`}>{c.body}</p>

              <footer className={`mt-4 pt-3 border-t border-dashed ${isDeep ? "border-white/15" : "border-ink/30"}`}>
                <p className="hand text-base opacity-70">{c.footer}</p>
              </footer>

              {i === 1 && (
                <p className="hand absolute -top-3 -right-2 text-sm text-[var(--gold)] rotate-6">keep scrolling →</p>
              )}
              {i === 4 && (
                <p className="hand absolute -bottom-4 left-4 text-sm opacity-60 -rotate-3">more chaos ahead</p>
              )}
            </motion.article>
          );
        })}
        <div className="shrink-0 w-[8vw]" />
      </div>

      <div className="relative z-10 flex justify-center gap-1.5 pb-6">
        {cards.map((_, i) => (
          <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i===active ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-white/25"}`} />
        ))}
      </div>
    </section>
  );
}
